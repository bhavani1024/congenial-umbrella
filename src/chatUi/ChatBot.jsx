import React, { useState } from "react";
import { ChatGroq } from "@langchain/groq";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
import { flushSync } from "react-dom";

export const ChatBot = ({visibility}) => {
  console.log(visibility+ " test");
  
  const [aiResponse, setAiResponse] = useState("");
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
    // other params...
  });
  const handleChatUpdate = () => {
    setChatHistory([...chatHistory, { text: userQuery, isBot: false }]);
    // console.log(chatHistory.pop().text);
    getAiAnswer()
  };
  const handleChatUpdateAI = () => {
    setChatHistory([...chatHistory, { text: aiResponse, isBot: true }]);
    console.log(chatHistory);
  };
  const getAiAnswer = async () => {
    const aiReply = await llm.invoke([
      {
        role: "system",
        content: "the user has a question regarding the coding problem , you are to only give suggestion for the solution and not the exact solution",
      },
      { role: "user", content: userQuery },
    ]);
    setChatHistory([...chatHistory,{ text: userQuery, isBot: false } ,{ text: aiReply.content, isBot: true }]);
  };

  return (
    <div id="ChatBotContainer" className={visibility ? "" : "ChatBotHidden"}>
      <div id="ChatBotChatMessages">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={message.isBot ? "bot-message" : "user-message"}
          >
            <span>{message.text}</span>
          </div>
        ))}
      </div>

      <div id="ChatBotFooter">
        <input
          type="text"
          id="ChatBotInput"
          placeholder="enter query"
          value={userQuery}
          onChange={(event) => {
            setUserQuery(event.target.value);
          }}
        />
        <button
          id="ChatBotSubmit"
          onClick={() => {
           flushSync(()=>{
            handleChatUpdate()
           })
          
           
          }}
        >
          submit
        </button>
      </div>
    </div>
  );
};
