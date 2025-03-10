
import './App.css'
import { ApiEndpoint } from './api/chat/ApiEndpoint'
import { LangChainChatGroq } from './langChain_ChatGroq/LangChainChatGroq'
import { PromptTheme } from './ThemeFromPrompt/PromptTheme'
import {Streaming} from './langChainGroqStreaming/Streaming'
import { ChatUi } from './chatUi/ChatUi'

function App() {
  

  return (
    <>
      
      <ChatUi/>
      
    </>
  )
}

export default App
