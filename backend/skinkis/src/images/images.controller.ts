import express, { Request, Response } from 'express'
import { saveImageToDB } from './images.service';


export const saveImage = async (req: Request, res: Response) =>{
    try {
        // console.log(req)
        if(req.files){
            const files = req.files as Express.Multer.File[] ;
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