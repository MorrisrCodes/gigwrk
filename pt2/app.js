/* GigMatch — Vanilla Pages-only SPA
   - Landing page
   - Create gig page
   - Browse gigs page
   - No matching logic
*/

const app = document.getElementById("app");
const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

/* ---------- Mock data for UI ---------- */
const DEFAULT_GIGS = [
  {
    id: "gig_1",
    title: "Weekend Event Staff",
    category: "Events",
    pay: 22,
    payType: "hour",
    location: "Brooklyn, NY",
    date: "Sat, Dec 7",
    timeWindow: "10am–6pm",
    description:
      "Assist with guest check-in, seating, and light setup. Friendly vibe, standing for long periods.",
    traits: ["Outgoing", "Punctual", "Team player"],
    stipulations: {
      minPayWillingness: 20,
      requiredAvailability: "Weekend daytime",
      personality: "Extroverted",
    },
  },
  {
    id: "gig_2",
    title: "Dog Walker (Daily)",
    category: "Pets",
    pay: 18,
    payType: "hour",
    location: "Queens, NY",
    date: "Mon–Fri",
    timeWindow: "7am–9am",
    description:
      "Walk a sweet labrador each weekday morning. Must be comfortable with large dogs.",
    traits: ["Reliable", "Calm", "Animal lover"],
    stipulations: {
      minPayWillingness: 16,
      requiredAvailability: "Weekday mornings",
      personality: "Calm/steady",
    },
  },
  {
    id: "gig_3",
    title: "Move-in Helper",
    category: "Labor",
    pay: 120,
    payType: "flat",
    location: "Jersey City, NJ",
    date: "Sun, Dec 8",
    timeWindow: "1pm–5pm",
    description:
      "Help carry boxes and furniture up two flights. Lifting up to 50 lbs.",
    traits: ["Strong", "Careful", "On time"],
    stipulations: {
      minPayWillingness: 100,
      requiredAvailability: "Sunday afternoon",
      personality: "Focused",
    },
  },
];

/* ---------- LocalStorage helpers ---------- */
const LS_KEY = "gigmatch_gigs";

function loadGigs() {
  const fromLS = localStorage.getItem(LS_KEY);
  if (!fromLS) return [...DEFAULT_GIGS];
  try {
    const parsed = JSON.parse(fromLS);
    return [...DEFAULT_GIGS, ...parsed];
  } catch {
    return [...DEFAULT_GIGS];
  }
}

function saveCreatedGig(gig) {
  const fromLS = localStorage.getItem(LS_KEY);
  const gigs = fromLS ? JSON.parse(fromLS) : [];
  gigs.unshift(gig);
  localStorage.setItem(LS_KEY, JSON.stringify(gigs));
}

/* ---------- Router ---------- */
window.addEventListener("hashchange", renderRoute);
window.addEventListener("load", renderRoute);

function route() {
  const hash = location.hash || "#/";
  return hash.replace("#", "");
}

function renderRoute() {
  const r = route();
  if (r === "/") renderLanding();
  else if (r === "/create") renderCreate();
  else if (r === "/gigs") renderBrowse();
  else renderNotFound();
}

