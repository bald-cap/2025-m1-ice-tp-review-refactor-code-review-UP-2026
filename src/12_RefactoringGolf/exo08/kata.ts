/* eslint-disable */

const firstRow : Coordinate = 0;
const secondRow : Coordinate = 1;
const thirdRow : Coordinate = 2;
const firstColumn : Coordinate = 0;
const secondColumn : Coordinate = 1;
const thirdColumn : Coordinate = 2;

const playerO : Symbol = "O";
const noPlayer : Symbol = " ";

type Symbol = "X" | "O" | " ";
type Coordinate = 0 | 1 | 2;

export class Game {
  private _lastPlayer = noPlayer;
  private _board: Board = new Board();

  public Play(player: Symbol, x: Coordinate, y: Coordinate): void {
    this.validateFirstMove(player);
    this.validatePlayer(player);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(player);
    this.updateBoard(new Tile(x, y, player));
  }

  private validateFirstMove(player: Symbol) {
    if (this._lastPlayer == noPlayer) {
      if (player == playerO) {
        throw new Error("Invalid first player");
      }
    }
  }

  private validatePlayer(player: Symbol) {
    if (player == this._lastPlayer) {
      throw new Error("Invalid next player");
    }
  }

  private validatePositionIsEmpty(x: Coordinate, y: Coordinate) {
    if (this._board.isTilePlayedAt(x, y)) {
      throw new Error("Invalid position");
    }
  }

  private updateLastPlayer(player: Symbol) {
    this._lastPlayer = player;
  }

  private updateBoard(tile: Tile) {
    this._board.AddTileAt(tile);
  }

  public Winner(): Symbol {
    return this._board.findRowFullWithSamePlayer();
  }
}

class Tile {
  private x: Coordinate = 0;
  private y: Coordinate = 0;
  private player: Symbol = noPlayer;

  constructor(x: Coordinate, y: Coordinate, player: Symbol) {
    this.x = x;
    this.y = y;
    this.player = player;
  }

  get Player() {
    return this.player;
  }

  get isNotEmpty() {
    return this.Player !== noPlayer;
  }

  hasSamePlayerAs(other: Tile) {
    return this.Player === other.Player;
  }

  hasSameCoordinatesAs(other: Tile) {
    return this.x == other.x && this.y == other.y;
  }

  updatePlayer(newPlayer: Symbol) {
    this.player = newPlayer;
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let x = firstRow; x <= thirdRow; x++) {
      for (let y = firstColumn; y <= thirdColumn; y++) {
        this._plays.push(new Tile(x, y, noPlayer));
      }
    }
  }

  public isTilePlayedAt(x: Coordinate, y: Coordinate) {
    return this.findTileAt(new Tile(x, y, noPlayer))!.isNotEmpty;
  }

  public AddTileAt(tile: Tile): void {
    this.findTileAt(tile)!.updatePlayer(tile.Player);
  }

  public findRowFullWithSamePlayer(): Symbol {
    if (this.isRowFull(firstRow) && this.isRowFullWithSamePlayer(firstRow)) {
      return this.playerAt(firstRow, firstColumn);
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSamePlayer(secondRow)) {
      return this.playerAt(secondRow, firstColumn);
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSamePlayer(thirdRow)) {
      return this.playerAt(thirdRow, firstColumn);
    }

    return noPlayer;
  }

  private findTileAt(tile: Tile) {
    return this._plays.find((t: Tile) => t.hasSameCoordinatesAs(tile));
  }

  private hasSamePlayer(x: Coordinate, y: Coordinate, otherX: Coordinate, otherY: Coordinate) {
    return this.TileAt(x, y)!.hasSamePlayerAs(this.TileAt(otherX, otherY)!);
  }

  private playerAt(x: Coordinate, y: Coordinate) {
    return this.TileAt(x, y)!.Player;
  }

  private TileAt(x: Coordinate, y: Coordinate): Tile {
    return this._plays.find((t: Tile) =>
      t.hasSameCoordinatesAs(new Tile(x, y, noPlayer)),
    )!;
  }

  private isRowFull(row: Coordinate) {
    return (
      this.isTilePlayedAt(row, firstColumn) &&
      this.isTilePlayedAt(row, secondColumn) &&
      this.isTilePlayedAt(row, thirdColumn)
    );
  }

  private isRowFullWithSamePlayer(row: Coordinate) {
    return (
      this.hasSamePlayer(row, firstColumn, row, secondColumn) &&
      this.hasSamePlayer(row, secondColumn, row, thirdColumn)
    );
  }
}
