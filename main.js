// ==========================================================================
// ENVIRONMENT VARIABLES CONFIGURATION (SUPABASE)
// ==========================================================================
const SUPABASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || process.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase Client Connection
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
   1. GITHUB AUTHENTICATION & AUTOMATIC DEPLOYMENT ENGINE
   ========================================================================== */
if (verifyBtn) {
  verifyBtn.addEventListener('click', async () => {
    const username = usernameInput.value.trim();

    if (!username) {
      showStatus(statusBox, 'Please enter your GitHub Username first!', 'error');
      return;
    }

    verifyBtn.innerText = "VERIFYING METADATA...";
    verifyBtn.disabled = true;
    statusBox.style.display = 'none';

    try {
      // Step A: Verification of Profile Integrity via public bio signature
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) {
        showStatus(statusBox, `Account verification failed. Redirecting to fork project...`, 'error');
        triggerRedirect("https://github.com/novaxmd/NOVA-XMD/fork");
        return;
      }

      const userData = await userResponse.json();
      const userBio = userData.bio ? userData.bio.toUpperCase() : "";

      if (!userBio.includes("NOVA-XMD") && !userBio.includes("BMB")) {
        showStatus(statusBox, `❌ Identity Verification Failed! Add "NOVA-XMD" or "BMB" to your GitHub profile Bio to verify you own this account.`, 'error');
        return;
      }

      // Step B: Verification of Repository Fork Allocation Status
      const repoResponse = await fetch(`https://api.github.com/repos/${username}/NOVA-XMD`);
      if (repoResponse.ok) {
        const repoData = await repoResponse.json();
        
        if (repoData.fork === true || repoData.name.toLowerCase() === 'nova-xmd') {
          showStatus(statusBox, `✓ Ownership Confirmed! Redirecting to Heroku Deployment...`, 'success');
          triggerRedirect("https://dashboard.heroku.com/new?template=https://github.com/novaxmd/NOVA-XMD");
        } else {
          showStatus(statusBox, `⚠️ Invalid repository state. Launching Fork framework...`, 'error');
          triggerRedirect("https://github.com/novaxmd/NOVA-XMD/fork");
        }
      } else {
        showStatus(statusBox, `❌ Repository fork not found. Launching Fork interface...`, 'error');
        triggerRedirect("https://github.com/novaxmd/NOVA-XMD/fork");
      }
    } catch (error) {
      showStatus(statusBox, 'An API connection error occurred. Please try again.', 'error');
    } finally {
      verifyBtn.innerText = "VERIFY & DEPLOY";
      verifyBtn.disabled = false;
    }
  });
}

function showStatus(targetBox, message, type) {
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

    submitFeedbackBtn.innerText = "SENDING TICKET...";
    submitFeedbackBtn.disabled = true;
    feedStatusBox.style.display = 'none';

    // Transmit new payload to Supabase database infrastructure
    const { error } = await supabase
      .from('support_tickets')
      .insert([{ name: name, phone: phone, message: message }]);

    if (error) {
      showStatus(feedStatusBox, 'Database transmission error: ' + error.message, 'error');
    } else {
      showStatus(feedStatusBox, '✓ Support ticket logged successfully! Our team has received your logs.', 'success');
      // Safisha fomu baada ya kutuma vizuri
      feedName.value = '';
      feedPhone.value = '';
      feedMessage.value = '';
    }

    submitFeedbackBtn.innerText = "SUBMIT SUPPORT TICKET";
    submitFeedbackBtn.disabled = false;
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

  const { data: tickets, error } = await supabase
    .from('support_tickets')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
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
}

// Global scope initialization for table row purging
window.deleteTicket = async function(id) {
  if (confirm("Are you sure you want to mark this ticket as resolved and delete it?")) {
    const { error } = await supabase
      .from('support_tickets')
      .delete()
      .eq('id', id);

    if (error) {
      alert("Error deleting ticket: " + error.message);
    } else {
      renderAdminTickets();
    }
  }
};
