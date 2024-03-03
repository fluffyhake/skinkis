import {imagesModel, IImage, IReturnImage} from "./images.model";

export async function getImageById(imageId: string) {
    const image = await imagesModel.findById(imageId);
    if (!image) {
      throw new Error('User not found');
    }
    return image;
}


export async function saveImageToDB(files: Express.Multer.File[]): Promise<IReturnImage> {
  let creationStatus: IReturnImage = {}
  for (const file of files) {
    console.log(file)
    const image = await imagesModel.create({
      title: file.originalname,
      filetype: file.mimetype,
      imagePath: file.path
    });
    console.log(image)
    if (!image) {
      creationStatus[file.originalname].saved = false
    }else{
      creationStatus[file.originalname] = {
        saved: true,
        image: {
          title: image.title,
          filetype:  image.filetype,
          imagePath: image.imagePath
        }
      }
    }
  }
  return creationStatus
}

export async function getAllImgesFromDB(): Promise<IImage[]> {
    let list: IImage[] = new Array
    const images: IImage[] = await imagesModel.find();
    console.log(images)
    if (!images) {
      throw new Error("No images found in database!")
    }else{
      list = images
      }
      return list
}

