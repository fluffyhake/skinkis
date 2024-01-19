import { model, Schema, Document } from 'mongoose';

export interface IImageDocument extends Document {
    title: string;
    filetype: string;
    imagePath: string;
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

const imageSchema = new Schema({
    title: {type: String, required: true},
    filetype: {type: String, required: true},
    imagePath: {type: String, required: true}
});

export const imagesModel= model<IImageDocument>('image', imageSchema);