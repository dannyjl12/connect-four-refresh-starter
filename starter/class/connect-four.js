const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";
    Screen.setMessage("Player O turn")

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', ConnectFour.testCommand);
    Screen.addCommand('a', 'Move cursor left)', this.cursor.left);
    Screen.addCommand('d', 'Move cursor right', this.cursor.right);
    Screen.addCommand('s', 'Move cursor down', this.cursor.down);
    Screen.addCommand('w', 'Move cursor up', this.cursor.up);
    Screen.addCommand('x', 'Places an X', this.placeX);
    Screen.addCommand('o', 'Places an O', this.placeO);

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  placeX = () => {
    if (this.playerTurn === 'X') {
      let row = this.cursor.row;
      let col = this.cursor.col;
      if (this.grid[row][col] === ' ') {
        this.grid[row][col] = 'X';
        Screen.setGrid(row, col, 'X');
        const winCheck = ConnectFour.checkWin(this.grid);
        if (winCheck) {
          ConnectFour.endGame(winCheck);
        } else {
          Screen.setMessage("Player O turn")
          Screen.render();
          this.playerTurn = 'O'
        }
      } else {
        this.playerTurn = 'X'
      }
    }
  }

  placeO = () => {
    if (this.playerTurn === 'O') {
      let row = this.cursor.row;
      let col = this.cursor.col;
      if (this.grid[row][col] === ' ') {
        this.grid[row][col] = 'O';
        Screen.setGrid(row, col, 'O');
        const winCheck = ConnectFour.checkWin(this.grid);
        if (winCheck) {
          ConnectFour.endGame(winCheck);
        } else {
          Screen.setMessage("Player X turn")
          Screen.render();
          this.playerTurn = 'X'
        }
      } else {
        this.playerTurn = 'O';
      }
    }
  }


  static checkWin(grid) {

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length - 3; c++) {
        if (grid[r][c] === grid[r][c+1] && grid[r][c+1] === grid[r][c+2] && grid[r][c+2] === grid[r][c+3] && grid[r][c] !== ' ') {
          return grid[r][c];
        }
      }
    }

    for (let r = 0; r < grid.length - 3; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (grid[r][c] !== ' ' && grid[r][c] === grid[r+1][c] && grid[r+1][c] === grid[r+2][c] && grid[r+2][c] === grid[r+3][c]) {
          return grid[r][c];
        }
      }
    }

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if ( r + 3 < grid.length &&
          c + 3 < grid[0].length &&
          grid[r][c] === grid[r+1][c+1] &&
          grid[r+1][c+1] === grid[r+2][c+2] &&
          grid[r+2][c+2] === grid[r+3][c+3] &&
          grid[r][c] !== ' ') {
            return grid[r][c];
        }

        if (r - 3 >= 0 &&
          c + 3 < grid[0].length &&
          grid[r][c] === grid[r-1][c+1] &&
          grid[r-1][c+1] === grid[r-2][c+2] &&
          grid[r-2][c+2] === grid[r-3][c+3] &&
          grid[r][c] !== ' ') {
            return grid[r][c]
          }
        }
      }

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (grid[r][c] === ' ') {
          return false;
        }
      }
    }

    return 'T';

  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
