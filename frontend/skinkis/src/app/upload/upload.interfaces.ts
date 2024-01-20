export interface IUploadData {
    file: Blob,
}

export interface IImage {
    title: string;
    filetype: string;
    imagePath: string;
}

export interface IReturnImage{
    [key: string]: {
        saved: boolean,
        image: IImage
      }
}