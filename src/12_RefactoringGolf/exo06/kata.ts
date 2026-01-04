/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const markO = "O";
const emptyMark = " ";

export class Game {
  private _lastPlayedMark= emptyMark;
  private _Grid: Grid = new Grid();

  public Play(mark: string, x: number, y: number): void {
    this.validateFirstMove(mark);
    this.validatePlayerTurn(mark);
    this.validateSpaceIsEmpty(x, y);

    this.updateLastPlayedMark(mark);
    this.updateGrid(mark, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastPlayedMark == emptyMark) {
      if (player == markO) {
        throw new Error("Invalid first player");
      }
    }
  }

  private validatePlayerTurn(player: string) {
    if (player == this._lastPlayedMark) {
      throw new Error("Invalid next player");
    }
  }

  private validateSpaceIsEmpty(x: number, y: number) {
    if (this._Grid.TileAt(x, y).isNotEmpty) {
      throw new Error("Invalid position");
    }
  }

  private updateLastPlayedMark(player: string) {
    this._lastPlayedMark = player;
  }

  private updateGrid(player: string, x: number, y: number) {
    this._Grid.AddTileAt(player, x, y);
  }

  public Winner(): string {
    return this._Grid.findRowFullWithSameMark();
  }
}

class Tile {
  private x: number = 0;
  private y: number = 0;
  private mark: string = " ";

  constructor(x: number, y: number, mark: string) {
    this.x = x;
    this.y = y;
    this.mark = mark;
  }

  get Mark() {
    return this.mark;
  }

  get isNotEmpty() {
    return this.Mark !== emptyMark;
  }

  hasSameMarkAs(other: Tile) {
    return this.Mark === other.Mark;
  }

  hasSamePositionsAs(other: Tile) {
    return this.x == other.x && this.y == other.y;
  }

  updateMark(newMark: string) {
    this.mark = newMark;
  }
}

class Grid {
  private _plays: Tile[] = [];

  constructor() {
    for (let x = firstRow; x <= thirdRow; x++) {
      for (let y = firstColumn; y <= thirdColumn; y++) {
        this._plays.push(new Tile(x, y, emptyMark));
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) =>
      t.hasSamePositionsAs(new Tile(x, y, emptyMark)),
    )!;
  }

  public AddTileAt(mark: string, x: number, y: number): void {
    this._plays
      .find((t: Tile) => t.hasSamePositionsAs(new Tile(x, y, mark)))!
      .updateMark(mark);
  }

  public findRowFullWithSameMark(): string {
    if (this.isRowFull(firstRow) && this.isRowFullWithSameMark(firstRow)) {
      return this.TileAt(firstRow, firstColumn)!.Mark;
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSameMark(secondRow)) {
      return this.TileAt(secondRow, firstColumn)!.Mark;
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSameMark(thirdRow)) {
      return this.TileAt(thirdRow, firstColumn)!.Mark;
    }

    return emptyMark;
  }

  private isRowFull(row: number) {
    return (
      this.TileAt(row, firstColumn)!.isNotEmpty &&
      this.TileAt(row, secondColumn)!.isNotEmpty &&
      this.TileAt(row, thirdColumn)!.isNotEmpty
    );
  }

  private isRowFullWithSameMark(row: number) {
    return (
      this.TileAt(row, firstColumn)!.hasSameMarkAs(
        this.TileAt(row, secondColumn)!,
      ) &&
      this.TileAt(row, thirdColumn)!.hasSameMarkAs(
        this.TileAt(row, secondColumn)!,
      )
    );
  }
}
