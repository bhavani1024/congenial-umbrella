import React, { useState } from "react";
import { ChatGroq } from "@langchain/groq";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
import { flushSync } from "react-dom";


export const AiPage = () => {

  
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
    
    getAiAnswer()
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
    setUserQuery("")
  };

  return (


    <div id="AiPageContainer" >
      <div id="AiPageChatMessages">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={message.isBot ? "bot-message" : "user-message"}
          >
            <span>{message.text}</span>
          </div>
        ))}
      </div>

      <div id="AiPageFooter">
        <input
          type="text"
          id="AiPageInput"
          placeholder="enter query"
          value={userQuery}
          onChange={(event) => {
            setUserQuery(event.target.value);
          }}
        />
        <button
          id="AiPageSubmit"
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
