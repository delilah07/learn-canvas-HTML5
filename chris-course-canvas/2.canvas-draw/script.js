const canvas = document.querySelector('#canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas);

const ctx = canvas.getContext('2d');

// draw rectangles
// ctx.fillRect(x,y,width, height)
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
ctx.fillRect(100, 100, 100, 100);
ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
ctx.fillRect(300, 230, 100, 110);
ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
ctx.fillRect(500, 50, 150, 100);

// draw lines
// ctx.beginPath(); ctx.movaTo(x,y);ctx.lineTo(x,y);ctx.stroke()
ctx.beginPath();
ctx.moveTo(300, 100);
ctx.lineTo(400, 300);
ctx.lineTo(50, 300);
ctx.strokeStyle = '#fa34a3';
ctx.stroke();

// draw circle
// ctx.src(x,y,r,startAngle,endAngle,drawCounterClockwise)
ctx.beginPath();
ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
ctx.strokeStyle = 'blue';
ctx.stroke();

for (let i = 0; i < 3; i++) {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, Math.PI * 2, false);
  ctx.strokeStyle = 'red';
  ctx.stroke();
}
