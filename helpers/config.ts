import { diskStorage } from 'multer';

export const storageConfig = (folder: string) =>
  diskStorage({
    destination: `./uploads/${folder}`,
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  });
