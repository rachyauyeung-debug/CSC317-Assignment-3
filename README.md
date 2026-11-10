# CSC317 Assignment 3 — Rhythm Rush

## Game Description

Rhythm Rush is a rhythm game that I created for my CSC317 Assignment 3. The game is based on the idea of Dance Dance Revolution (DDR), where players need to press the correct arrow keys as the arrows move down the screen.

I wanted to make a game that was simple to understand but also became more challenging as the player progressed through the rounds. The game has seven rounds, and each round gets faster rather than longer.

The game was created using HTML Canvas, CSS, and JavaScript, with Node.js and Express used to run the game on a local server.

## How to Play

1. Start the game by clicking the Start Game button.
2. Watch the arrows move down the screen.
3. Press the matching arrow key when the arrow reaches the target area.
4. Earn points by pressing the correct arrow keys at the right time.
5. Complete the round to unlock the next round.
6. Each round increases the speed of the arrows.
7. If you miss five arrows or receive three BAD ratings during a round, you fail that round and must restart it.
8. Press Escape to pause or resume the game.

## Game Features

- Seven rounds with increasing difficulty.
- Four directional arrow controls.
- A scoring and combo system.
- Timing feedback for player accuracy.
- A miss counter and BAD rating system.
- Restart Round functionality.
- Pause and resume using the Escape key.
- Round progression after successfully completing a round.

## Controls

| Key | Action |
|---|---|
| Left Arrow / A | Left |
| Down Arrow / S | Down |
| Up Arrow / W | Up |
| Right Arrow / D | Right |
| Escape | Pause / Resume |

## Requirements

To run the game, you will need:

- Node.js and npm installed.
- A web browser such as Google Chrome, Microsoft Edge, or Firefox.
- An internet connection to download the repository and install dependencies.

## How to Run the Game

### Windows

1. Download or clone the GitHub repository.
2. Open the project folder in Visual Studio Code.
3. Open the terminal.
4. Run the following commands:

```bash
npm install
npm start
```

5. Open your browser and go to:

`http://localhost:3000`

### Linux / Ubuntu / Oracle VirtualBox

1. Make sure Node.js and npm are installed inside the Linux environment.
2. Open a terminal.
3. Clone the repository:

```bash
git clone https://github.com/rachyauyeung-debug/CSC317-Assignment-3.git
```

4. Enter the project folder:

```bash
cd CSC317-Assignment-3
```

5. Install dependencies and start the server:

```bash
npm install
npm start
```

6. Open `http://localhost:3000` in a browser running inside the same environment.

If using Oracle VirtualBox and opening the game from the host computer, port 3000 may need to be forwarded from the virtual machine.

## Project Files

```text
CSC317-Assignment-3/
├── public/
│   ├── game.js
│   ├── index.html
│   └── style.css
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Development and Testing

While working on this assignment, I tested the game to make sure the arrows moved correctly, the scoring system updated, and the restart feature worked when the player failed a round. I also tested the pause feature and the progression from Round 1 to Round 2.

I used ChatGPT as a reference when I needed help understanding certain parts of the code and troubleshooting errors in Visual Studio Code.

## GitHub Repository

https://github.com/rachyauyeung-debug/CSC317-Assignment-3