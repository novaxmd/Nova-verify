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
   1. GITHUB AUTHENTICATION & AUTOMATIC DEPLOYMENT SYSTEM
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
      // Step A: Integrity check of the account profile and Bio check
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

      // Step B: Verification of repository fork allocation
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
  }, 1500); // 1.5 Seconds delay so user reads the directive statement
}

/* ==========================================================================
   2. FEEDBACK & SUPPORT TICKET MANAGEMENT SYSTEM (LOCALSTORAGE ENGINE)
   ========================================================================== */
if (submitFeedbackBtn) {
  submitFeedbackBtn.addEventListener('click', () => {
    const name = feedName.value.trim();
    const phone = feedPhone.value.trim();
    const message = feedMessage.value.trim();

    if (!name || !phone || !message) {
      showStatus(feedStatusBox, 'All fields are compulsory. Please fill them up.', 'error');
      return;
    }

    // Phone Country Code validation system check
    if (!/^\d{10,15}$/.test(phone)) {
      showStatus(feedStatusBox, 'Invalid phone syntax. Enter numbers only starting with country code (e.g. 255...)', 'error');
      return;
    }

    const ticket = {
      id: Date.now(),
      name: name,
      phone: phone,
      message: message,
      date: new Date().toLocaleString()
    };

    // Grab old data or generate new array inside browser memory
    let existingTickets = JSON.parse(localStorage.getItem('nova_tickets')) || [];
    existingTickets.push(ticket);
    localStorage.setItem('nova_tickets', JSON.stringify(existingTickets));

    showStatus(feedStatusBox, '✓ Support ticket logged successfully! Our team has received your logs.', 'success');
    
    // Clear the form fields
    feedName.value = '';
    feedPhone.value = '';
    feedMessage.value = '';
  });
}

/* ==========================================================================
   3. ADMIN DASHBOARD DESK LOADER
   ========================================================================== */
if (adminFeedbackContainer) {
  renderAdminTickets();
}

function renderAdminTickets() {
  const tickets = JSON.parse(localStorage.getItem('nova_tickets')) || [];
  adminFeedbackContainer.innerHTML = '';

  if (tickets.length === 0) {
    adminFeedbackContainer.innerHTML = '<div class="no-data">No active support tickets found in backend database memory.</div>';
    return;
  }

  tickets.forEach(ticket => {
    const item = document.createElement('div');
    item.className = 'feedback-item';
    item.innerHTML = `
      <h3>👤 Name: ${ticket.name}</h3>
      <p><strong>📱 Contact:</strong> +${ticket.phone}</p>
      <p><strong>📝 Message:</strong> ${ticket.message}</p>
      <div class="meta">📅 Date Transmitted: ${ticket.date}</div>
      <button class="delete-btn" onclick="deleteTicket(${ticket.id})">RESOLVED / DELETE</button>
    `;
    adminFeedbackContainer.appendChild(item);
  });
}

// Global window function configuration so inline button onClick works perfectly
window.deleteTicket = function(id) {
  let tickets = JSON.parse(localStorage.getItem('nova_tickets')) || [];
  tickets = tickets.filter(t => t.id !== id);
  localStorage.setItem('nova_tickets', JSON.stringify(tickets));
  renderAdminTickets();
};
