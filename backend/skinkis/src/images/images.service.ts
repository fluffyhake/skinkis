import {imagesModel, IImage, IReturnImage} from "./images.model";

export async function getImageById(imageId: string) {
  try {
    const image = await imagesModel.findById(imageId);
    if (!image) {
      throw new Error('User not found');
    }
    return image;
  } catch (error) {
    throw new Error('Error fetching image');
  }
}


export async function saveImageToDB(files: Express.Multer.File[]): Promise<IReturnImage> {
  try {
  let creationStatus: IReturnImage = {}
  for (const file of files) {
    console.log(file)
    // TODO add support for idential originalnames =)
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
    
  } catch (error) {
    console.log(error)
    throw new Error('Error fetching image');
  }
}
