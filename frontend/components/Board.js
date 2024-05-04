import { useCanvasContext } from 'contexts/CanvasContext';
import React, { useEffect, useRef } from 'react'

const Board = () => {

  const boardRef = useRef();
  const draw  = useRef();

  const { stroke, strokeStyle } = useCanvasContext();

  const changeStroke = (lineWidth) => {
    const ctx = boardRef.current?.getContext('2d');
    ctx.lineWidth = lineWidth;
  }

  useEffect(() => {
    changeStroke(stroke)
  }, [stroke])

  const changeStrokeStyle = (color) => {
    const ctx = boardRef.current?.getContext('2d');
    ctx.strokeStyle = color;
  }

  useEffect(() => {
    changeStrokeStyle(strokeStyle)
  }, [strokeStyle])

  useEffect(() => {
    if(!boardRef.current) return;

    const canvas = boardRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, [])

  const beginPath = (x, y) => {
    const ctx = boardRef.current?.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.moveTo(x, y);
  }

  const drawPath = (x, y) => {
    const ctx = boardRef.current?.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  }



  useEffect(() => {
    const canvas = boardRef.current;

    const handleMouseDown = (e) => {
        draw.current = true;
        beginPath(e.offsetX, e.offsetY);
    }

    const handleMouseMove = (e) => {
        if(!draw.current) return;

        drawPath(e.offsetX, e.offsetY);
    };

    const handleMouseUp = (e) => {
        draw.current = false;
    }

    
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseup', handleMouseUp);
    }

  })

  return (
    <canvas id="myCanvas" ref={boardRef} style={{ background: "white"}}>

    </canvas>
  )
}

export default Board