/* ---------- Page: Landing ---------- */
function renderLanding() {
  app.innerHTML = `
    <section class="hero">
      <div class="container grid grid-2">
        <div>
          <div class="kicker-row">
            <span class="badge">Auto-matching</span>
            <span class="badge">Fast gigs</span>
            <span class="badge">Flexible work</span>
          </div>
          <h1>Find gigs that fit you — <u>automatically</u>.</h1>
          <p>Gig workers create a profile once. Sellers post gigs with their requirements. GigMatch handles the rest.</p>
          <div style="margin-top:14px; display:flex; gap:8px; flex-wrap:wrap;">
            <a class="btn" href="#/gigs">Browse gigs</a>
            <a class="btn btn-secondary" href="#/create">Post a gig</a>
          </div>

          <div class="grid grid-3" style="margin-top:16px;">
            ${featureCard("Smart matching", "Based on pay, availability, skills, personality.")}
            ${featureCard("Simple posting", "Create gigs in minutes with clear stipulations.")}
            ${featureCard("Worker-first", "You control when, where, and for how much.")}
          </div>
        </div>

        <div>
          <div class="card">
            <div style="display:flex; justify-content:space-between; gap:10px;">
              <div>
                <div class="muted" style="font-weight:700;">Example match</div>
                <div style="font-size:18px; font-weight:900; margin-top:2px;">Weekend Event Staff</div>
                <div class="muted" style="margin-top:3px;">Brooklyn, NY • Sat, Dec 7 • $22/hr</div>
              </div>
              <span class="badge">92% fit</span>
            </div>

            <div style="margin-top:12px; display:flex; flex-wrap:wrap; gap:6px;">
              ${pill("Pay ≥ $20/hr")}
              ${pill("Weekend daytime")}
              ${pill("Extroverted")}
            </div>

            <p style="margin-top:10px; font-size:14px;">“You match this gig based on your profile. Apply with one tap.”</p>
            <div style="display:flex; gap:8px; margin-top:8px;">
              <button class="btn" disabled style="flex:1;">Apply (coming soon)</button>
              <button class="btn btn-secondary" disabled style="flex:1;">Save</button>
            </div>
          </div>

          <div class="grid grid-2" style="margin-top:10px;">
            <div class="card">
              <div style="font-size:22px; font-weight:900;">2 min</div>
              <div class="muted">average post time</div>
            </div>
            <div class="card">
              <div style="font-size:22px; font-weight:900;">Instant</div>
              <div class="muted">worker notifications</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 style="font-size:22px; font-weight:900;">How GigMatch works</h2>
        <p class="muted" style="font-size:14px;">Two-sided marketplace with an auto-matching engine (later).</p>
        <div class="grid grid-3" style="margin-top:12px;">
          ${howCard("Workers build a profile", "Pay willingness, availability, skills, and vibe.")}
          ${howCard("Sellers post gigs", "Describe work, pay, timing, location, and traits.")}
          ${howCard("Auto-match + notify", "Workers get matched instantly when gigs go live.")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="card" style="background:#111827; color:white; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-size:18px; font-weight:900;">Ready to try it?</div>
            <div class="muted" style="color:#ffffffcc;">Pages are live. Matching and auth come next.</div>
          </div>
          <div style="display:flex; gap:8px;">
            <a class="btn btn-secondary" href="#/gigs">Browse gigs</a>
            <a class="btn" href="#/create">Post a gig</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function featureCard(title, text) {
  return `
    <div class="card" style="padding:12px;">
      <div style="font-weight:800; font-size:14px;">${title}</div>
      <div class="muted">${text}</div>
    </div>
  `;
}

function howCard(title, text) {
  return `
    <div class="card">
      <div style="font-weight:900;">${title}</div>
      <div class="muted" style="margin-top:6px;">${text}</div>
    </div>
  `;
}

/* ---------- Page: Create Gig ---------- */
function renderCreate() {
  app.innerHTML = `
    <section class="page-wrap">
      <div class="container split">
        <div>
          <div class="title-row">
            <h1 style="font-size:22px; font-weight:900; margin:0;">Post a gig</h1>
          </div>
          <div class="muted">Tell us what you need and who fits best.</div>

          <form id="createForm" class="grid" style="margin-top:14px;">
            <div class="card">
              <div style="font-size:13px; font-weight:900;">Basics</div>
              <div class="grid grid-2" style="margin-top:10px;">
                ${field("Title", "title", "e.g., Bartender for wedding", true)}
                ${selectField("Category", "category", ["Events","Hospitality","Labor","Retail","Pets","Admin","Other"])}
                ${field("Pay amount", "payAmount", "22", true, "number")}
                ${selectField("Pay type", "payType", [
                  { label:"Per hour", value:"hour" },
                  { label:"Flat rate", value:"flat" }
                ])}
                ${field("Date / frequency", "date", "Sat Dec 7 or Mon–Fri")}
                ${field("Time window", "timeWindow", "10am–6pm")}
                ${field("Location", "location", "City, neighborhood, or address", true, "text", true)}
                ${textareaField("Description", "description", "What will the worker do? What should they know?", true, true)}
              </div>
            </div>

            <div class="card">
              <div style="font-size:13px; font-weight:900;">Matching stipulations (used later)</div>
              <div class="muted">These fields will power auto-matching.</div>
              <div class="grid grid-2" style="margin-top:10px;">
                ${field("Minimum pay willingness", "minPayWillingness", "20", false, "number")}
                ${field("Required availability", "requiredAvailability", "Weekend daytime")}
                ${field("Desired personality", "personality", "Outgoing, calm, detail-oriented")}
                ${field("Tags / skills", "tags", "serving, lifting, bilingual")}
              </div>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:8px;">
              <button type="button" id="clearBtn" class="btn btn-ghost">Clear</button>
              <button type="submit" class="btn">Create gig</button>
            </div>
          </form>
        </div>

        <aside class="aside-sticky">
          <div class="card" id="previewCard">
            <!-- preview injected by JS -->
          </div>

          <div class="card" style="margin-top:12px;">
            <div style="font-size:13px; font-weight:900;">What happens next?</div>
            <ul class="muted" style="line-height:1.6;">
              <li>Sellers will save gigs to the database.</li>
              <li>Workers will be auto-matched on publish.</li>
              <li>Workers will get notifications for matches.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  `;

  const form = document.getElementById("createForm");
  const clearBtn = document.getElementById("clearBtn");

  const state = {
    title: "",
    category: "Events",
    payAmount: "",
    payType: "hour",
    date: "",
    timeWindow: "",
    location: "",
    description: "",
    minPayWillingness: "",
    requiredAvailability: "",
    personality: "",
    tags: ""
  };

  // update preview + state
  form.addEventListener("input", (e) => {
    if (!e.target.name) return;
    state[e.target.name] = e.target.value;
    renderPreview(state);
  });

  clearBtn.addEventListener("click", () => {
    form.reset();
    Object.keys(state).forEach(k => state[k] = (k === "category" ? "Events" : k === "payType" ? "hour" : ""));
    renderPreview(state);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Build gig object (still UI-only)
    const gig = {
      id: "gig_" + Math.random().toString(36).slice(2),
      title: state.title.trim(),
      category: state.category,
      pay: Number(state.payAmount || 0),
      payType: state.payType,
      location: state.location.trim(),
      date: state.date.trim() || "TBD",
      timeWindow: state.timeWindow.trim() || "TBD",
      description: state.description.trim(),
      traits: state.tags ? state.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
      stipulations: {
        minPayWillingness: state.minPayWillingness ? Number(state.minPayWillingness) : null,
        requiredAvailability: state.requiredAvailability || null,
        personality: state.personality || null
      }
    };

    saveCreatedGig(gig);
    alert("Gig created (UI only). It will appear in Browse gigs.");
    location.hash = "#/gigs";
  });

  renderPreview(state);
}

function renderPreview(s) {
  const preview = document.getElementById("previewCard");
  if (!preview) return;

  preview.innerHTML = `
    <div style="font-size:13px; font-weight:900;">Preview</div>
    <div style="font-size:18px; font-weight:900; margin-top:6px;">
      ${escapeHtml(s.title) || "Gig title will appear here"}
    </div>

    <div style="margin-top:8px; display:flex; flex-wrap:wrap; gap:6px;">
      ${s.category ? pill(s.category) : ""}
      ${s.location ? pill(s.location) : ""}
      ${s.payAmount ? pill(`$${escapeHtml(s.payAmount)}/${s.payType === "hour" ? "hr" : "flat"}`) : ""}
      ${s.date ? pill(s.date) : ""}
    </div>

    <div style="margin-top:10px; font-size:14px; white-space:pre-wrap;">
      ${escapeHtml(s.description) || "Gig description preview..."}
    </div>

    <hr class="sep" />
    <div class="muted" style="font-weight:800;">Stipulations (later)</div>
    <div style="margin-top:6px; display:flex; flex-wrap:wrap; gap:6px;">
      ${s.minPayWillingness ? pill(`Pay ≥ $${escapeHtml(s.minPayWillingness)}`) : ""}
      ${s.requiredAvailability ? pill(s.requiredAvailability) : ""}
      ${s.personality ? pill(s.personality) : ""}
      ${s.tags ? pill(s.tags) : ""}
      ${(!s.minPayWillingness && !s.requiredAvailability && !s.personality && !s.tags) ? "<div class='muted'>Nothing yet</div>" : ""}
    </div>
  `;
}

function field(label, name, placeholder="", required=false, type="text", span2=false) {
  return `
    <label style="${span2 ? "grid-column:1/-1" : ""}">
      ${label}
      <input name="${name}" type="${type}" placeholder="${placeholder}" ${required ? "required" : ""} />
    </label>
  `;
}
function textareaField(label, name, placeholder="", required=false, span2=false) {
  return `
    <label style="${span2 ? "grid-column:1/-1" : ""}">
      ${label}
      <textarea name="${name}" placeholder="${placeholder}" ${required ? "required" : ""}></textarea>
    </label>
  `;
}

function selectField(label, name, options) {
  const html = options.map(opt => {
    if (typeof opt === "string") return `<option value="${opt}">${opt}</option>`;
    return `<option value="${opt.value}">${opt.label}</option>`;
  }).join("");

  return `
    <label>
      ${label}
      <select name="${name}">${html}</select>
    </label>
  `;
}

/* ---------- Page: Browse Gigs ---------- */
function renderBrowse() {
  const gigs = loadGigs();

  app.innerHTML = `
    <section class="page-wrap">
      <div class="container split" style="grid-template-columns:.9fr 1.1fr;">
        <aside class="aside-sticky">
          <div class="card">
            <div class="title-row">
              <h1 style="font-size:22px; font-weight:900; margin:0;">Browse gigs</h1>
            </div>
            <div class="muted">Discover what’s available right now.</div>

            <div class="grid" style="margin-top:12px;">
              <label>
                Search
                <input id="q" placeholder="Try ‘events’, ‘Queens’, ‘dog’…" />
              </label>
              <label>
                Category
                <select id="cat">
                  <option>All</option>
                  <option>Events</option>
                  <option>Hospitality</option>
                  <option>Labor</option>
                  <option>Retail</option>
                  <option>Pets</option>
                  <option>Admin</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                Minimum pay
                <input id="payMin" type="number" min="0" placeholder="20" />
              </label>
            </div>

            <hr class="sep" />
            <div style="font-size:13px; font-weight:900;">Auto-match preview</div>
            <div class="muted">Workers will soon get matches based on their profiles.</div>
            <div class="card" style="background:#f9fafb; margin-top:8px; padding:10px;">
              <div class="muted" style="font-weight:800;">Your profile (mock)</div>
              <div style="margin-top:6px; display:flex; flex-wrap:wrap; gap:6px;">
                ${pill("Pay willingness ≥ $20/hr")}
                ${pill("Weekend daytime")}
                ${pill("Outgoing")}
              </div>
            </div>
            <button class="btn btn-secondary" style="width:100%; margin-top:8px;" disabled>
              View matches (coming soon)
            </button>
          </div>
        </aside>

        <section id="gigList" class="grid"></section>
      </div>
    </section>
  `;

  const qEl = document.getElementById("q");
  const catEl = document.getElementById("cat");
  const payEl = document.getElementById("payMin");
  const listEl = document.getElementById("gigList");

  function renderList() {
    const q = qEl.value.trim().toLowerCase();
    const cat = catEl.value;
    const minPay = payEl.value ? Number(payEl.value) : null;

    const filtered = gigs.filter(g => {
      const matchesQuery =
        !q || [g.title, g.description, g.location, g.category]
          .some(x => x.toLowerCase().includes(q));
      const matchesCat = (cat === "All") || (g.category === cat);
      const matchesPay = !minPay || g.pay >= minPay;
      return matchesQuery && matchesCat && matchesPay;
    });

    if (!filtered.length) {
      listEl.innerHTML = `<div class="card empty">No gigs match your filters yet.</div>`;
      return;
    }

    listEl.innerHTML = filtered.map(gigCard).join("");
  }

  qEl.addEventListener("input", renderList);
  catEl.addEventListener("change", renderList);
  payEl.addEventListener("input", renderList);

  renderList();
}

function gigCard(g) {
  const traits = (g.traits || []).map(t => pill(t)).join("");
  return `
    <article class="card grid">
      <div style="display:flex; justify-content:space-between; gap:10px; align-items:flex-start;">
        <div>
          <div style="font-size:17px; font-weight:900;">${escapeHtml(g.title)}</div>
          <div class="muted" style="margin-top:4px;">
            ${escapeHtml(g.location)} • ${escapeHtml(g.date)} • ${escapeHtml(g.timeWindow)}
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:18px; font-weight:900;">
            $${g.pay}${g.payType === "hour" ? "/hr" : ""}
          </div>
          <div class="muted">${escapeHtml(g.category)}</div>
        </div>
      </div>

      <div style="font-size:14px;">${escapeHtml(g.description)}</div>

      <div style="display:flex; flex-wrap:wrap; gap:6px;">
        ${traits}
      </div>

      <div style="display:flex; gap:8px;">
        <button class="btn" style="flex:1;" disabled>Apply (coming soon)</button>
        <button class="btn btn-secondary" style="flex:1;" disabled>Save</button>
      </div>
    </article>
  `;
}

/* ---------- Not Found ---------- */
function renderNotFound() {
  app.innerHTML = `
    <section class="page-wrap">
      <div class="container">
        <div class="card empty">
          <div style="font-size:24px; font-weight:900;">404</div>
          <div style="margin-top:6px;">That page doesn’t exist.</div>
          <a href="#/" class="btn" style="margin-top:10px;">Go home</a>
        </div>
      </div>
    </section>
  `;
}

/* ---------- Small UI helpers ---------- */
function pill(text) {
  return `<span class="pill"><span class="dot"></span>${escapeHtml(text)}</span>`;
}
function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll("\"","&quot;")
    .replaceAll("'","&#039;");
}
