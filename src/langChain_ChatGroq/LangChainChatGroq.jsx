import React from 'react'
import { ChatGroq } from "@langchain/groq";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;


export const LangChainChatGroq = () => {


    const llm = new ChatGroq({
        model: "mixtral-8x7b-32768",
        temperature: 0,
        maxTokens: undefined,
        maxRetries: 2,
        apiKey: GROQ_API_KEY,
        // other params...
      });


      const getAiAnswer =async ()=>{
        const aiMsg = await llm.invoke([
            {
              role: "system",
              content:
                "you are to answer the question that the user has",
            },
            { role: "user", content: "explain why i have two objects in the llm.invoke function they both have the role key and their values are user and system" },
          ]);
          console.log(aiMsg.content);
          
          
      }

  return (
    <div><h1>LangChainChatGroq</h1>
    <button onClick={()=>{getAiAnswer()}}>Press me!</button>
    </div>
  )
}

