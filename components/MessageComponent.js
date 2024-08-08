'use client';

import { useEffect, useState } from 'react';

function MessageComponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      const response = await fetch('api/messages');
      const result = await response.json();

      if (result.messages) {
        setMessages(result.messages);
        console.log(result);
      }
    }
    fetchMessages();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Messages</h1>
      <div className="w-full max-w-5xl space-y-4">
        {messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className="p-4 border border-gray-300 rounded-md shadow-md"
            >
              <h3 className="text-xl font-semibold">{message.name}</h3>
              <p className="text-gray-700">{message.email}</p>
              <p className="text-gray-700">{message.phone}</p>
              <p className="mt-2">{message.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MessageComponent;
