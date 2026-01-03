/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = "O";
const emptyPlay = " ";

export class Game {
  private _lastSymbol = emptyPlay;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == emptyPlay) {
      if (player == playerO) {
        throw new Error("Invalid first player");
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error("Invalid next player");
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).symbol != emptyPlay) {
      throw new Error("Invalid position");
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    return this._board.findRowFullWithSamePlayer();
  }
}

class Tile {
  private _x: number;
  private _y: number;
  private _symbol: string;

  hasSameSymbol(symbol : string): boolean;
  hasSameSymbl(tile: Tile): boolean;

  constructor(x: number, y: number, symbol : string){
    this._x = x;
    this._y = y;
    this._symbol = symbol;
  }

  public hasSameSymbol(arg : string | Tile): boolean {
    const symbol = typeof arg === "string" ? arg : arg!.symbol
    
    return this.symbol === symbol;
  }

  public isEmpty(): boolean{
    return this.symbol === emptyPlay
  }

  public get x(): number{
    return this._x
  }

  public set x(x : number){
    this._x = x
  }

  public get y(): number{
    return this._y
  }

  public set y(y : number){
    this._y = y
  }

  public get symbol(): string {
    return this._symbol
  }

  public set symbol(symbol : string){
    this._symbol = symbol
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = firstRow; i <= thirdRow; i++) {
      for (let j = firstColumn; j <= thirdColumn; j++) {
        const tile: Tile = new Tile(i, j, emptyPlay);
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.x == x && t.y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.x == x && t.y == y)!.symbol = symbol;
  }


  public findRowFullWithSamePlayer(): string {
    if (this.isRowFull(firstRow) && this.isRowFullWithSameSymbol(firstRow)) {
      return this.TileAt(firstRow, firstColumn)!.symbol;
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSameSymbol(secondRow)) {
      return this.TileAt(secondRow, firstColumn)!.symbol;
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSameSymbol(thirdRow)) {
      return this.TileAt(thirdRow, firstColumn)!.symbol;
    }

    return emptyPlay;
  }

  private isRowFull(row: number) {
    return (
      this.TileAt(row, firstColumn)!.symbol != emptyPlay &&
      this.TileAt(row, secondColumn)!.symbol != emptyPlay &&
      this.TileAt(row, thirdColumn)!.symbol != emptyPlay
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    return (
      this.TileAt(row, firstColumn)!.symbol ==
        this.TileAt(row, secondColumn)!.symbol &&
      this.TileAt(row, thirdColumn)!.symbol ==
        this.TileAt(row, secondColumn)!.symbol
    );
  }
}
