import { useRef, useEffect, useState } from 'react';

export function Canvas({game, updateGame}) {

  const offsetLeft = useRef(null);
  const offsetTop = useRef(null);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  let drawing = [];

  useEffect(() => {
    const canvas = canvasRef.current;

    offsetLeft.current = canvasRef.current.offsetLeft;
    offsetTop.current = canvasRef.current.offsetTop;

    const context = canvas.getContext('2d');
    context.scale(1, 1);
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = '3';
    contextRef.current = context;
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
    if (drawing === [] || !drawing) return;
    updateDrawing()
  };

  const draw = (ev) => {
    if (!isDrawing) return;
    const pos = getPos(ev);
    contextRef.current.lineTo(pos.x, pos.y);
    contextRef.current.stroke();
    drawing.push(pos);
  };

  const updateDrawing = async () => {
    game.drawing = drawing
    updateGame(game)
  }

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
