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
    const currentTile = this._board.TileAt(x, y)
    if (!currentTile.hasSameSymbol(emptyPlay)) {
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
    this.TileAt(x, y)!.symbol = symbol;
  }


  public findRowFullWithSamePlayer(): string {
    const tileA = this.TileAt(firstRow, firstColumn)
    const tileB = this.TileAt(secondRow, firstColumn)
    const tileC = this.TileAt(thirdRow, firstColumn)
    if (this.isRowFull(firstRow) && this.isRowFullWithSameSymbol(firstRow)) {
      return tileA!.symbol;
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSameSymbol(secondRow)) {
      return tileB!.symbol;
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSameSymbol(thirdRow)) {
      return tileC!.symbol;
    }

    return emptyPlay;
  }

  private isRowFull(row: number) {
    const tileA = this.TileAt(row, firstColumn)
    const tileB = this.TileAt(row, secondColumn)
    const tileC = this.TileAt(row, thirdColumn)
    return (
      !tileA.isEmpty() &&
      !tileB.isEmpty() &&
      !tileC.isEmpty()
    );
  }

  private isRowFullWithSameSymbol(row: number) {
    const tileA = this.TileAt(row, firstColumn)
    const tileB = this.TileAt(row, secondColumn)
    const tileC = this.TileAt(row, thirdColumn)
    return (
      tileA.hasSameSymbol(tileB) &&
      tileA.hasSameSymbol(tileC)
    );
  }
}
