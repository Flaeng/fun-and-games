import { Component, OnDestroy, OnInit } from '@angular/core';
import { Attempt } from 'src/app/models/attempt';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less'],
})
export class GameComponent implements OnInit, OnDestroy {
  public game: Game = new Game('');

  constructor() {
    this.newGame();
  }

  private keyUpEventListener: any;
  public ngOnInit(): void {
    const _game = this;
    this.keyUpEventListener = (ev: KeyboardEvent) => this.onKeyUp(ev, _game);
    window.addEventListener('keyup', this.keyUpEventListener);
  }

  private onKeyUp(ev: KeyboardEvent, game: GameComponent): any {
    const trimmedValue = ev.key.replace(/[^a-zA-Z]/g, '');
    if (trimmedValue.length !== 0 && ev.key.length === 1) {
      this.game.setCurrentLetter(ev.key);
    } else {
      console.log(
        `${ev.key} was pressed but not bound - event will be ignored`
      );
    }
    return null;
  }

  ngOnDestroy(): void {
    window.removeEventListener('keyup', this.keyUpEventListener);
  }

  public newGame(): void {
    const word = this.getNewWord();
    this.game = new Game(word);
  }

  public giveHint(): void {
    this.game.giveHint();
  }

  private getNewWord(): string {
    const optionsString = `
kaffe
gravko
krappe
hund
skole
elbil
traktor
laptop
tastatur
regnbue
sodavand
aftensmad
lommelygte
Økse
dreng
pige
knude
svamp
supermarked
knogler
fabrik
kompas
frikadelle
soldat
bamse
pattedyr
honning
elevator
kasse
frokost
sporvogn
kasse
ordbog
skovhugger
køkken
stue
toilet
teater
biograf
fængsel
station
hjelm
penge
pille
eventyr
historie
dansk
matematik
formning
hoved
overarm
trailer
cykel
datter
galleri
gulerod
album
farve
musik
guitar
klaver
vugge
bikube
konge
dronning
tegn
vindue
hofte
badekar
hoppe
hytte
krukke
skrue
fletning
karklud
talje
hoved
middag
nudler
strand
sommer
vinter
forår
efterår
    `;
    const options = optionsString.split('\n').map((x) => x.trim()).filter((x) => x.length !== 0);
    const rnd = Math.floor(Math.random() * options.length) - 1;
    return options[rnd];
  }
}
