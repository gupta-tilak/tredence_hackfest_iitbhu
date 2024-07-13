class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("upload")) {
      this.actionProvider.handleUpload();
    }
  }
}

export default MessageParser;