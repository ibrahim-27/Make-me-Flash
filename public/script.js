console.log("adasdas");

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.toggle-answer-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const answerDiv = button.nextElementSibling;
            if (answerDiv.style.display === 'none') {
                answerDiv.style.display = 'block';
                button.textContent = 'Hide Answer';
            } else {
                answerDiv.style.display = 'none';
                button.textContent = 'Show Answer';
            }
        });
    });
});

function toggleEditForm(cardId) {
    const form = document.getElementById(`edit-form-${cardId}`);
    form.classList.toggle('hidden');
}

async function deleteFlashcard(cardId) {
try {
    const response = await fetch(`/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        alert('Flashcard deleted successfully!');
        window.location.reload(); 
    } else {
        alert('Failed to delete flashcard.');
    }
} catch (error) {
    console.error('Error:', error);
}
}

async function updateFlashcard(cardId) {
const question = document.getElementById(`edit-ques-${cardId}`).value;
const answer = document.getElementById(`edit-ans-${cardId}`).value;

try {
    const response = await fetch(`/cards/${cardId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ques: question, ans: answer })
    });

    if (response.ok) {
        alert('Flashcard updated successfully!');
        window.location.reload(); 
    } else {
        alert('Failed to update flashcard.');
    }
} catch (error) {
    console.error('Error:', error);
}
}

async function handleAIFormSubmission() {
    const prompt = document.getElementById('ai-prompt').value;
    const errorMessageContainer = document.getElementById('error-message');

    try {
        const response = await fetch('/ai/prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        });

        const result = await response.json();

        // Handle errors if they exist in the response
        if (result.error) {
            errorMessageContainer.textContent = result.error;
            errorMessageContainer.classList.remove('hidden');
        } else {
            errorMessageContainer.classList.add('hidden');
            window.location.href = '/cards'; 
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessageContainer.textContent = 'An unexpected error occurred. Please try again.';
        errorMessageContainer.classList.remove('hidden');
    }
}