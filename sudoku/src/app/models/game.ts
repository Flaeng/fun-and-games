import { Cell } from './cell';

export class Game {
  public grid: string[][] = [
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    /*[0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],*/
  ];

  public bruteForce(): void {
    const cellGrid: Cell[][] = this.grid.map((row) => {
      return row.map((c) => {
        const cell = new Cell();
        const number = c.trim().length === 0 ? 0 : c;
        cell.value = Number(number);
        return cell;
      });
    });

    console.log('cellGrid[0]', cellGrid[0].map((x) => x.value).join(', '));
    let attempt: number = 0;
    do {
      attempt++;
      this.bruteForceIterate(cellGrid);
      if (attempt === 100000) break;
    } while (
      cellGrid.filter(
        (row) => row.filter((cell) => cell.value === 0).length !== 0
      ).length !== 0
    );
  }

  private bruteForceIterate(grid: Cell[][]): void {
    const getColumn = (index: number): Cell[] => {
      return grid.map((x) => x[index]);
    };
    const getCluster = (y: number, x: number): Cell[] => {
      const rowStart = Math.floor(y / 3) * 3;
      const rowEnd = rowStart + 3;
      const colStart = Math.floor(x / 3) * 3;
      const colEnd = colStart + 3;

      const result: Cell[] = [];
      for (let yIndex = rowStart; yIndex < rowEnd; yIndex++) {
        for (let xIndex = colStart; xIndex < colEnd; xIndex++) {
          result.push(grid[yIndex][xIndex]);
        }
      }
      return result;
    };

    for (let y = 0; y < grid.length; y++) {
      const row = grid[y];
      for (let x = 0; x < row.length; x++) {
        const cell = row[x];
        if (cell.value !== 0) {
          continue;
        }

        let options = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const rowValues = row.filter((x) => x.value !== 0);
        const columnValues = getColumn(x).filter((x) => x.value !== 0);
        const clusterValues = getCluster(y, x).filter((x) => x.value !== 0);

        [...rowValues, ...columnValues, ...clusterValues].forEach((x) => {
          const valueIndex = options.findIndex((z) => x.value === z);
          if (valueIndex !== -1) {
            options.splice(valueIndex, 1);
          }
        });

        cell.options = options;
        if (cell.options.length === 1) {
          this.grid[y][x] = (grid[y][x].value = cell.options[0]).toString();
        }
      }
    }
  }
}
