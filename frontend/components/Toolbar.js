import React from "react";

import { COLORS, STROKES } from "constants/general";
import { useCanvasContext } from "contexts/CanvasContext";

const Toolbar = () => {
  const { setStroke, setStrokeStyle } = useCanvasContext();

  return (
    <div>
      {STROKES.map((stroke) => {
        return <button onClick={() => setStroke(stroke)}>{stroke}</button>;
      })}

      {COLORS.map((color) => {
        return (
          <button
            onClick={() => setStrokeStyle(color)}
            style={{ width: "20px", height: "20px", background: color }}
          >
          </button>
        );
      })}
    </div>
  );
};

export default Toolbar;
