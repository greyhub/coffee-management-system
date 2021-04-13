import multer, { diskStorage } from "multer"
import path from "path";
import { updateLanguageServiceSourceFile } from "typescript";
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: function(req: any, file: any, cb: any) {
    cb(null, "static")
  },
  filename: function(req: any, file: any, cb: any) {
    cb(null, uuidv4()+'-'+file.originalname);
  },
})

const uploadDisk = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const mt = file.mimetype;
    const isOK = mt === 'image/jpg' || mt === 'image/jpeg' || mt === 'image/png';
    return cb(null, isOK);
  },
})

export default uploadDisk