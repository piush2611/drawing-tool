import React, { useEffect, useRef, useCallback } from "react";

import { useCanvasContext } from "contexts/CanvasContext";
import { ACTION_TYPES } from "constants/general";

const Board = () => {
  const { stroke, strokeStyle, actionType } = useCanvasContext();

  const boardRef = useRef();
  const historyManager = useRef([]);
  const historyPointer = useRef(0);
  const draw = useRef();

  useEffect(() => {
    const ctx = boardRef.current?.getContext("2d");
    ctx.lineWidth = stroke;
  }, [stroke]);

  useEffect(() => {
    const changeStrokeStyle = (color) => {
      const ctx = boardRef.current?.getContext("2d");
      ctx.strokeStyle = color;
    };

    changeStrokeStyle(strokeStyle);
  }, [strokeStyle]);

  useEffect(() => {
    if (!boardRef.current) return;

    const canvas = boardRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    if (!boardRef.current || !actionType.type) return;

    if (actionType.type === ACTION_TYPES.RESET) {
      const canvas = boardRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    if (actionType.type === ACTION_TYPES.DOWNLOAD) {
      const img = boardRef.current.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = img;
      a.download = "drawing.png";
      a.click();
      return;
    }

    if (historyPointer.current > 0 && actionType.type === ACTION_TYPES.UNDO)
      historyPointer.current -= 1;
    if (
      historyPointer.current < historyManager.current.length - 1 &&
      actionType.type === ACTION_TYPES.REDO
    )
      historyPointer.current += 1;
    const ctx = boardRef.current?.getContext("2d");
    ctx.putImageData(historyManager.current[historyPointer.current], 0, 0);
  }, [actionType]);

  const beginPath = useCallback((x, y) => {
    const ctx = boardRef.current?.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, []);

  const drawPath = useCallback((x, y) => {
    const ctx = boardRef.current?.getContext("2d");
    ctx.lineTo(x, y);
    ctx.stroke();
  }, []);

  const handleErase = useCallback((x, y) => {
    const ctx = boardRef.current?.getContext("2d");
    ctx.clearRect(x, y, 20, 20);
  });

  const isErasing = actionType.type === ACTION_TYPES.ERASE;

  useEffect(() => {
    const canvas = boardRef.current;
    const ctx = canvas.getContext("2d");

    const handleMouseDown = (e) => {
      draw.current = true;
      if (!isErasing) beginPath(e.offsetX, e.offsetY);
    };

    const handleMouseMove = (e) => {
      if (!draw.current) return;
      if (!isErasing) drawPath(e.offsetX, e.offsetY);
      if (isErasing) handleErase(e.offsetX, e.offsetY);
    };

    const handleMouseUp = (e) => {
      // can be optimised intstead of storing complete canvas
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      historyManager.current.push(imgData);
      historyPointer.current = historyManager.current.length - 1;
      draw.current = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isErasing]);

  return (
    <canvas
      id="myCanvas"
      ref={boardRef}
      style={{ background: "white" }}
    ></canvas>
  );
};

export default Board;
