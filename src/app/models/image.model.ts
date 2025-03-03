/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type RotateImage = {
  name: string;
  images: ImageBitmap[];
};

export type Image = {
  image: CanvasImageSource;
  imageb64: string | null;
};
