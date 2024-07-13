import './App.css';
import Chatbot from 'react-chatbot-kit'
// import 'react-chatbot-kit/build/main.css'
import config from '../src/bot/config.js';
import MessageParser from '../src/bot/MessageParser.jsx';
import ActionProvider from '../src/bot/ActionProvider.jsx';

function App() {
  return (
    <div className="App">
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
    </div>
  );
}

export default App;
