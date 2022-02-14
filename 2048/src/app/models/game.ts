export interface GameOverCallback {
  (game: Game): void;
}
export class Game {
  public rows: number[][] = [];
  private score: number = 0;
  private isGameOver: boolean = false;

  private gameOverEventListeners: GameOverCallback[] = [];

  public getScore(): number {
    return this.score;
  }

  constructor(rows: number, columns: number) {
    this.rows = [];
    for (let index = 0; index < rows; index++) {
      const arr = [];
      for (let x = 0; x < columns; x++) {
        arr.push(0);
      }
      this.rows.push(arr);
    }

    this.addANumber();
    this.addANumber();
  }

  private addANumber(): boolean {
    let options = [];
    for (let y = 0; y < this.rows.length; y++) {
      const row = this.rows[y];
      for (let x = 0; x < row.length; x++) {
        const cell = row[x];
        if (cell === 0) {
          options.push({ x, y });
        }
      }
    }
    if (options.length === 0) {
      return false;
    }

    const index = Math.floor(Math.random() * options.length + 1) - 1;
    const opt = options[index];
    this.rows[opt.y][opt.x] = 2;
    return true;
  }

  public endGame(): void {
    this.isGameOver = true;
    for (let index = 0; index < this.gameOverEventListeners.length; index++) {
      const element = this.gameOverEventListeners[index];
      try {
        element(this);
      } catch (e) {
        console.warn(e);
      }
    }
  }

  public addGameEndedEventListener(callback: GameOverCallback) {
    this.gameOverEventListeners.push(callback);
  }

  public removeGameEndedEventListener(callback: GameOverCallback) {
    this.gameOverEventListeners = this.gameOverEventListeners.filter(
      (x) => x !== callback
    );
  }

  public moveRight(): boolean {
    if (this.isGameOver) return true;
    if (this.move(0, -1) && !this.addANumber()) {
      this.endGame();
      return true;
    }
    return false;
  }
  public moveLeft(): boolean {
    if (this.isGameOver) return true;
    if (this.move(0, 1) && !this.addANumber()) {
      this.endGame();
      return true;
    }
    return false;
  }
  public moveUp(): boolean {
    if (this.isGameOver) return true;
    if (this.move(1, 0) && !this.addANumber()) {
      this.endGame();
      return true;
    }
    return false;
  }
  public moveDown(): boolean {
    if (this.isGameOver) return true;
    if (this.move(-1, 0) && !this.addANumber()) {
      this.endGame();
      return true;
    }
    return false;
  }

  public move(yMovement: number, xMovement: number): boolean {
    if (
      (xMovement == 0 && yMovement != -1 && yMovement != 1) ||
      (yMovement == 0 && xMovement != -1 && xMovement != 1)
    ) {
      throw `Invalid movement (${yMovement},${xMovement})`;
    }

    const getColumn = (index: number): number[] => {
      return this.rows.map((x) => x[index]);
    };

    const setColumn = (index: number, array: number[]): void => {
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        this.rows[i][index] = element || 0;
      }
    };

    const end = yMovement === 0 ? this.rows.length : this.rows[0].length;

    let didCombineAny = false;
    let didMoveAny = false;

    for (let index = 0; index < end; index++) {
      let array = yMovement === 0 ? [...this.rows[index]] : getColumn(index);
      const expectedLength = array.length;
      array = xMovement < 0 || yMovement < 0 ? array.reverse() : array;

      //make row compact
      array = array.filter((x) => x !== 0);

      //combine numbers
      for (let index = 0; index < array.length; index++) {
        const element = array[index];

        if (element === array[index + 1]) {
          this.score += element * 2;
          array[index] = element * 2;
          array[index + 1] = 0;
          index++;
          didCombineAny = true;
        }
      }

      //remove empty cells
      array = array.filter((x) => x !== 0);

      //pad array
      for (let i = array.length; i < expectedLength; i++) array.push(0);

      array = xMovement < 0 || yMovement < 0 ? array.reverse() : array;

      //set result
      if (yMovement === 0) {
        if (!this.arraysAreEqual(this.rows[index], array)) {
          didMoveAny = true;
        }
        this.rows[index] = array;
      } else {
        if (!this.arraysAreEqual(getColumn(index), array)) {
          didMoveAny = true;
        }
        setColumn(index, array);
      }
    }
    return didCombineAny || didMoveAny;
  }

  private arraysAreEqual(array1: number[], array2: number[]): boolean {
    if (array1.length !== array2.length) return false;

    for (let index = 0; index < array1.length; index++) {
      const element1 = array1[index];
      const element2 = array2[index];
      if (element1 !== element2) {
        return false;
      }
    }
    return true;
  }
}
