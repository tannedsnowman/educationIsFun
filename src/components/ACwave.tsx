import React, { useRef, useEffect } from 'react';

interface ACWaveDiagramProps {
  VoltageAmplitude: number;
  CurrentAmplitude: number;
  phaseDifference: number;
  showPower?: boolean;
}

const ACWaveDiagram: React.FC<ACWaveDiagramProps> = ({
  VoltageAmplitude,
  CurrentAmplitude,
  phaseDifference,
  showPower,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the zero line
    drawZeroLine(ctx);

    // Draw the Voltage waveform (in blue)
    drawWaveform(ctx, VoltageAmplitude, 'blue');

    // Draw the Current waveform (in red)
    drawWaveform(ctx, CurrentAmplitude, 'red', phaseDifference);

    if (showPower) {
      // Draw the Power waveform (in green)
      drawPowerWaveform(ctx, VoltageAmplitude, CurrentAmplitude, 'green', phaseDifference);
    }
  }, [VoltageAmplitude, CurrentAmplitude, phaseDifference, showPower]);

  const drawZeroLine = (ctx: CanvasRenderingContext2D) => {
    const canvasHeight = ctx.canvas.height;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'gray';
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(ctx.canvas.width, canvasHeight / 2);
    ctx.stroke();
  };

  const drawWaveform = (
    ctx: CanvasRenderingContext2D,
    amplitude: number,
    color: string,
    phaseDifference = 0
  ) => {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2);

    for (let t = 0; t <= canvasWidth; t += 1) {
      const y = amplitude * Math.sin(2 * Math.PI * 0.002 * t + phaseDifference) + canvasHeight / 2;
      ctx.lineTo(t, y);
    }
    ctx.stroke();

    // Fill the area under the waveform
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.lineTo(0, canvasHeight / 2);
    ctx.closePath();
    ctx.fillStyle = `${color}66`; // Add transparency to the color
    //ctx.fill();
  };
// Helper function to convert color name or hex to RGBA
const colorToRgba = (color: string, alpha: number) => {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  if (!ctx) return `rgba(0,0,0,${alpha})`; // default to black if context is not available
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  let data = ctx.getImageData(0, 0, 1, 1).data;
  return `rgba(${data[0]},${data[1]},${data[2]},${alpha})`;
};
  const drawPowerWaveform = (
    ctx: CanvasRenderingContext2D,
    voltageAmplitude: number,
    currentAmplitude: number,
    color: string,
    phaseDifference: number
  ) => {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2);

    for (let t = 0; t <= canvasWidth; t += 1) {
      const voltage = voltageAmplitude * Math.sin(2 * Math.PI * 0.002 * t);
      const current =
        currentAmplitude * Math.sin(2 * Math.PI * 0.002 * t + phaseDifference);
      const power = (voltage * current) / 20 + canvasHeight / 2;
      ctx.lineTo(t, power);
    }
    ctx.stroke();

    // Fill the area under the power waveform
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.lineTo(0, canvasHeight / 2);
    ctx.closePath();
    ctx.fillStyle = `${color}`; // Add transparency to the color
    ctx.fillStyle = colorToRgba(color, 0.3); // 0.3 is the alpha value for transparency
    ctx.fill();
  };

  return (
    <canvas
      style={{
        margin: '0px',
        padding: '0',
        border: '1px solid black',
      }}
      ref={canvasRef}
      width={1200}
      height={800}
    />
  );
};

export default ACWaveDiagram;
