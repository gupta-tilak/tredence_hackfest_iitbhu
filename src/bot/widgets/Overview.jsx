import Options from "./Options";

const GeneralOptions = (props) => {
  const options = [
    {
      name: "Open Claim",
      handler: props.actionProvider.handleOpenClaim,
      id: 1
    },
    {
      name: "Contact Customer Support",
      handler: props.actionProvider.handleUpload,
      id: 2
    },
    {
      name: "Emergency contact",
      handler: props.actionProvider.handleUpload,
      id: 3
    },
  ];
  return <Options options={options} title="" {...props} />;
};

export default GeneralOptions;