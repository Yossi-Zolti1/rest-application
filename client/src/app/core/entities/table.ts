export interface Table{
    name: string,
    positionX: number,
    positionY: number,
    restId?: number
}
export interface ModifiedTable {
    name: string;
    position: {
      x: number;
      y: number;
    };
  }