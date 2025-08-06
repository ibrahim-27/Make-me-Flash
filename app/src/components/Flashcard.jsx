import { FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';

const Flashcard = ({ card, toggleFlashcard, deleteFlashcard }) => {
  return (
    <div className="h-96 flashcard rounded-xl shadow-xl fade-in bg-gray-800 flex flex-col justify-between p-4 w-72">
      {/* Front or Back Content */}
      <div className="flex-1 flex items-center justify-center glassmorphism rounded-xl p-8">
        <p className="text-2xl text-white/90 font-medium text-center w-full overflow-hidden text-ellipsis">
          {card.isFlipped ? card.answer : card.question}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-3 mt-4">
        <button
          onClick={() => toggleFlashcard(card.id)}
          className="flex-1 px-4 py-2.5 bg-blue-600/80 hover:bg-blue-700/80 rounded-lg transition-all flex items-center justify-center gap-2 text-white/90"
        >
          {card.isFlipped ? (
            <FaEyeSlash className="w-4 h-4" />
          ) : (
            <FaEye className="w-4 h-4" />
          )}
          {card.isFlipped ? "Show Question" : "Show Answer"}
        </button>
        <button
          onClick={() => deleteFlashcard(card.id)}
          className="px-4 py-2.5 bg-red-600/80 hover:bg-red-700/80 rounded-lg transition-all flex items-center justify-center"
          aria-label="Delete flashcard"
        >
          <FaTrash className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Flashcard;
