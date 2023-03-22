import { useState } from "react";
import { useGlobalContext } from "../context";

const PositionSelector = ({ image }) => {
  const { baseAPIUrl } = useGlobalContext();
  const imageData = `data:${image.mimeType};charset=utf-8;${image.encoding},${image.imageData}`;

  // Stateful variables
  const [isStartPosition, setIsStartPosition] = useState(true); // will alternate between start and end positions
  const [positions, setPositions] = useState({
    xStart: null,
    zStart: null,
    xEnd: null,
    zEnd: null,
  });

  // Gets the positions of a user click from an event
  const getPositions = (event) => {
    const target = event.target;
    const dimension = target.getBoundingClientRect();
    let x = (event.clientX - dimension.left) / dimension.width;
    let y = (event.clientY - dimension.top) / dimension.height;
    if (isStartPosition) {
      setPositions({ ...positions, xStart: x, zStart: y });
      setIsStartPosition(false);
    } else {
      setPositions({ ...positions, xEnd: x, zEnd: y });
      setIsStartPosition(true);
    }
    console.log(x, y);
  };

  return (
    <>
      <img src={imageData} onClick={getPositions} />
    </>
  );
};
export default PositionSelector;
