const Sidebar = ({
  newQuestion,
  setNewQuestion,
  newAnswer,
  setNewAnswer,
  addFlashcard,
  aiText,
  setAiText,
  generateAIFlashcards,
}) => {
  return (
    <div className="flex flex-col space-y-8 w-full lg:w-1/4">
      {/* Add Flashcard Form */}
      <div className="glassmorphism rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-white/90">Add Flashcard</h2>
        <form onSubmit={addFlashcard} className="space-y-3">
          <input
            type="text"
            placeholder="Enter question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full p-2.5 bg-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white/90"
          />
          <input
            type="text"
            placeholder="Enter answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="w-full p-2.5 bg-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white/90"
          />
          <button
            type="submit"
            className="w-full py-2.5 bg-green-600/80 hover:bg-green-700/80 rounded-lg transition-all text-white/90"
          >
            Add Flashcard
          </button>
        </form>
      </div>

      {/* AI Generator Section */}
      <div className="glassmorphism rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-white/90">
          Use AI to add Flashcards
        </h2>
        <form onSubmit={generateAIFlashcards} className="space-y-3">
          <textarea
            placeholder="Paste your text here..."
            value={aiText}
            onChange={(e) => setAiText(e.target.value)}
            className="w-full h-24 p-2.5 bg-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white/90"
          />
          <button
            type="submit"
            className="w-full py-2.5 bg-green-600/80 hover:bg-green-700/80 rounded-lg transition-all text-white/90"
          >
            Generate Flashcards
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
