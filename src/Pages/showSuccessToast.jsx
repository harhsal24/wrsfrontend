import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CustomToast({ message }) {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}

export function showSuccessToast(message) {
  toast.success(<CustomToast message={message} />, {
    position: 'top-right',
    autoClose: 3000, // Close the notification after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}
