// src/bot/config.js

import { createChatBotMessage } from 'react-chatbot-kit';
import ImageUpload from './widgets/ImageUpload';
import ImageWidget from './widgets/ImageWidget';
import Overview from './widgets/Overview';
import DamageUpload from './widgets/DamageUpload';
import DamageWidget from './widgets/DamageWidget';

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
      widgetName: "damageUpload",
      widgetFunc: (props) => <DamageUpload {...props} />,
    },
    {
      widgetName: "image",
      widgetFunc: (props) => <ImageWidget {...props}/>,
      mapStateToProps: ["payload"],
    },
    {
      widgetName: "damageImage",
      widgetFunc: (props) => <DamageWidget {...props}/>,
      mapStateToProps: ["payload"],
    },
  ],
};

export default config;
