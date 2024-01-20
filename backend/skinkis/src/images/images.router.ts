import express from "express"
import { getImage, saveImage } from "./images.controller"
import { upload } from "../db"


const router = express.Router()


router.get("/:id", getImage)

router.post("/", upload.array('images',5), saveImage)


export const imagesRouter = router