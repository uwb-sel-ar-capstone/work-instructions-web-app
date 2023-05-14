import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

const RectImage = ({
  src,
  alt,
  xStart,
  yStart,
  xEnd,
  yEnd,
  xDimension,
  yDimension,
  getPositions,
  isStartPosition,
}) => {
  const [rectPos, setRectPos] = useState({ x: null, y: null });

  useEffect(() => {
    if (xStart && yStart && xEnd && yEnd) {
      setRectPos({ x: xStart * xDimension, y: yStart * yDimension });
    }
  }, [xStart, yStart, xEnd, yEnd, xDimension, yDimension]);

  return (
    <div style={{ position: "relative" }}>
      <Card.Img variant="top" src={src} alt={alt} onClick={getPositions} />
      {rectPos.x !== null && isStartPosition === true && (
        <div
          style={{
            backgroundColor: "green",
            width: `${Math.abs(xEnd - xStart) * xDimension}px`,
            height: `${Math.abs(yEnd - yStart) * yDimension}px`,
            position: "absolute",
            left: `${Math.min(xStart, xEnd) * xDimension}px`,
            top: `${Math.min(yStart, yEnd) * yDimension}px`,
            opacity: "0.35",
          }}
        />
      )}
      {/* {xStart && yStart && xEnd && yEnd && rectPos.x !== null && (
        <div
          style={{
            backgroundColor: "green",
            width: "20px",
            height: "20px",
            borderRadius: "10px",
            position: "absolute",
            left: `${rectPos.x - 10}px`,
            top: `${rectPos.y - 10}px`,
          }}
        />
      )} */}
    </div>
  );
};

export default RectImage;
