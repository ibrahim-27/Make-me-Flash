document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".toggle-answer-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const answerDiv = button.nextElementSibling;
      if (answerDiv.style.display === "none") {
        answerDiv.style.display = "block";
        button.textContent = "Hide Answer";
      } else {
        answerDiv.style.display = "none";
        button.textContent = "Show Answer";
      }
    });
  });
});

function toggle_edit_form(cardId) {
  const form = document.getElementById(`edit-form-${cardId}`);
  form.classList.toggle("hidden");
}

async function delete_flashcard(cardId) {
  try {
    const response = await fetch(`/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) window.location.reload();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function update_flashcard(cardId) {
  const question = document.getElementById(`edit-ques-${cardId}`).value;
  const answer = document.getElementById(`edit-ans-${cardId}`).value;

  try {
    const response = await fetch(`/cards/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ques: question, ans: answer }),
    });

    if (response.ok) window.location.reload();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function handle_ai_form() {
  const prompt = document.getElementById("ai-prompt").value;
  const error_msg_div = document.getElementById("error-message");

  try {
    const response = await fetch("/ai/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    const result = await response.json();

    // Handle errors if they exist in the response
    if (result.error) {
      error_msg_div.textContent = result.error;
      error_msg_div.classList.remove("hidden");
    } else {
      error_msg_div.classList.add("hidden");
      window.location.href = "/cards";
    }
  } catch (error) {
    console.error("Error:", error);
    error_msg_div.textContent =
      "An unexpected error occurred. Please try again.";
    error_msg_div.classList.remove("hidden");
  }
}
