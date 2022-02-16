import { Game } from './game';

const logGrid = (title: string, grid: string[][]) => {
  console.log('-----------------------------');
  console.log(title);
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    console.log(row.map((cell) => cell.length === 0 ? ' ' : cell.toString()).join(', '));
  }
  console.log('-----------------------------');
};

describe('Game', () => {
  it('should create an instance', () => {
    expect(new Game()).toBeTruthy();
  });

  it('can solve sudoku of 1 row', () => {
    const game = new Game();
    game.grid = [
      ['8', '', '7', '1', '5', '4', '3', '9', '6'],
      ['9', '6', '5', '3', '2', '7', '1', '', '8'],
      ['3', '4', '1', '6', '8', '9', '7', '5', '2'],
    ];

    logGrid('1 row start', game.grid);
    game.bruteForce();
    logGrid('1 row result', game.grid);

    const result = game.grid;
    expect(result).toEqual([
      ['8', '2', '7', '1', '5', '4', '3', '9', '6'],
      ['9', '6', '5', '3', '2', '7', '1', '4', '8'],
      ['3', '4', '1', '6', '8', '9', '7', '5', '2'],
    ]);
  });

  it('can solve sudoku of 1 column', () => {
    const game = new Game();
    game.grid = [
      ['8', '2', '7'],
      ['9', '', '5'],
      ['3', '4', '1'],
      ['5', '9', '3'],
      ['4', '7', '2'],
      ['6', '1', '8'],
      ['7', '8', '6'],
      ['', '5', '4'],
      ['2', '3', '9'],
    ];

    logGrid('1 column start', game.grid);
    game.bruteForce();
    logGrid('1 column result', game.grid);

    const result = game.grid;
    expect(result).toEqual([
      ['8', '2', '7'],
      ['9', '6', '5'],
      ['3', '4', '1'],
      ['5', '9', '3'],
      ['4', '7', '2'],
      ['6', '1', '8'],
      ['7', '8', '6'],
      ['1', '5', '4'],
      ['2', '3', '9'],
    ]);
  });

  it('can solve sudoku of 1 cluster', () => {
    const game = new Game();
    game.grid = [
      ['9', '1', '4'],
      ['8', '2', '3'],
      ['', '6', '7'],
    ];

    logGrid('1 cluster start', game.grid);
    game.bruteForce();
    logGrid('1 cluster result', game.grid);

    const result = game.grid;
    expect(result).toEqual([
      ['9', '1', '4'],
      ['8', '2', '3'],
      ['5', '6', '7'],
    ]);
  });

  it('should be able to brute force simple sudoku', () => {
    const game = new Game();
    game.grid = [
      //////Column with more than one missing
      ['8', '2', '7', '1', '5', '4', '3', '9', '6'],
      ['9', '', '5', '3', '2', '7', '1', '4', '8'],
      ['3', '4', '1', '6', '8', '9', '7', '5', '2'],
      ['5', '9', '3', '4', '6', '8', '2', '7', '1'],
      ['4', '7', '2', '', '', '3', '6', '8', '9'], //Row with more than one missing
      ['6', '', '8', '9', '7', '2', '4', '3', '5'],
      ['7', '8', '6', '2', '3', '5', '9', '1', ''],
      ['1', '5', '4', '7', '9', '6', '8', '2', '3'], //Cluster with more than one missing
      ['2', '3', '9', '8', '4', '1', '', '6', '7'],
    ];

    logGrid('simple sudoku start', game.grid);
    game.bruteForce();
    logGrid('simple sudoku result', game.grid);

    const result = game.grid;
    expect(result).toEqual([
      ['8', '2', '7', '1', '5', '4', '3', '9', '6'],
      ['9', '6', '5', '3', '2', '7', '1', '4', '8'],
      ['3', '4', '1', '6', '8', '9', '7', '5', '2'],
      ['5', '9', '3', '4', '6', '8', '2', '7', '1'],
      ['4', '7', '2', '5', '1', '3', '6', '8', '9'],
      ['6', '1', '8', '9', '7', '2', '4', '3', '5'],
      ['7', '8', '6', '2', '3', '5', '9', '1', '4'],
      ['1', '5', '4', '7', '9', '6', '8', '2', '3'],
      ['2', '3', '9', '8', '4', '1', '5', '6', '7'],
    ]);
  });
});
