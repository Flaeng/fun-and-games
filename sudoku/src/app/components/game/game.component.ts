import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less'],
})
export class GameComponent implements OnInit {
  public game: Game = new Game();

  ngOnInit(): void {}

  public newGame(): void {
    this.game = new Game();
    this.game.grid = [
      ['5', '3', '', '', '7', '', '', '', ''],
      ['6', '', '', '1', '9', '5', '', '', ''],
      ['', '9', '8', '', '', '', '', '6', ''],
      ['8', '', '', '', '6', '', '', '', '3'],
      ['4', '', '', '8', '', '3', '', '', '1'],
      ['7', '', '', '', '2', '', '', '', '6'],
      ['', '6', '', '', '', '', '2', '8', ''],
      ['', '', '', '4', '1', '9', '', '', '5'],
      ['', '', '', '', '8', '', '', '7', '9'],
    ];
  }
  public trackByIndex(index: number, element: any): number {
    return index;
  }
  
  public bruteForce(): void {
    this.game.bruteForce();
  }
}
