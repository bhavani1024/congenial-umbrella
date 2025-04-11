import React, { useState } from "react";
import { ChatGroq } from "@langchain/groq";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const  GPTChatBot = ({ visibility }) => {
    console.log(visibility);
    
  const [userQuery, setUserQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { text: "Hello, how can I help you?", isBot: true },
    { text: "Hi, I need some assistance.", isBot: false },
  ]);

  const llm = new ChatGroq({
    model: "mixtral-8x7b-32768",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    apiKey: GROQ_API_KEY,
  });

  const handleChatUpdate = async () => {
    if (!userQuery.trim()) return;

    setChatHistory((prev) => [...prev, { text: userQuery, isBot: false }]);

    await getAiAnswer(userQuery);

    setUserQuery("");
  };

  const getAiAnswer = async (query) => {
    try {
      const aiReply = await llm.invoke([
        {
          role: "system",
          content:
            "The user has a question regarding the coding problem. You are to only give suggestions for the solution and not the exact solution.",
        },
        { role: "user", content: query },
      ]);

      setChatHistory((prev) => [...prev, { text: aiReply.content, isBot: true }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div
      id="ChatBotContainer"
      className={`text-sm fixed bottom-20 right-5 w-96 shadow-lg rounded-xl border border-gray-700 dark:border-gray-600 bg-white dark:bg-gray-900 transition-transform ${
        visibility ? "scale-100" : "scale-0"
      }`}
    >
      {/* Chat Header */}
      <div className="bg-gray-800 dark:bg-gray-700 text-white p-3 rounded-t-xl font-semibold">
        AI ChatBot
      </div>

      {/* Chat Messages */}
      <div
        id="ChatBotChatMessages"
        className="p-3 space-y-2 max-h-64 overflow-y-auto"
      >
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-xs ${
              message.isBot
                ? "bg-blue-500 text-white self-start"
                : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white self-end"
            }`}
          >
            <span>{message.text}</span>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex p-3 border-t border-gray-300 dark:border-gray-700">
        <input
          type="text"
          id="ChatBotInput"
          placeholder="Type a message..."
          className="flex-grow p-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white focus:outline-none"
          value={userQuery}
          onChange={(event) => setUserQuery(event.target.value)}
        />
        <button
          id="ChatBotSubmit"
          onClick={handleChatUpdate}
          className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};
