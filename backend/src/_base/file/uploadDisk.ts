import multer, { diskStorage } from "multer"
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import * as path from "path";

async function createIfNotExistUploadPath(uploadPath: string, func: Function) {
  fs.exists(uploadPath, function (exists: any) {
    if (exists) {
      func();
      return true;
    }
    else {
      fs.mkdir(uploadPath, function (err: any) {
        if (err) {
          return false;
        }
        func();
        return true;
      });
    }
  })
}

const storage = multer.diskStorage({
  destination: async function(req: any, file: any, cb: any) {
    const func = () => cb(null, "static");
    createIfNotExistUploadPath('./static', func);
  },
  filename: function(req: any, file: any, cb: any) {
    cb(null, uuidv4()+'-'+file.originalname);
  },
})

const uploadDisk = multer({
  storage: storage,
  fileFilter: function (req:any , file: any, cb: any) {
    const mt = file.mimetype;
    const isOK = mt === 'image/jpg' || mt === 'image/jpeg' || mt === 'image/png';
    return cb(null, isOK);
  },
})

export default uploadDisk