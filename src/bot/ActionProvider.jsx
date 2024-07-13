// ActionProvider.jsx

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
}

export default ActionProvider;
