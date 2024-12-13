import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

function isPointInPentagon(x: number, y: number, width: number, height: number): boolean {
  const centerX = width;
  const centerY = height;
  const size = Math.min(width, height) * 0.9;

  const vertices = [
    [centerX, centerY - size],
    [centerX + size * Math.sin(Math.PI / 5), centerY - size * Math.cos(Math.PI / 2)],
    [centerX + size * Math.sin(2 * Math.PI / 5), centerY + size * Math.cos(2 * Math.PI / 5)],
    [centerX - size * Math.sin(2 * Math.PI / 5), centerY + size * Math.cos(2 * Math.PI / 5)],
    [centerX - size * Math.sin(Math.PI / 5), centerY - size * Math.cos(Math.PI / 5)],
  ];

  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i][0], yi = vertices[i][1];
    const xj = vertices[j][0], yj = vertices[j][1];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hue, setHue] = useState(0.5);

  useEffect(() => {
    if (canvasRef.current === null) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, `hsl(${hue * 360}, 100%, 50%)`);
    gradient.addColorStop(1, "black");

    // Draw the pentagon
    const centerX = width / 2;
    const centerY = height/1;
    const size = Math.min(width, height) * 0.5;

    const vertices = [
      [centerX, centerY - size*1.6],
      [centerX + size * Math.sin(Math.PI / 2), centerY - size * Math.cos(Math.PI / 5)],
      [centerX + size * Math.sin(2.5 * Math.PI / 14.5), centerY + size * Math.cos(2 * Math.PI / 6)],
      [centerX - size * Math.sin(2.5 * Math.PI / 14.5), centerY + size * Math.cos(2 * Math.PI / 6)],
      [centerX - size * Math.sin(Math.PI / 2), centerY - size * Math.cos(Math.PI / 5)],
    ];

    ctx.beginPath();
    ctx.moveTo(vertices[0][0], vertices[0][1]);
    for (let i = 1; i < vertices.length; i++) {
      ctx.lineTo(vertices[i][0], vertices[i][1]);
    }
    ctx.closePath();

    // Fill pentagon with gradient
    ctx.fillStyle = gradient;
    ctx.fill();

    // Optional: Add border to the pentagon
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [hue]);

  const updateHue = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setHue(parseFloat(ev.target.value));
    },
    [setHue]
  );

  return (
    <div className="container">
      <div>
        <canvas width={550} height={500} ref={canvasRef} />
      </div>
      <div>
        <input
          type="range"
          step={0.01}
          min={0}
          max={1}
          onChange={updateHue}
          value={hue}
        />
      </div>
    </div>
  );
}

export default App;
