// script.js

document.addEventListener("DOMContentLoaded", () => {
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

      // Optional: reset form for now
      form.reset();
    });
  }
});
