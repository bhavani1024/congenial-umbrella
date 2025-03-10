import React, { useState } from "react";
import '../../App.css'
import Groq from "groq-sdk";
const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;

export const ApiEndpoint = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [modelName, setModelName] = useState("llama-3.3-70b-versatile");
  const [theme,setTheme] = useState()

  const modelNamesArray = [
    "distil-whisper-large-v3-en",
    "gemma2-9b-it",
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "llama-guard-3-8b",
    "llama3-70b-8192",
    "llama3-8b-8192",
    "mixtral-8x7b-32768",
    "whisper-large-v3",
    "whisper-large-v3-turbo",
  ];

  const groq = new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true });

  async function main() {
    const chatCompletion = await getGroqChatCompletion();
    // Print the completion returned by the LLM.
    console.log(chatCompletion.choices[0]?.message?.content || "");
  }

  async function getGroqChatCompletion() {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
  }

  return (
    <div>
      <div className="response_box">
        <div>
          <h3>Dropdown Component</h3>
          <button className="dropdown_item" onClick={() => setIsOpen(!isOpen)}>
            {modelName}
          </button>
          {isOpen && (
            <div>
              {modelNamesArray.map((modelName, index) => (
                <div
                  className="dropdown_item"
                  key={index}
                  onClick={() => {
                    setModelName(modelName);
                    setIsOpen(!isOpen);
                  }}
                >
                  {modelName}
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          type="text"
          value={query}
          onChange={() => {
            setQuery(event.target.value);
          }}
        />
        <button
          onClick={() => {
            main();
            console.log(query);
          }}
        >
          click
        </button>
      </div>
      
    </div>
  );
};
