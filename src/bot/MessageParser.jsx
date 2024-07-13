// src/bot/MessageParser.jsx

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    if (this.state.expectingPolicyNumber) {
      this.actionProvider.handlePolicyNumber(message);
    } else {
      const lowerCaseMessage = message.toLowerCase();

      if (lowerCaseMessage.includes("upload image")) {
        this.actionProvider.handleUpload();
      } else if (lowerCaseMessage.includes("open claim")) {
        this.actionProvider.handleOpenClaim();
      }
    }
  }
}

export default MessageParser;
