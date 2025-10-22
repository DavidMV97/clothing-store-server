import multer from 'multer';
import shortid from 'shortid';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsPath = path.resolve(__dirname, '..', 'uploads');
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split('/')[1];
    cb(null, `${shortid.generate()}.${extension}`);
  },
});

const configMulter = {
  storage: fileStorage,
  fileFilter(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Invalid format (JPEG or PNG only)'));
    }
  },
};

const upload = multer(configMulter).single('productImage');

export const uploadFile = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  });
};
