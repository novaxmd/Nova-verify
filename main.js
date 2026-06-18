// ==========================================================================
// ENVIRONMENT VARIABLES CONFIGURATION (SUPABASE)
// ==========================================================================
const SUPABASE_URL = import.meta?.env?.VITE_SUPABASE_URL || "https://ivowgvwswkifnlpkqsz.supabase.co";
const SUPABASE_ANON_KEY = import.meta?.env?.VITE_SUPABASE_ANON_KEY || "sb_publishable_wl8XoqViGKRKT3w7KnnK8g_gq2QOxGL";

let supabaseClient = null;

try {
  if (typeof window !== 'undefined' && window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } else if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (e) {
  console.error("Supabase initialization failed:", e);
}

// DOM Elements Configuration
const verifyBtn = document.getElementById('verifyBtn');
const usernameInput = document.getElementById('username');
const statusBox = document.getElementById('statusBox');

const submitFeedbackBtn = document.getElementById('submitFeedbackBtn');
const feedName = document.getElementById('feedName');
const feedPhone = document.getElementById('feedPhone');
const feedMessage = document.getElementById('feedMessage');
const feedStatusBox = document.getElementById('feedStatusBox');

const adminFeedbackContainer = document.getElementById('adminFeedbackContainer');

/* ==========================================================================
    HELPER UTILITY: NUKTA 5 LOADING ANIMATION
    ========================================================================== */
function runDotAnimation(element, baseText) {
  let count = 0;
  return setInterval(() => {
    count = (count + 1) % 6; // Itazunguka kuanzia 0 hadi 5
    element.innerText = baseText + ".".repeat(count);
  }, 250); // Kila baada ya robo sekunde nukta inaongezeka
}

/* ==========================================================================
    1. GITHUB AUTHENTICATION & AUTOMATIC DEPLOYMENT ENGINE
    ========================================================================== */
if (verifyBtn) {
  verifyBtn.addEventListener('click', async () => {
    const username = usernameInput.value.trim();

    if (!username) {
      showStatus(statusBox, 'Please enter your GitHub Username first!', 'error');
      return;
    }

    verifyBtn.disabled = true;
    statusBox.style.display = 'none';
    
    // Anzisha loading ya nukta 5 hapa
    const authAnimation = runDotAnimation(verifyBtn, "VERIFYING METADATA");

    try {
      // Step A: Verification of Profile Integrity via public bio signature
      const userResponse = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (!userResponse.ok) {
        clearInterval(authAnimation); // Simamisha loading
        showStatus(statusBox, `Account verification failed. Redirecting to fork project...`, 'error');
        triggerRedirect("https://github.com/novaxmd/NOVA-XMD/fork");
        return;
      }

      const userData = await userResponse.json();
      const userBio = userData.bio ? userData.bio.toUpperCase() : "";

      if (!userBio.includes("NOVA-XMD") && !userBio.includes("BMB")) {
        clearInterval(authAnimation); // Simamisha loading
        showStatus(statusBox, `❌ Identity Verification Failed! Add "NOVA-XMD" or "BMB" to your GitHub profile Bio to verify you own this account.`, 'error');
        return;
      }

      // Step B: Verification of Repository Fork Allocation Status
      const repoResponse = await fetch(`https://api.github.com/repos/${username}/NOVA-XMD`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (repoResponse.ok) {
        const repoData = await repoResponse.json();
        
        clearInterval(authAnimation); // Simamisha loading kabla ya mafanikio
        if (repoData.fork === true || repoData.name.toLowerCase() === 'nova-xmd') {
          showStatus(statusBox, `✓ Ownership Confirmed! Redirecting to Heroku Deployment...`, 'success');
          triggerRedirect("https://dashboard.heroku.com/new?template=https://github.com/novaxmd/NOVA-XMD");
        } else {
          showStatus(statusBox, `⚠️ Invalid repository state. Launching Fork framework...`, 'error');
          triggerRedirect("https://github.com/novaxmd/NOVA-XMD/fork");
        }
      } else {
        clearInterval(authAnimation); // Simamisha loading
        showStatus(statusBox, `❌ Repository fork not found. Launching Fork interface...`, 'error');
        triggerRedirect("https://github.com/novaxmd/NOVA-XMD/fork");
      }
    } catch (error) {
      clearInterval(authAnimation); // Simamisha loading
      console.error('Verification error:', error);
      showStatus(statusBox, 'An API connection error occurred. Please try again.', 'error');
    } finally {
      clearInterval(authAnimation); // Kuhakikisha imesimama kabisa
      verifyBtn.innerText = "VERIFY & DEPLOY";
      verifyBtn.disabled = false;
    }
  });
}

function showStatus(targetBox, message, type) {
  if (!targetBox) return;
  targetBox.innerText = message;
  targetBox.className = `status-box status-${type}`;
  targetBox.style.display = 'block';
}

function triggerRedirect(url) {
  setTimeout(() => {
    window.open(url, "_blank");
  }, 1500);
}

/* ==========================================================================
    2. FEEDBACK & SUPPORT TICKET OPERATIONS (SUPABASE PRODUCTION)
    ========================================================================== */
if (submitFeedbackBtn) {
  submitFeedbackBtn.addEventListener('click', async () => {
    const name = feedName.value.trim();
    const phone = feedPhone.value.trim();
    const message = feedMessage.value.trim();

    if (!name || !phone || !message) {
      showStatus(feedStatusBox, 'All fields are compulsory. Please fill them up.', 'error');
      return;
    }

    if (!/^\d{10,15}$/.test(phone)) {
      showStatus(feedStatusBox, 'Invalid phone syntax. Enter numbers only starting with country code (e.g. 255...)', 'error');
      return;
    }

    if (!supabaseClient) {
      showStatus(feedStatusBox, 'Database connection error. Setup keys correctly.', 'error');
      console.error('Supabase client not initialized');
      return;
    }

    submitFeedbackBtn.disabled = true;
    if (feedStatusBox) feedStatusBox.style.display = 'none';

    // Anzisha loading ya nukta 5 hapa pia
    const msgAnimation = runDotAnimation(submitFeedbackBtn, "SENDING TICKET");

    try {
      // Transmit new payload to Supabase database infrastructure
      const { data, error } = await supabaseClient
        .from('support_tickets')
        .insert([{ name: name, phone: phone, message: message }]);

      clearInterval(msgAnimation); // Simamisha loading baada ya kupata majibu kutoka Supabase

      if (error) {
        console.error('Database error:', error);
        showStatus(feedStatusBox, 'Database transmission error: ' + error.message, 'error');
      } else {
        showStatus(feedStatusBox, '✓ Support ticket logged successfully! Our team has received your logs.', 'success');
        feedName.value = '';
        feedPhone.value = '';
        feedMessage.value = '';
      }
    } catch (e) {
      clearInterval(msgAnimation);
      console.error('Submission error:', e);
      showStatus(feedStatusBox, 'An error occurred during submission. Please retry.', 'error');
    } finally {
      clearInterval(msgAnimation); // Kuhakikisha imesimama
      submitFeedbackBtn.innerText = "SUBMIT SUPPORT TICKET";
      submitFeedbackBtn.disabled = false;
    }
  });
}

/* ==========================================================================
    3. ADMIN DASHBOARD CONTROL MODULES
    ========================================================================== */
if (adminFeedbackContainer) {
  renderAdminTickets();
}

async function renderAdminTickets() {
  adminFeedbackContainer.innerHTML = '<div class="no-data">Fetching cloud records...</div>';

  if (!supabaseClient) {
    adminFeedbackContainer.innerHTML = '<div class="no-data" style="color:#f87171;">Supabase Client not connected. Check keys.</div>';
    return;
  }

  try {
    const { data: tickets, error } = await supabaseClient
      .from('support_tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch error:', error);
      adminFeedbackContainer.innerHTML = `<div class="no-data" style="color:#f87171;">Failed to fetch database data: ${error.message}</div>`;
      return;
    }

    adminFeedbackContainer.innerHTML = '';

    if (!tickets || tickets.length === 0) {
      adminFeedbackContainer.innerHTML = '<div class="no-data">No active support tickets found in backend database memory.</div>';
      return;
    }

    tickets.forEach(ticket => {
      const formattedDate = new Date(ticket.created_at).toLocaleString();
      const item = document.createElement('div');
      item.className = 'feedback-item';
      item.innerHTML = `
        <h3>👤 Name: ${ticket.name}</h3>
        <p><strong>📱 Contact:</strong> +${ticket.phone}</p>
        <p><strong>📝 Message:</strong> ${ticket.message}</p>
        <div class="meta">📅 Date Transmitted: ${formattedDate}</div>
        <button class="delete-btn" onclick="deleteTicket(${ticket.id})">RESOLVED / DELETE</button>
      `;
      adminFeedbackContainer.appendChild(item);
    });
  } catch (e) {
    console.error('Render error:', e);
    adminFeedbackContainer.innerHTML = '<div class="no-data" style="color:#f87171;">An error occurred while rendering tickets.</div>';
  }
}

window.deleteTicket = async function(id) {
  if (!supabaseClient) return;
  if (confirm("Are you sure you want to mark this ticket as resolved and delete it?")) {
    try {
      const { error } = await supabaseClient
        .from('support_tickets')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Delete error:', error);
        alert("Error deleting ticket: " + error.message);
      } else {
        renderAdminTickets();
      }
    } catch (e) {
      console.error('Delete exception:', e);
      alert("An error occurred while deleting the ticket");
    }
  }
};
