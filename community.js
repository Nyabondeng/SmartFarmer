/* like button hover and comment */
function toggleLike(element) {
    let icon = element.querySelector("i");
    let countSpan = element.querySelector(".like-count");
    let count = parseInt(countSpan.textContent);

    if (icon.classList.contains("liked")) {
        icon.classList.remove("liked");
        icon.style.color = ""; // Reset to default color
        countSpan.textContent = count - 1;
    } else {
        icon.classList.add("liked");
        icon.style.color = "blue";
        countSpan.textContent = count + 1;
    }
}

function toggleReplies(element) {
    let repliesContainer = element.closest(".convo-card-details").nextElementSibling;
    repliesContainer.style.display = repliesContainer.style.display === "none" ? "block" : "none";
}

function addComment(button) {
    let commentText = prompt("Enter your comment:");
    if (commentText) {
        let repliesList = button.previousElementSibling;
        let newComment = document.createElement("div");
        newComment.classList.add("reply");
        newComment.innerHTML = `
            <p>${commentText}</p>
            <span class="reply-action" onclick="replyToComment(this)">Reply</span>
            <div class="nested-replies"></div>
        `;
        repliesList.appendChild(newComment);

        // Update comment count
        let convoCard = button.closest(".replies-container").previousElementSibling;
        let countSpan = convoCard.querySelector(".comment-count");
        let count = parseInt(countSpan.textContent);
        countSpan.textContent = count + 1;

        // Prepend the newly added comment to the top of the convo-cards section
        let discussionContainer = document.getElementById("discussionContainer");
        let newConvoCard = document.createElement("div");
        newConvoCard.classList.add("convo-card");
        newConvoCard.innerHTML = `
            <div class="convo-card-info">
                <img src="./images/images (1).jpeg" alt="User">
                <span class="name">New Commenter</span>
                <p>${commentText}</p>
                <div class="convo-card-details">
                    <span class="likes" onclick="toggleLike(this)">
                        <i class="fa fa-thumbs-up"></i> <span class="like-count">0</span>
                    </span>
                    <span class="messages" onclick="toggleReplies(this)">
                        <i class="fa fa-comment"></i> <span class="comment-count">0</span>
                    </span>
                    <span class="time-info">Just now</span>
                </div>
            </div>
        `;
        discussionContainer.prepend(newConvoCard);  // Prepend the new comment to the top
    }
}

function replyToComment(element) {
    let replyText = prompt("Enter your reply:");
    if (replyText) {
        let nestedReplies = element.nextElementSibling;
        let newReply = document.createElement("div");
        newReply.classList.add("nested-reply");
        newReply.innerHTML = `<p>${replyText}</p>`;
        nestedReplies.appendChild(newReply);
    }
}

/* Modal functions for Create Post */
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("postModal");
    const openPostButton = document.getElementById("openPostButton");
    const closeModal = document.getElementById("closeModal");
    const submitPostButton = document.getElementById("submitPostButton");
    const discussionContainer = document.querySelector(".convo-card-container");

    // Ensure modal is hidden on page load
    modal.style.display = "none";

    // Open Modal
    openPostButton.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // Close Modal
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal when clicking outside of content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Post Submission
    submitPostButton.addEventListener("click", function () {
        const name = document.getElementById("postName").value.trim();
        const prompt = document.getElementById("PostPromt").value.trim();
        const question = document.getElementById("postQuestion").value.trim();

        if (name === "" || question === "") {
            alert("Please fill in all required fields.");
            return;
        }

        const postElement = document.createElement("div");
        postElement.classList.add("card");
        postElement.innerHTML = `
            <div class="convo-card-info">
                <img src="./images/images (1).jpeg" alt="User">
                <span class="name">${name}</span>
                <h3>New Discussion</h3>
                <p>${question}</p>
                ${prompt ? `<p><strong>Prompt:</strong> ${prompt}</p>` : ''}
                <div class="convo-card-details">
                    <span class="likes" onclick="toggleLike(this)">
                        <i class="fa fa-thumbs-up"></i> <span class="like-count">0</span>
                    </span>
                    <span class="messages" onclick="toggleReplies(this)">
                        <i class="fa fa-comment"></i> <span class="comment-count">0</span>
                    </span>
                    <span class="time-info">Just now</span>
                </div>
            </div>
            <div class="replies-container" style="display: none;">
                <div class="replies-list"></div>
                <button onclick="addComment(this)">Add Comment</button>
            </div>
        `;

        discussionContainer.prepend(postElement);

        // Clear inputs and close modal
        document.getElementById("postName").value = "";
        document.getElementById("PostPromt").value = "";
        document.getElementById("postQuestion").value = "";
        modal.style.display = "none";
    });
});
