import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    const __dirname = path.resolve();
    console.log(file);
    const destination = path.join(__dirname, 'buffer', 'photos');
    callback(null, destination); // 第一引数はpotential errorのこと。nullでいい。./uploadsは相対パス。
  },

  filename: function (request, file, callback) {
    console.log(file.mimetype);
    const extension = 'jpeg'; // or jpgどちらか。
    const fileName = request.body.createdBy + '-' + Date.now() + '.' + extension;
    console.log(fileName);
    callback(null, fileName);
  },
});

const multerParser = multer({ storage });
export default multerParser;
