const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

let cellsHor = window.innerWidth > window.innerHeight ? 3 : 2;
let cellsVer = window.innerWidth < window.innerHeight ? 3 : 2;
const width = window.innerWidth - 5;
const height = window.innerHeight - 5;
let score = 0;
let ball;

document.querySelector(".score span").innerHTML = `${score}`;
document.querySelector(".max-score span").innerHTML = `${
  localStorage.getItem("maxScore") ? localStorage.getItem("maxScore") : score
}`;

const engine = Engine.create();
engine.world.gravity.y = 0;

const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    // width: width,
    width,
    height,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

const initGame = (cellsHor, cellsVer) => {
  const unitLengthX = width / cellsHor;
  const unitLengthY = height / cellsVer;
  //walls

  const walls = [
    Bodies.rectangle(width / 2, 0, width, 12, {
      isStatic: true,
      render: {
        fillStyle: "grey",
      },
    }),
    Bodies.rectangle(width / 2, height, width, 12, {
      isStatic: true,
      render: {
        fillStyle: "grey",
      },
    }),
    Bodies.rectangle(0, height / 2, 12, height, {
      isStatic: true,
      render: {
        fillStyle: "grey",
      },
    }),
    Bodies.rectangle(width, height / 2, 12, height, {
      isStatic: true,
      render: {
        fillStyle: "grey",
      },
    }),
  ];

  World.add(world, walls);

  // maze generation

  const shuffle = (arr) => {
    let counter = arr.length;

    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter--;
      const temp = arr[counter];
      arr[counter] = arr[index];
      arr[index] = temp;
    }
    return arr;
  };
  // const grid = [];
  // for (let i = 0; i < 3; i++) {
  //   grid.push([]);
  //   for (let j = 0; j < 3; j++) {
  //     grid[i].push(false);
  //   }
  // }

  // const grid = Array(3).fill(Array(3).fill(false)); //созадет одну ссылку для всех массивов

  const grid = Array(cellsVer)
    .fill(null)
    .map(() => Array(cellsHor).fill(false)); //создает каждый раз новую ссылку

  const vertical = Array(cellsVer)
    .fill(null)
    .map(() => Array(cellsHor - 1).fill(false));

  const horizontal = Array(cellsVer - 1)
    .fill(null)
    .map(() => Array(cellsHor).fill(false));

  const startRow = Math.floor(Math.random() * cellsVer);
  const startCol = Math.floor(Math.random() * cellsHor);
  console.log(cellsHor, cellsVer);
  const stepThroughCell = (row, col) => {
    // If I have visited the cell at [row, col], then return
    if (grid[row][col]) return;

    // Mark this cell as being visited
    grid[row][col] = true;

    // Assemble randomly-ordered list of neighbours
    const neighbors = shuffle([
      [row - 1, col, "up"],
      [row, col + 1, "right"],
      [row + 1, col, "down"],
      [row, col - 1, "left"],
    ]);

    // For each neighbour...
    for (let neighbor of neighbors) {
      const [nextRow, nextCol, direction] = neighbor;

      // See if that neighbor is out of bounds
      if (
        nextRow < 0 ||
        nextRow >= cellsVer ||
        nextCol < 0 ||
        nextCol >= cellsHor
      )
        continue;

      // If we have visited that neigghbor, continue to next neighbor
      if (grid[nextRow][nextCol]) continue;

      // remove a wall from either horizontal or vertical
      if (direction === "left") {
        vertical[row][col - 1] = true;
      } else if (direction === "right") {
        vertical[row][col] = true;
      } else if (direction === "up") {
        horizontal[row - 1][col] = true;
      } else if (direction === "down") {
        horizontal[row][col] = true;
      }

      stepThroughCell(nextRow, nextCol);
    }

    // Visit that next cell
  };
  stepThroughCell(startRow, startCol);

  horizontal.forEach((row, rowIndex) => {
    row.forEach((open, colIndex) => {
      if (open) return;
      const wall = Bodies.rectangle(
        colIndex * unitLengthX + unitLengthX / 2,
        rowIndex * unitLengthY + unitLengthY,
        unitLengthX,
        6,
        {
          label: "wall",
          isStatic: true,
          render: {
            fillStyle: "grey",
          },
        }
      );
      World.add(world, wall);
    });
  });
  vertical.forEach((row, rowIndex) => {
    row.forEach((open, colIndex) => {
      if (open) return;
      const wall = Bodies.rectangle(
        colIndex * unitLengthX + unitLengthX,
        rowIndex * unitLengthY + unitLengthY / 2,
        6,
        unitLengthY,
        {
          label: "wall",
          isStatic: true,
          render: {
            fillStyle: "grey",
          },
        }
      );
      World.add(world, wall);
    });
  });

  // goal
  const goal = Bodies.rectangle(
    width - unitLengthX / 2,
    height - unitLengthY / 2,
    unitLengthX * 0.6,
    unitLengthY * 0.6,
    {
      isStatic: true,
      render: {
        fillStyle: "red",
      },
      label: "goal",
    }
  );
  World.add(world, goal);

  // ball
  ball = Bodies.circle(
    unitLengthX / 2,
    unitLengthY / 2,
    unitLengthX < unitLengthY ? unitLengthX * 0.3 : unitLengthY * 0.3,
    {
      label: "ball",
    }
  );
  World.add(world, ball);

  document.addEventListener("keydown", (event) => {
    const { x, y } = ball.velocity;
    const maxSpped = 4;

    switch (event.key) {
      case "ArrowUp":
        console.log("arrow");
        console.log(y);
        Body.setVelocity(ball, { x, y: -maxSpped });
        break;
      case "ArrowRight":
        Body.setVelocity(ball, { x: maxSpped, y });
        console.log(x);
        break;
      case "ArrowDown":
        Body.setVelocity(ball, { x, y: maxSpped });
        console.log(y);
        break;
      case "ArrowLeft":
        Body.setVelocity(ball, { x: -maxSpped, y });
        console.log(x);
        break;
      default:
    }
  });
  console.log(horizontal, vertical);
};
// win condition
Events.on(engine, "collisionStart", (event) => {
  event.pairs.forEach((collision) => {
    const labels = ["ball", "goal"];
    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      document.querySelector(".winner").classList.remove("hidden");
      World.remove(world, ball);
      score++;
      cellsHor++;
      cellsVer++;
      document.querySelector(".score span").innerHTML = `${score}`;
      if (localStorage.getItem("maxScore") < score) {
        localStorage.setItem("maxScore", score);
        document.querySelector(
          ".max-score span"
        ).innerHTML = `${localStorage.getItem("maxScore")}`;
        console.log(localStorage.getItem("maxScore"));
      }

      setTimeout(() => {
        World.clear(world);
        Engine.clear(engine);
        document.querySelector(".winner").classList.add("hidden");
        initGame(cellsHor, cellsVer);
      }, 2000);
    }
  });
});

initGame(cellsHor, cellsVer);
