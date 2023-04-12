import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

/**
 * If clickable, runs saveButtonFunction when clicked. Button that is disabled until isValid is true, then it is enabled. isLoading is set to true when the button is clicked.
 * @param {*} saveButtonFunction - function that is called when the button is clicked
 * @param {*} isValidWorkInstruction - boolean true to set button to enabled, false to set button to disabled
 * @returns
 */
const LoadingButton = ({ saveButtonFunction, isValid }) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    saveButtonFunction(isLoading, setLoading);
  }, [isLoading, saveButtonFunction]);
  const handleClick = () => setLoading(true);

  return (
    <Button
      type="submit"
      variant="primary"
      disabled={!isValid}
      className="save-button"
      onClick={!isLoading ? handleClick : null}
    >
      Save
    </Button>
  );
};

export default LoadingButton;
