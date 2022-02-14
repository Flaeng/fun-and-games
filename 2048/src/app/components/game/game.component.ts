import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less'],
})
export class GameComponent implements OnInit, OnDestroy {
  private highscore?: number;
  public game: Game = new Game(4, 4);
  public numberOfRows: number = 4;
  public numberOfColumns: number = 4;

  public getScore(): number {
    return this.game.getScore();
  }
  public getHighscore(): number {
    return this.highscore || 0;
  }
  public getRows(): number[][] {
    return this.game.rows;
  }

  private readonly HIGHSCORE_STORAGE_KEY: string = 'highscore';

  constructor() {
    this.newGame();
    this.highscore = Number(sessionStorage.getItem(this.HIGHSCORE_STORAGE_KEY));
  }

  private keyUpEventListener: any;
  public ngOnInit(): void {
    const _game = this;
    this.keyUpEventListener = (ev: KeyboardEvent) => this.onKeyUp(ev, _game);
    window.addEventListener('keyup', this.keyUpEventListener);
  }

  private onKeyUp(ev: KeyboardEvent, gameComponent: GameComponent): any {
    switch (ev.key) {
      case 'ArrowRight':
      case 'd':
        gameComponent.game.moveRight();
        break;
      case 'ArrowLeft':
      case 'a':
        gameComponent.game.moveLeft();
        break;
      case 'ArrowDown':
      case 's':
        gameComponent.game.moveDown();
        break;
      case 'ArrowUp':
      case 'w':
        gameComponent.game.moveUp();
        break;
      default:
        console.log(
          `${ev.key} was pressed but not bound - event will be ignored`
        );
        break;
    }
    return null;
  }

  public ngOnDestroy(): void {
    window.removeEventListener('keyup', this.keyUpEventListener);
  }

  public newGame(): void {
    this.game = new Game(this.numberOfRows, this.numberOfColumns);
    this.game.addGameEndedEventListener((game) => {
      if (!this.highscore || this.highscore < game.getScore()) {
        this.highscore = game.getScore();
        sessionStorage.setItem(
          this.HIGHSCORE_STORAGE_KEY,
          game.getScore().toString()
        );
      }
      window.alert(`Game over!\nYour score: ${game.getScore()}`);
    });
  }

  /*
  public getLargestNumber(): number {
    let result = 0;
    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];
      for (let x = 0; x < row.length; x++) {
        const cell = row[x];
        if (cell > result) {
          result = cell;
        }
      }
    }
    return result;
  }
*/
}
