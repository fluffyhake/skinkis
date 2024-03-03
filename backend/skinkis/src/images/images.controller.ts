import { NextFunction, Request, Response } from 'express'
import { getAllImgesFromDB, saveImageToDB } from './images.service';
import { IImage } from './images.model';


export const saveImage = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        console.log("bingus")
        if(req.files){
            const files = req.files as Express.Multer.File[] ;
            console.log(req.files)
            const creationStatus = await saveImageToDB(files)
            return res.status(200).json({creationStatus: creationStatus})


        }else throw new Error ("No specified file from multer!")
    } catch (error) {
        console.log(error)
        next(error)
    }
}


export const getImage = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        // Get a specific image here
    } catch (error) {
        next(error)
    }
}

export const getAllImages = async(req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("skinkis")
        let images: IImage[] = await getAllImgesFromDB()
        const imagesArray = new Array
        for(const entry of images){
            imagesArray.push(entry.imagePath)
        }
        
        return res.status(200).json({images: imagesArray})

    } catch (error) {
        next(error)
    }
}