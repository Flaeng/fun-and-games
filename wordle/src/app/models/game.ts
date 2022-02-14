import { Attempt } from './attempt';
import { LetterResult } from './letter-result';

export class Game {
  public correctWord: string = '';
  public attempts: Attempt[] = [];
  public helps: number[] = [];

  public constructor(word: string) {
    this.correctWord = word;
    this.attempts = [new Attempt(word.length)];
  }

  public getCurrentAttempt(): Attempt {
    return this.attempts[this.attempts.length - 1];
  }

  public giveHint() {
    const indexes = [];
    for (let x = 0; x < this.correctWord.length; x++) {
      const attemptsWithCorrectAnswerAtIndex = this.attempts.filter(
        (att) =>
          att.letters[x].result === LetterResult.CorrectWithCorrectPosition
      );
      if (attemptsWithCorrectAnswerAtIndex.length !== 0) {
        continue;
      }
      indexes.push(x);
    }

    const index = Math.floor(Math.random() * indexes.length);
    const letterPosition = indexes[index];
    const currentAttempt = this.getCurrentAttempt();
    currentAttempt.letters[letterPosition].letter =
      this.correctWord[letterPosition];
    currentAttempt.letters[letterPosition].result =
      LetterResult.CorrectWithCorrectPosition;
    if (currentAttempt.letters[letterPosition].isCurrent) {
      currentAttempt.letters[letterPosition].isCurrent = false;

      if (letterPosition === currentAttempt.letters.length - 1) {
        this.checkWord();
      } else {
        currentAttempt.letters[letterPosition + 1].isCurrent = true;
      }
    }
  }

  public setCurrentLetter(letter: string): void {
    const currentAttempt = this.getCurrentAttempt();
    const currentLetter = currentAttempt.letters.find(
      (x) => x.letter === undefined
    );
    if (!currentLetter) {
      console.warn('Failed to find current letter in current attempt!');
      return;
    }
    currentLetter.letter = letter;

    currentLetter.isCurrent = false;

    if (
      currentAttempt.letters.filter((x) => x.letter === undefined).length === 0
    ) {
      this.checkWord();
    } else {
      const currentLetterIndex = currentAttempt.letters.findIndex(
        (x) => x === currentLetter
      );
      currentAttempt.letters[currentLetterIndex + 1].isCurrent = true;
    }
  }

  private checkWord(): void {
    if (this.checkCurrentAttempt()) {
      //Game is won
      setTimeout(() => alert('YOU WON'), 10);
    } else {
      //New attempt is allowed
      this.attempts.push(new Attempt(this.correctWord.length));
    }
  }

  public checkCurrentAttempt(): boolean {
    const currentAttempt = this.getCurrentAttempt();
    const correctWordCharArr = this.correctWord.split('');

    for (let i = 0; i < currentAttempt.letters.length; i++) {
      const element = currentAttempt.letters[i];
      const indexOfChar = correctWordCharArr.findIndex(
        (x) => x === element.letter
      );
      if (indexOfChar === -1) {
        element.result = LetterResult.Wrong;
      } else {
        element.result =
          indexOfChar === i
            ? LetterResult.CorrectWithCorrectPosition
            : LetterResult.CorrectWithWrongPosition;
        correctWordCharArr[indexOfChar] = '';
      }
    }

    return (
      currentAttempt.letters.filter(
        (x) => x.result === LetterResult.CorrectWithCorrectPosition
      ).length === this.correctWord.length
    );
  }
}
