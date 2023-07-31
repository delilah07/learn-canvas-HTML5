const canvas = document.querySelector('#canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

// c.fillRect(x,y,width, height)
c.fillRect(100, 100, 100, 100);
c.fillRect(300, 230, 100, 110);
c.fillRect(200, 500, 150, 100);
