/* ---------------------- */
/* OPEN/CLOSE SEARCH OVERLAY */
/* ---------------------- */
function toggleSearch() {
  const overlay = document.getElementById("searchOverlay");
  const page = document.getElementById("pageContent");

  if (overlay.style.display === "block") {
    overlay.style.display = "none";
    page.classList.remove("page-shift");
  } else {
    overlay.style.display = "block";
    page.classList.add("page-shift");
    document.getElementById("searchField").focus();
  }
}

/* DO NOT CLOSE IF CLICKING ON ICON OR FIELD */
document.addEventListener("click", function(e) {
  const overlay = document.getElementById("searchOverlay");
  const icon = document.querySelector(".search-icon");
  const field = document.getElementById("searchField");
  const page = document.getElementById("pageContent");

  if (
    !overlay.contains(e.target) &&
    !icon.contains(e.target) &&
    e.target !== field
  ) {
    overlay.style.display = "none";
    page.classList.remove("page-shift");
  }
});

/* ---------------------- */
/* MOBILE MENU */
/* ---------------------- */
function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("open");
}

document.addEventListener("click", function(e) {
  const menu = document.getElementById("mobileMenu");
  const icon = document.querySelector(".mobile-menu-icon");

  if (!menu.contains(e.target) && !icon.contains(e.target)) {
    menu.classList.remove("open");
  }
});

/* ---------------------- */
/* INTERNAL SEARCH */
/* ---------------------- */
const pages = [
  { title: "Compressors", url: "compressori.html", keywords: "air compressors industry" },
  { title: "Pumps", url: "pompe.html", keywords: "industrial hydraulic pumps" },
  { title: "Reducers", url: "riduttori.html", keywords: "mechanical reducers gears" },
  { title: "Valves", url: "valvole.html", keywords: "industrial valves flow control" },
  { title: "Turbines", url: "turbine.html", keywords: "industrial turbines energy" },
  { title: "Spare Parts", url: "ricambi.html", keywords: "industrial machinery spare parts" },
  { title: "Contacts", url: "contatti.html", keywords: "contacts phone email offices" },
];

function performSearch() {
  const field = document.getElementById("searchField");
  const query = field.value.toLowerCase().trim();

  if (query === "") {
    document.getElementById("searchOverlay").style.display = "block";
    document.getElementById("pageContent").classList.add("page-shift");
    field.focus();
    return;
  }

  const result = pages.find(p =>
    p.title.toLowerCase().includes(query) ||
    p.keywords.toLowerCase().includes(query)
  );

  if (result) {
    window.location.href = result.url;
  } else {
    alert("No results found.");
  }
}

// Keep language dropdown open when clicking the arrow
document.querySelector(".lang-arrow").addEventListener("click", (e) => {
  e.stopPropagation();
  const dropdown = document.querySelector(".lang-dropdown");

  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
});

// Close dropdown only when clicking outside
document.addEventListener("click", (e) => {
  const switcher = document.querySelector(".lang-switcher");
  const dropdown = document.querySelector(".lang-dropdown");

  if (!switcher.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

/* ---------------------- */
document.getElementById("year").textContent = new Date().getFullYear();


const botBtn = document.getElementById("fb-bot-button");
const botWindow = document.getElementById("fb-bot-window");
const input = document.getElementById("fb-user-input");
const sendBtn = document.getElementById("fb-send-btn");
const messages = document.getElementById("fb-bot-messages");

/* OPEN/CLOSE BOT */
botBtn.addEventListener("click", () => {
  botWindow.style.display = botWindow.style.display === "flex" ? "none" : "flex";
});

/* CREATE SUGGESTIONS */
function renderSuggestions() {
  const sug = document.createElement("div");
  sug.id = "fb-suggestions";
  sug.innerHTML = `
      <div class="suggestion"><i class="fas fa-file-signature"></i> Request a Quote</div>
      <div class="suggestion"><i class="fas fa-phone"></i> Contacts</div>
      <div class="suggestion"><i class="fas fa-cogs"></i> Products & Services</div>
      <div class="suggestion"><i class="fas fa-tools"></i> Technical Support</div>
  `;
  messages.appendChild(sug);

  sug.querySelectorAll(".suggestion").forEach(s => {
    s.addEventListener("click", () => {
      addUserMessage(s.textContent);
      replyFromAI(s.textContent);
    });
  });
}

/* USER MESSAGE (RIGHT) */
function addUserMessage(text) {
  const div = document.createElement("div");
  div.className = "user-msg";
  div.innerHTML = `<p>${text}</p>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

/* BOT MESSAGE (LEFT) */
function addBotMessage(html) {
  const div = document.createElement("div");
  div.className = "bot-msg";
  div.innerHTML = `<p>${html}</p>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

/* SEND MESSAGE */
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = input.value.trim();
  if (text === "") return;
  addUserMessage(text);
  replyFromAI(text);
  input.value = "";
}

/* BOT RESPONSES */
function replyFromAI(text) {
  setTimeout(() => {
    let response = "";
    const t = text.toLowerCase();

    if (t.includes("contacts")) {
      response = `You can find all contacts here:<br><a href="contatti.html">contatti.html</a>`;
    }
    else if (t.includes("compressors")) {
      response = `Here is the compressors section:<br><a href="compressori.html">compressori.html</a>`;
    }
    else if (t.includes("quote")) {
      response = `To request a quote visit:<br><a href="preventivo.html">preventivo.html</a>`;
    }
    else {
      response = "I can help you with products, services, contacts or technical support.";
    }

    addBotMessage(response);
  }, 500);
}

/* RESET CHAT */
document.getElementById("fb-reset").addEventListener("click", () => {
  messages.innerHTML = "";

  addBotMessage("Hello! I am F&B Assistant AI, how can I help you?");
  renderSuggestions();
});

/* INITIAL LOAD */
renderSuggestions();

lucide.createIcons();

// FRECCIA PRODOTTI & SERVIZI (DESKTOP)
document.querySelectorAll(".nav-item-with-overlay").forEach(item => {
  const trigger = item.querySelector(".nav-trigger");
  const overlay = item.querySelector(".mega-overlay");

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    item.classList.toggle("open");

    overlay.style.opacity = item.classList.contains("open") ? "1" : "0";
    overlay.style.pointerEvents = item.classList.contains("open") ? "auto" : "none";
  });
});

// CHIUSURA CLICCANDO FUORI
document.addEventListener("click", () => {
  document.querySelectorAll(".nav-item-with-overlay").forEach(item => {
    item.classList.remove("open");
    const overlay = item.querySelector(".mega-overlay");
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
  });
});

// MOBILE DROPDOWN PRODOTTI & SERVIZI
document.querySelectorAll(".mobile-dropdown").forEach(drop => {
  const trigger = drop.querySelector(".mobile-trigger");

  trigger.addEventListener("click", () => {
    drop.classList.toggle("open");
  });
});
