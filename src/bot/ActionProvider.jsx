// ActionProvider.jsx

import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleUpload = () => {
    const message = this.createChatBotMessage("Please upload your image:", {
      widget: "imageUpload",
    });
    this.addMessageToState(message);
  };

  handleImageResponse = (data) => {
    const { predicted_image, plate_texts } = data;
    const messages = [];

    const policyData = JSON.parse(localStorage.getItem('policyData'));

    if (!policyData) {
      messages.push(this.createChatBotMessage("Policy data not found. Please enter the policy number again."));
      this.addMessageToState(messages);
      this.handleOptions();
      return;
    }

    if (predicted_image) {
      messages.push(this.createChatBotMessage("Predicted Image:", {
        widget: "image",
        payload: { predicted_image },
      }));
    }

    if (plate_texts && plate_texts.length > 0) {
      messages.push(this.createChatBotMessage(`Detected Plate Texts: ${plate_texts.join(', ')}`));

      if (plate_texts.includes(policyData.regNum)) {
        
        messages.push(this.createChatBotMessage("Genuine User validated. Claim can be processed."));
        messages.push(this.createChatBotMessage("Please Upload Image of your Damaged Car",{
          widget: "damageUpload",
        }))
        this.addMessageToState(messages);
      } else {
        messages.push(this.createChatBotMessage("Fraud detected."));
        this.addMessageToState(messages);
        this.handleOptions(); // Show back the overview panel
        return;
      }
    }
  };

  handleDamageResponse = (data) => {
    const { img1, img2, img3, parts_list_damages } = data;
    console.log(img1)
  
    // Prepare messages
    const messages = [];
  
    // Display images
    // messages.push(this.createChatBotMessage("Damage Assessment Results:"));
    messages.push(this.createChatBotMessage("Image 1:", {
      widget: "damageImage",
      payload: {img1},
    }));
  
    // Display parts list damages
    parts_list_damages.forEach((damage, index) => {
      messages.push(this.createChatBotMessage(`Damage ${index + 1}: ${damage}`));
    });
  
    // Add messages to state
    this.addMessageToState(messages);
  };
  
  
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

        localStorage.setItem('policyNumber', policyNumber);
        localStorage.setItem('policyData', JSON.stringify(policyData));

        const uploadImageMessage = this.createChatBotMessage("Please upload an image with the car registration plate:", {
          widget: "imageUpload",
        });

        this.addMessageToState(message);
        this.addMessageToState(uploadImageMessage);
      } else {
        message = this.createChatBotMessage("Policy not found. Please try again.");
        this.addMessageToState(message);
        this.handleOptions();
      }
    } catch (error) {
      message = this.createChatBotMessage(`Error: ${error.message}`);
      this.addMessageToState(message);
    } finally {
      this.setState((prevState) => ({
        ...prevState,
        expectingPolicyNumber: false,
      }));
    }
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: Array.isArray(message) ? [...prevState.messages, ...message] : [...prevState.messages, message],
    }));
  };

  getState = () => {
    return this.state;
  };
}

export default ActionProvider;
