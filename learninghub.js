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

// Event delegation for Read More functionality
document.body.addEventListener("click", async function (event) {
  if (event.target.classList.contains("read-more")) {
    event.preventDefault();
    const button = event.target;
    const card = button.closest(".card");
    if (!card) return;

    const topicTitle = card.querySelector("h3")?.textContent.trim();
    const category = card.dataset.category;

    try {
      const queryParams = new URLSearchParams();
      if (topicTitle) queryParams.append("title", topicTitle);
      if (category) queryParams.append("category", category);

      const response = await fetch(`http://localhost:3000/api/content?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }
      const data = await response.json();
      displayContentModal(data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }
});

// Function to display content in a modal
function displayContentModal(content) {
  let existingModal = document.querySelector(".modal");
  if (existingModal) existingModal.remove();

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <h2>${content.title}</h2>
      <p>${content.description}</p>
      <button class="close-modal">Close</button>
    </div>
  `;

  document.body.appendChild(modal);
  document.querySelector(".close-modal").addEventListener("click", () => modal.remove());
}

// Fetch content using axios
import axios from 'axios';
axios.get('http://localhost:3000/api/content/')
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));
