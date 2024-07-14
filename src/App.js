import './App.css';
import './bot/widgets/styles/Options.css'
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
          headerText='Claim Insurance Automation'
        />
    </div>
  );
}

export default App;
