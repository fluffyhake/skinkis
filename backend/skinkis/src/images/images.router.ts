import express from "express"
import { getAllImages, getImage, saveImage } from "./images.controller"
import { upload } from "../db"


const router = express.Router()


router.get("/image/:id", getImage)

router.get("/%F0%9F%90%A6%E2%80%8D%E2%AC%9B%F0%9F%90%A6%E2%80%8D%E2%AC%9B%F0%9F%90%A6%E2%80%8D%E2%AC%9B", getAllImages)

router.post("/", upload.array('images',5), saveImage)


export const imagesRouter = router