import React, { useState } from "react";

import { ChatBot } from "./ChatBot";

export const ChatUi = () => {
    
    const [isVisible, setIsVisible] = useState(false)


  
  
  const handleChatBotVisibility = ()=>{
    setIsVisible(!isVisible)
    
    
  }

  return (
    <>
    {<ChatBot visibility = {isVisible}/> }
    <button id="ChatUiButton" onClick={()=>{handleChatBotVisibility() }}>chat</button>
     

    
    </>
  );
};
