import React, { useRef, useEffect } from 'react'

interface PowerFactorTriangleProps {
  P: number
  Q: number
  S: number
  label: string
}

const PowerFactorTriangle: React.FC<PowerFactorTriangleProps> = ({
  P,
  Q,
  S,
  label,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set up the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Define triangle coordinates
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const baseX = centerX + (S / 2) * Math.cos(Math.atan2(Q, P))
    const baseY = centerY - (S / 2) * Math.sin(Math.atan2(Q, P))
    const qPolarity = Q > 0 ? 1 : -1
    // Draw the triangle
    ctx.beginPath()
    // Draw P line
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + P, centerY)
    drawArrow(ctx, centerX, centerY, centerX + P, centerY, 'red')
    // Draw Q line
    ctx.moveTo(centerX + P, centerY)
    ctx.lineTo(centerX + P, centerY - Q)
    drawArrow(ctx, centerX + P, centerY, centerX + P, centerY - Q, 'blue')
    // Draw S line
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + P, centerY - Q)
    drawArrow(ctx, centerX, centerY, centerX + P, centerY - Q, 'green')
    ctx.stroke()

    // Label vertices
    ctx.font = '14px Arial'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`P${label}`, centerX + P / 2, centerY + qPolarity * 10)
    ctx.fillText(`Q${label}`, centerX + P + 20, centerY - Q / 2)
    ctx.fillText(`S${label}`, centerX + P / 2, centerY - Q / 2 - 10)
  }, [P, Q, S])

  const drawArrow = (
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    color: string
  ) => {
    const headLength = 10
    const angle = Math.atan2(toY - fromY, toX - fromX)

    ctx.strokeStyle = color
    ctx.lineWidth = 2

    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(fromX, fromY)
    ctx.lineTo(toX, toY)
    ctx.stroke()

    ctx.lineCap = 'butt'
    ctx.beginPath()
    ctx.moveTo(toX, toY)
    ctx.lineTo(
      toX - headLength * Math.cos(angle - Math.PI / 6),
      toY - headLength * Math.sin(angle - Math.PI / 6)
    )
    ctx.lineTo(
      toX - headLength * Math.cos(angle + Math.PI / 6),
      toY - headLength * Math.sin(angle + Math.PI / 6)
    )
    ctx.lineTo(toX, toY)
    ctx.fillStyle = color
    ctx.fill()
  }

  return (
    <canvas
      style={{
        margin: '0px',
        padding: '0',
        border: '1px solid black',
      }}
      ref={canvasRef}
      width={500}
      height={300}
    />
  )
}

export default PowerFactorTriangle
