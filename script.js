document.addEventListener("DOMContentLoaded", () => {
  // Dark mode toggle
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Crop monitoring form submission
  document.getElementById("cropform").addEventListener("submit", function(event) {
    event.preventDefault();
    const cropStatus = document.getElementById("cropStatus").value;
    document.getElementById("cropFeedback").innerText = `Crop status recorded: ${cropStatus}`;
  });

  // Contact form validation
  document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thank you for reaching out! We'll get back to you soon.");
  });
});
