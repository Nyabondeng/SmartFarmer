document.addEventListener("DOMContentLoaded", () => {
  // Dark mode toggle
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }
});

// Crop monitoring form submission
const cropForm = document.getElementById("cropform");
if (cropForm) {
  cropForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const cropStatus = document.getElementById("cropStatus").value;
    document.getElementById("cropFeedback").innerText = `Crop status recorded: ${cropStatus}`;
  });
}

// Contact form validation
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Thank you for reaching out! We'll get back to you soon.");
  });
}

// Menu icon toggle
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("show");
}

// Fetch content by category
async function fetchContentByCategory(category) {
  try {
    const response = await fetch(`http://localhost:3000/api/content/category/${encodeURIComponent(category)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch content");
    }
    const content = await response.json();
    return content;
  } catch (error) {
    console.error("Error fetching content:", error);
  }
}

// Function to post new content
async function postContent(title, description, category) {
  try {
    const response = await fetch('http://localhost:3000/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, category }),
    });

    if (!response.ok) {
      throw new Error('Failed to post content');
    }

    const data = await response.json();
    alert('Content posted successfully!');
    return data;
  } catch (error) {
    console.error('Error posting content:', error);
    alert('Failed to post content. Please try again.');
  }
}

// Example usage: Call this function when a form is submitted
const contentForm = document.getElementById('contentForm'); // Assuming a form with this ID exists
if (contentForm) {
  contentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('contentTitle').value;
    const description = document.getElementById('contentDescription').value;
    const category = document.getElementById('contentCategory').value;

    await postContent(title, description, category);

    // Optionally, clear the form fields after submission
    contentForm.reset();
  });
}
