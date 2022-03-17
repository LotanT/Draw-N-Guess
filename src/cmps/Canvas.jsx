import { useRef, useEffect, useState } from 'react';
import { canvasService } from '../services/canvas.service';

export function Canvas() {

  const offsetLeft = useRef(null)
  const offsetTop = useRef(null)

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);


  useEffect(() => {
    const canvas = canvasRef.current;
 
    offsetLeft.current = canvasRef.current.offsetLeft
    offsetTop.current = canvasRef.current.offsetTop

    const context = canvas.getContext('2d');
    context.scale(1, 1);
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = '3';
    contextRef.current = context;
    return () => {
      canvasService.reset();
    };
  }, []);

  const startDrawing = (ev) => {
    const pos = getPos(ev);
    contextRef.current.beginPath();
    contextRef.current.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (ev) => {
    if (!isDrawing) return;
    const pos = getPos(ev);
    contextRef.current.lineTo(pos.x, pos.y);
    contextRef.current.stroke();
    canvasService.save(canvasRef.current.toDataURL());
  };

  const getPos = (ev) => {
    let offsetX;
    let offsetY;
    if (ev.touches) {
      const { pageX, pageY } = ev.touches[0];
      offsetX = pageX - offsetLeft.current;
      offsetY = pageY - offsetTop.current;
    } else {
      offsetX = ev.nativeEvent.offsetX;
      offsetY = ev.nativeEvent.offsetY;
    }
    return { x: offsetX, y: offsetY };
  };

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      onTouchStart={startDrawing}
      onTouchEnd={finishDrawing}
      onTouchMove={draw}
      ref={canvasRef}
      width="250px"
      height="250px"
    />
  );
}
