/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type Cell = {
  x: number; // Column index
  y: number; // Row index
  drawx: number; // X-coordinate in pixels
  drawy: number; // Y-coordinate in pixels
  width: number; // Width of the cell in pixels
  height: number; // Height of the cell in pixels
  imageIndex: number | null; // Reference to the image index as a string
  steps: number;
  done: boolean;
  parentcell: Cell | null;
  placeHolder: number | null;
  cellcolor: string;
};
