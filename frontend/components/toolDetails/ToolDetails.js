import React from "react";

import { STROKES, COLORS, ACTIONS } from "constants/general";
import { useCanvasContext } from "contexts/CanvasContext";

import styles from "./toolDetails.module.css";

const ToolDetails = () => {
  const { setStroke, setStrokeStyle, strokeStyle, handleSetActionType } =
    useCanvasContext();

  return (
    <div className={styles.toolDetailsContainer}>
      <div className={styles.container}>
        <div className={styles.label}>Stroke Width</div>
        <div className={styles.strokeWidthContainer}>
          {STROKES.map((stroke) => {
            return (
              <button
                className={styles.btn}
                onClick={() => setStroke(stroke)}
                key={stroke}
              >
                {stroke}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.label}>Stroke</div>
        <div className={styles.strokeContainer}>
          {COLORS.map((color) => {
            return (
              <button
                onClick={() => setStrokeStyle(color)}
                className={styles.strokeColor}
                key={color}
                style={{
                  ...(color === strokeStyle && { border: "1px solid black" }),
                }}
              >
                <div style={{ background: color }}></div>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.toolActions}>
        {ACTIONS.map((action) => (
          <button
            key={action.actionType}
            className={styles.btn}
            onClick={() => handleSetActionType(action.actionType)}
          >
            {action.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToolDetails;
