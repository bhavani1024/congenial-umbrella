import React, { useState } from 'react'
import { ChatGroq } from "@langchain/groq";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const Streaming = () => {

    const [aiResponse, setAiResponse] = useState("")
    const [allChats, setAllChats] = useState()


    const llm = new ChatGroq({
            model: "mixtral-8x7b-32768",
            temperature: 0,
            maxTokens: undefined,
            maxRetries: 2,
            apiKey: GROQ_API_KEY,
            // other params...
          });

          const getAiAnswer =async ()=>{
            const stream = await llm.stream(
                "count from 1 to 10"
              );

              
              
              for await (const chunk of stream) {
                // console.log(`${chunk.content}`);
                setAiResponse( aiResponse => aiResponse + " " + chunk.content )

                
              } 
              
          }
    


  return (
    <div><h1>Streaming response from the api</h1>
    <button onClick={()=>{getAiAnswer()}}>Press me!</button>
    <div
  style={{
    backgroundColor: '#f0f0f0',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    width: '80%',
    margin: '40px auto',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    color: '#333',
    textAlign: 'justify',
    lineHeight: '1.5',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  }}
>
  {aiResponse}

</div>
 
    </div>
  )
}

