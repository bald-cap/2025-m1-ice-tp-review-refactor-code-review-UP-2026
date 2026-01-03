/* eslint-disable */

// read the code
export class Game {
  private _lastSymbol = " ";
  private _toto: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayerTurn(symbol);
    this.validatePosition(x, y);
    this.updateGameState(symbol, x, y);
  }

  private validateFirstMove(symbol: string): void {
    //if first move
    if (this._lastSymbol == " ") {
      //if player is X
      if (symbol == "O") {
        throw new Error("Invalid first player");
      }
    }
  }

  private validatePlayerTurn(symbol: string): void {
    //if not first move but player repeated
    if (this._lastSymbol != " " && symbol == this._lastSymbol) {
      throw new Error("Invalid next player");
    }
  }

  private validatePosition(x: number, y: number): void {
    //if not first move but play on an already played tile
    if (this._lastSymbol != " " && this._toto.TileAt(x, y).Symbol != " ") {
      throw new Error("Invalid position");
    }
  }

  // update game state
  private updateGameState(symbol: string, x: number, y: number): void {
    this._lastSymbol = symbol;
    this._toto.AddTileAt(symbol, x, y);
  }

  public Winner(): string {
    //if the positions in first row are taken
    if (this.isFirstRowFull()) {
      //if first row is full with same symbol
      if (this.isFirstRowFullWithSameSymbol()) {
        return this._toto.TileAt(0, 0)!.Symbol;
      }
    }

    //if the positions in 2nd row are taken
    if (this.isSecondRowFull()) {
      //if middle row is full with same symbol
      if (this.isSecondRowFullWithSameSymbol()) {
        return this._toto.TileAt(1, 0)!.Symbol;
      }
    }

    //if the positions in 3rd row are taken
    if (this.isThirdRowFull()) {
      //if bottom row is full with same symbol
      if (this.isThirdRowFullWithSameSymbol()) {
        return this._toto.TileAt(2, 0)!.Symbol;
      }
    }

    return " ";
  }

  private isFirstRowFull() {
    return (
      this._toto.TileAt(0, 0)!.Symbol != " " &&
      this._toto.TileAt(0, 1)!.Symbol != " " &&
      this._toto.TileAt(0, 2)!.Symbol != " "
    );
  }

  private isFirstRowFullWithSameSymbol() {
    return (
      this._toto.TileAt(0, 0)!.Symbol == this._toto.TileAt(0, 1)!.Symbol &&
      this._toto.TileAt(0, 2)!.Symbol == this._toto.TileAt(0, 1)!.Symbol
    );
  }

  private isSecondRowFull() {
    return (
      this._toto.TileAt(1, 0)!.Symbol != " " &&
      this._toto.TileAt(1, 1)!.Symbol != " " &&
      this._toto.TileAt(1, 2)!.Symbol != " "
    );
  }

  private isSecondRowFullWithSameSymbol() {
    return (
      this._toto.TileAt(1, 0)!.Symbol == this._toto.TileAt(1, 1)!.Symbol &&
      this._toto.TileAt(1, 2)!.Symbol == this._toto.TileAt(1, 1)!.Symbol
    );
  }

  private isThirdRowFull() {
    return (
      this._toto.TileAt(2, 0)!.Symbol != " " &&
      this._toto.TileAt(2, 1)!.Symbol != " " &&
      this._toto.TileAt(2, 2)!.Symbol != " "
    );
  }

  private isThirdRowFullWithSameSymbol() {
    return (
      this._toto.TileAt(2, 0)!.Symbol == this._toto.TileAt(2, 1)!.Symbol &&
      this._toto.TileAt(2, 2)!.Symbol == this._toto.TileAt(2, 1)!.Symbol
    );
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: " " };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    //@ts-ignore
    const tile: Tile = { X: x, Y: y, Symbol: symbol };

    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}

// create a PR,
// fix indentation first
//  commit and push
// make your comments,
// then refactor
// submit your PR for review
