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

    this.addMessageToState(message);
  }

  handleImageResponse(data) {
    const { predicted_image, plate_texts } = data;

    const messages = [];

    if (predicted_image) {
      messages.push(this.createChatBotMessage("Predicted Image:", {
        widget: "image",
        payload: {predicted_image},
      }));
    }

    if (plate_texts && plate_texts.length > 0) {
      messages.push(this.createChatBotMessage(`Detected Plate Texts: ${plate_texts.join(', ')}`));
    }

    this.addMessageToState(messages);
  }

  handleOptions = () => {
    const message = this.createChatBotMessage(
      "How can I help you? Below are some possible options.",
      {
        widget: "overview",
        loading: true,
        terminateLoading: true,
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
      expectingPolicyNumber: true,
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
        // Show message to upload image with car registration plate
        const uploadImageMessage = this.createChatBotMessage("Please upload an image with the car registration plate:", {
          widget: "imageUpload",
        });
        this.addMessageToState(message);
        this.addMessageToState(uploadImageMessage);
      } else {
        message = this.createChatBotMessage("Policy not found. Please try again.");
        this.addMessageToState(message); // Add "Policy not found" message to state
        this.handleOptions(); // Show back the overview panel
        return;
      }
    } catch (error) {
      message = this.createChatBotMessage(`Error: ${error.message}`);
    }

    // this.addMessageToState(message); // Add the message to state regardless of outcome
    this.setState((prevState) => ({
      ...prevState,
      expectingPolicyNumber: false,
    }));
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: Array.isArray(message) ? [...prevState.messages, ...message] : [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
