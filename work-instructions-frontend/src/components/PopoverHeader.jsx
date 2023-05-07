import CloseButton from "react-bootstrap/CloseButton";

const PopoverHeader = ({ title, onClose }) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h3>{title}</h3>
      <CloseButton onClick={onClose} />
    </div>
  );
};

export default PopoverHeader;
