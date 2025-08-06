import React from 'react';
import Flashcard from './Flashcard';

const FlashcardList = ({ flashcards, toggleFlashcard, deleteFlashcard }) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center lg:justify-start w-full lg:w-3/4 h-[80vh] overflow-y-auto">
      {flashcards.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full py-16 bg-gray-800/50 rounded-lg">
          <p className="text-2xl font-semibold text-white/80 mb-4">
            No flashcards added yet!
          </p>
          <p className="text-lg text-white/60">
            Start by adding a new flashcard using the form on the left.
          </p>
        </div>
      ) : (
        flashcards.map((card) => (
          <Flashcard
            key={card.id}
            card={card}
            toggleFlashcard={toggleFlashcard}
            deleteFlashcard={deleteFlashcard}
          />
        ))
      )}
    </div>
  );
};

export default FlashcardList;