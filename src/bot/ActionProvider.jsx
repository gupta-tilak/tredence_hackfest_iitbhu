// ActionProvider.jsx

import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleUpload() {
    const message = this.createChatBotMessage("Please upload your image:", {
      widget: "imageUpload",
    });

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }

  handleImageResponse(data) {
    const { predicted_image, plate_texts } = data;

    const messages = [];

    if (predicted_image) {
      console.log("Image prop:", predicted_image); 
      // Assuming predicted_image is a URL or base64 encoded image data
      messages.push(this.createChatBotMessage("Predicted Image:", {
        widget: "image",  // Assuming you have a widget to display images
        image: predicted_image,
      }));
    }

    if (plate_texts && plate_texts.length > 0) {
      // Show plate texts
      console.log(plate_texts)
      messages.push(this.createChatBotMessage(`Detected Plate Texts: ${plate_texts.join(', ')}`));
    }

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, ...messages],
    }));
  }

  handleOptions = (options) => {
    const message = this.createChatBotMessage(
      "How can I help you? Below are some possible options.",
      {
        widget: "overview",
        loading: true,
        terminateLoading: true,
        ...options
      }
    );

    this.addMessageToState(message);
  };

  handleOpenClaim = () => {
    const message = this.createChatBotMessage(
      "Please enter your Policy Number:"
    );

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
      expectingPolicyNumber: true,  // Set flag to indicate policy number is expected
    }));
  };

  handlePolicyNumber = async (policyNumber) => {
    let message;

    try {
      const docRef = doc(db, "policies", policyNumber);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const policyData = docSnap.data();
        message = this.createChatBotMessage(`Policy found: ${JSON.stringify(policyData)}`);
      } else {
        message = this.createChatBotMessage("Policy not found. Please try again.");
      }
    } catch (error) {
      message = this.createChatBotMessage(`Error: ${error.message}`);
    }

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
      expectingPolicyNumber: false,  // Reset flag
    }));
  };
}

export default ActionProvider;
