// script.js

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     CREATE GIG FORM (demo)
     ========================= */
  const form = document.getElementById("createGigForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      console.log("Gig created (UI only, no backend yet):", data);

      alert(
        "Gig form submitted (demo only).\n\n" +
          "Check the browser console to see the captured data."
      );

      form.reset();
    });
  }

  /* =========================
     UNIVERSAL HAMBURGER NAV
     Works for:
     - landing page (.landing-mobile-panel)
     - other pages (.mobile-panel)
     ========================= */
  document.querySelectorAll(".nav-toggle").forEach((toggle) => {
    const header = toggle.closest("header") || document.body;

    // find whichever panel exists on that page
    const panel =
      header.querySelector(".mobile-panel") ||
      header.querySelector(".landing-mobile-panel");

    if (!panel) return;

    toggle.addEventListener("click", () => {
      const open = panel.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      panel.setAttribute("aria-hidden", open ? "false" : "true");
    });

    // close menu after tapping a link
    panel.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        panel.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        panel.setAttribute("aria-hidden", "true");
      })
    );
  });
});
