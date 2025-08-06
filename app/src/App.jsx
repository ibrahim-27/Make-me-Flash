import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import FlashcardList from './components/FlashcardList';
import { Toast, showToast } from './components/Toast';
import Loader from './components/Loader';

function App() {

  useEffect(() => {
    getFlashcards();
  }, []);

  const [flashcards, setFlashcards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [aiText, setAiText] = useState("");

  const getFlashcards = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/api/flashcards");
      const flashcards = await res.json();
      setFlashcards(flashcards.map((card) => {
        return {...card, isFlipped: false}
      }));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return showToast("Error fetching flashcards", "error");
    }
  }

  const addFlashcard = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return showToast("Please fill in both fields", "error");
    
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: newQuestion, answer: newAnswer }),
      });
      const newFlashcard = await res.json();
      setFlashcards([newFlashcard, ...flashcards]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return showToast("Error creating flashcard", "error");
    }
    
    setNewQuestion("");
    setNewAnswer("");

    return showToast("Flashcard added!", "success");
  };

  const toggleFlashcard = (id) => {
    setFlashcards(
      flashcards.map((card) =>
        card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
      )
    );
  };

  const deleteFlashcard = async (id) => {
    try {
      setIsLoading(true);
      await fetch(`http://localhost:3000/api/flashcards/${id}`, {
        method: "DELETE",
      });
      setFlashcards(flashcards.filter((card) => card.id !== id));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return showToast("Error deleting flashcard", "error");
    }

    return showToast("Flashcard deleted!", "success");
  };

  const generateAIFlashcards = async (e) => {
    e.preventDefault();

    if (!aiText.trim()) return showToast("Please fill in the text", "error");
    if (aiText.length < 20) return showToast("Text should be at least 20 characters", "error");

    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:3000/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: aiText }),
      });
      
      const ai_flashcards = await res.json();

      if (ai_flashcards.error) {
        setIsLoading(false);
        return showToast(ai_flashcards.error, "error");
      }

      setFlashcards([...ai_flashcards, ...flashcards]);
      setIsLoading(false);
      showToast("Flashcards generated!", "success");
    } catch (error) {
      setIsLoading(false);
      return showToast("Error generating flashcard", "error");
    }
    setAiText("");
  };

  return (
    <>  
    {isLoading && <Loader />}
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center py-8">
      <Toast message="Flashcard added!" type="success" />
      <h1 className="text-5xl font-bold text-center mb-8 text-white/90">Make-Me-Flash</h1>
      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-8">
        <Sidebar
          newQuestion={newQuestion}
          setNewQuestion={setNewQuestion}
          newAnswer={newAnswer}
          setNewAnswer={setNewAnswer}
          addFlashcard={addFlashcard}
          aiText={aiText}
          setAiText={setAiText}
          generateAIFlashcards={generateAIFlashcards}
        />
        <FlashcardList
          flashcards={flashcards}
          toggleFlashcard={toggleFlashcard}
          deleteFlashcard={deleteFlashcard}
        />
      </div>
    </div>
    </>
  );
}

export default App;