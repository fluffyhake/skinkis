import express, { Request, Response } from 'express'
import { getAllImgesFromDB, saveImageToDB } from './images.service';
import { IImage } from './images.model';


export const saveImage = async (req: Request, res: Response) =>{
    try {
        // console.log(req)
        if(req.files){
            const files = req.files as Express.Multer.File[] ;
            console.log(req.files)
            const creationStatus = await saveImageToDB(files)
            return res.status(200).json({creationStatus: creationStatus})


        }else throw new Error ("No specified file from multer!")
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


export const getImage = async (req: Request, res: Response) =>{
    try {
        // Get a specific image here
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getAllImages = async(req: Request, res: Response) => {
    try {
        console.log(req)
        console.log("skinkis")
        let images: IImage[] = await getAllImgesFromDB()
        console.log(images)
        const imagesArray = new Array
        for(const entry of images){
            imagesArray.push(entry.imagePath)
        }
        
        return res.status(200).json({images: imagesArray})

    } catch (error) {
        return res.status(500).json({ error: "bingus🤣🤣🤣🤣🤣🤣"})
    }
}