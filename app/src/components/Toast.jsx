import React, { useState, useEffect } from 'react';

let toastHandler; // Declare a global handler for the showToast function

const Toast = () => {
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  useEffect(() => {
    // Assign the showToast function to the global handler
    toastHandler = (message, type) => {
      setToast({ message, type, visible: true });

      // Hide the toast after 5 seconds
      setTimeout(() => {
        setToast({ message: '', type: '', visible: false });
      }, 5000);
    };
  }, []);

  return (
    toast.visible && (
      <div
        className={`fixed w-72 text-center top-8 right-4 p-4 rounded-lg shadow-lg transition-transform transform z-10 ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        <p className="text-white">{toast.message}</p>
      </div>
    )
  );
};

// Export the Toast component and the global showToast function
const showToast = (message, type) => {
  if (toastHandler) {
    toastHandler(message, type);
  }
};

export { Toast, showToast };