import { useRef, useEffect, useState } from 'react';

export function ShowDrawing({ drawing }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [delayTime, setDelayTime] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.scale(1, 1);
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = '3';
    contextRef.current = context;
  }, []);

  useEffect(() => {
    if (!drawing || !drawing.length) return;
    let delay = 0;
    if (delayTime.time + delayTime.delay > Date.now()) {
      delay = delayTime.time + delayTime.delay - Date.now();
    }
    setTimeout(() => {
      drawTheChange(drawing);
    }, delay);
    setDelayTime({ time: Date.now(), delay: drawing.length * 20 + delay });
  }, [drawing]);

  const drawTheChange = (currDraw) => {
    contextRef.current.moveTo(currDraw[0].x, currDraw[0].y);
    drawing.map((pos, idx) => {
      setTimeout(() => {
        contextRef.current.lineTo(pos.x, pos.y);
        contextRef.current.stroke();
      }, idx * 15);
    });
  };

  return <canvas ref={canvasRef} width="250px" height="250px" />;
}
