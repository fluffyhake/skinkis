import mongoose from 'mongoose';
import multer from 'multer';



export async function connect () : Promise<void> {
    try {
        await mongoose.connect('mongodb://localhost/skinkis');
        console.log('DB is connected');
        
    } catch (e) {
        console.log(e);
    }
};

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  },
});

const fileFilter = (req: any,file: any,cb: any) => {
    if(file.mimetype === "image/jpg"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ===  "image/png"){
     
    cb(null, true);
   }else{
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
    }
}

export const upload = multer({ storage: storage , fileFilter: fileFilter});

