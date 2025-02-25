// Crop monitoring functionality
document.getElementById('cropForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const cropStatus = document.getElementById('cropStatus').value;
    
    // Basic validation
    if (!cropStatus) {
      alert("Please enter a crop status.");
      return;
    }
  
    // Provide feedback based on crop status
    const feedback = getCropFeedback(cropStatus);
    document.getElementById('cropFeedback').innerHTML = `<p>${feedback}</p>`;
  });
  
  // Sample feedback logic for crop health
  function getCropFeedback(status) {
    if (status.toLowerCase().includes("healthy")) {
      return "Your crops are in good condition! Keep up the great work!";
    } else if (status.toLowerCase().includes("unhealthy")) {
      return "Your crops may need attention. Consider checking for pests or water issues.";
    } else {
      return "Please provide more information about your crop's status.";
    }
  }
  
  // Login functionality (simple validation for now)
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === "farmer" && password === "password123") {
      alert("Login successful!");
    } else {
      alert("Invalid username or password.");
    }
  });
  