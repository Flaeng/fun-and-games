import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to start new game', () => {
    component.newGame();
    const score = component.getScore();
    expect(score).toBe(0);
    const rows = component.getRows();

    let cells = [];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      for (let x = 0; x < row.length; x++) {
        const cell = row[x];
        cells.push(cell);
      }
    }

    const cellsWithAValueOfZero = cells.filter((x) => x === 0);
    expect(cellsWithAValueOfZero.length).toBe(14);
    const cellsWithAValueOfTwo = cells.filter((x) => x === 2);
    expect(cellsWithAValueOfTwo.length).toBe(2);
  });

  it('Can move left', () => {
    component.rows = [
      [0, 2, 2, 0],
      [0, 4, 2, 0],
      [2, 0, 2, 0],
      [0, 2, 0, 2],
      [16, 2, 0, 2],
    ];

    component.move(0, 1);

    const rows = component.getRows();
    const expectedResult = [
      [4, 0, 0, 0],
      [4, 2, 0, 0],
      [4, 0, 0, 0],
      [4, 0, 0, 0],
      [16, 4, 0, 0],
    ];
    /*console.info(
      `----------------------------------\n` +
        `--- EXPECTED RESULT ---\n${expectedResult
          .map((x) => x.join(', '))
          .join('\n')}\n` +
        `--- ACTUAL RESULT ---\n${rows.map((x) => x.join(', ')).join('\n')}\n` +
        `----------------------------------\n`
    );*/
    expect(rows).toEqual(expectedResult);
  });

  it('Can move right', () => {
    component.rows = [
      [0, 2, 2, 0],
      [0, 4, 2, 0],
      [2, 0, 2, 0],
      [0, 2, 0, 2],
      [16, 2, 0, 2],
    ];

    component.move(0, -1);

    const rows = component.getRows();
    const expectedResult = [
      [0, 0, 0, 4],
      [0, 0, 4, 2],
      [0, 0, 0, 4],
      [0, 0, 0, 4],
      [0, 0, 16, 4],
    ];
    /*console.info(
      `----------------------------------\n` +
        `--- EXPECTED RESULT ---\n${expectedResult
          .map((x) => x.join(', '))
          .join('\n')}\n` +
        `--- ACTUAL RESULT ---\n${rows.map((x) => x.join(', ')).join('\n')}\n` +
        `----------------------------------\n`
    );*/
    expect(rows).toEqual(expectedResult);
  });

  it('Can move up', () => {
    component.rows = [
      [0, 2, 2, 0],
      [0, 4, 2, 0],
      [2, 0, 2, 0],
      [0, 2, 0, 2],
      [16, 2, 0, 2],
    ];

    component.move(1, 0);

    const rows = component.getRows();
    const expectedResult = [
      [2, 2, 4, 4],
      [16, 4, 2, 0],
      [0, 4, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    /*console.info(
      `----------------------------------\n` +
        `--- EXPECTED RESULT ---\n${expectedResult
          .map((x) => x.join(', '))
          .join('\n')}\n` +
        `--- ACTUAL RESULT ---\n${rows.map((x) => x.join(', ')).join('\n')}\n` +
        `----------------------------------\n`
    );*/
    expect(rows).toEqual(expectedResult);
  });

  it('Can move down', () => {
    component.rows = [
      [0, 2, 2, 0],
      [0, 4, 2, 0],
      [2, 0, 2, 0],
      [0, 2, 0, 2],
      [16, 2, 0, 2],
    ];

    component.move(-1, 0);

    const rows = component.getRows();
    expect(rows).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [2, 4, 2, 0],
      [16, 4, 4, 4],
    ]);
  });
  
  it('Can detect changes in grid #1 (right)', () => {
    component.rows = [
      [0, 4, 2, 0],
    ];

    const result1 = component.move(0, 1);

    expect(result1).toBeTrue();
  });
  
  it('Can detect changes in grid #1 (left)', () => {
    component.rows = [
      [0, 2, 4, 0],
    ];

    const result1 = component.move(0, -1);

    expect(result1).toBeTrue();
  });
  
  it('Can detect changes in grid #2 (right)', () => {
    component.rows = [
      [0, 0, 2, 4],
    ];

    const result1 = component.move(0, -1);

    expect(result1).toBeFalse();
  });
  
  it('Can detect changes in grid #2 (left)', () => {
    component.rows = [
      [2, 4, 0, 0],
    ];

    const result1 = component.move(0, 1);

    expect(result1).toBeFalse();
  });
  
  it('Can detect changes in grid #2 (up)', () => {
    component.rows = [
      [2, 4, 0, 0],
      [4, 8, 0, 0],
      [2, 4, 0, 0],
    ];

    const result1 = component.move(1, 0);

    expect(result1).toBeFalse();
  });
  
  it('Can detect changes in grid #2 (down)', () => {
    component.rows = [
      [2, 4, 0, 0],
      [4, 8, 0, 0],
      [2, 4, 0, 0],
    ];

    const result1 = component.move(1, 0);

    expect(result1).toBeFalse();
  });
  
  it('Can detect changes in grid #3', () => {
    component.rows = [
      [0, 2, 2, 4],
    ];

    const result1 = component.move(0, 1);

    expect(result1).toBeTrue();
  });
});
