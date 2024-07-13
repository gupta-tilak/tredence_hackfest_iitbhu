// src/bot/config.js

import { createChatBotMessage } from 'react-chatbot-kit';
import ImageUpload from './widgets/ImageUpload';
import ImageWidget from './widgets/ImageWidget';
import Overview from './widgets/Overview';

const config = {
  botName: "ChatBot",
  initialMessages: [
    createChatBotMessage(
      `Hi, I'm here to help you process your claim`
    ),
    createChatBotMessage(
      "Here's a quick overview of what I can help you with. You can also type in.",
      {
        withAvatar: false,
        delay: 400,
        widget: "overview"
      }
    )
  ],
  widgets: [
    {
      widgetName: "overview",
      widgetFunc: (props) => <Overview {...props} />,
      mapStateToProps: ["messages"]
    },
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
