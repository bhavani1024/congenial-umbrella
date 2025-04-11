import React, { useState } from "react";

import { ChatBot } from "./ChatBot";
import { GPTChatBot } from "./GPTChatBot";


export const ChatUi = () => {
    
    const [isVisible, setIsVisible] = useState(false)


  
  
  const handleChatBotVisibility = ()=>{
    setIsVisible(!isVisible)
    
    
  }

  return (
    <>
    {<GPTChatBot visibility = {isVisible}/> }
    <button id="ChatUiButton" className="fixed bottom-5 right-5 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={()=>{handleChatBotVisibility() }}>chat</button>
     
   
   
    </>
  );
};
