import { Letter } from './letter';

export class Attempt {
  public letters: Letter[] = [];

  public constructor(numberOfLetters: number) {
    if (numberOfLetters <= 0) {
      return;
    }
    this.letters = [];
    for (let x = 0; x < numberOfLetters; x++) {
      this.letters.push(new Letter());
    }
    this.letters[0].isCurrent = true;
  }
}
