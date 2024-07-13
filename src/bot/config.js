// src/bot/config.js

import { createChatBotMessage } from 'react-chatbot-kit';
import ImageUpload from './ImageUpload';
import ImageWidget from './ImageWidget';

const config = {
  botName: "ChatBot",
  initialMessages: [createChatBotMessage(`Hello! How can I help you today?`)],
  widgets: [
    {
      widgetName: "imageUpload",
      widgetFunc: (props) => <ImageUpload {...props} />,
    },
    {
      widgetName: "image",
      widgetFunc: (props) => <ImageWidget {...props} />,
    },
  ],
};

export default config;
