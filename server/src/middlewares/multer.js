import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    const __dirname = path.resolve();
    console.log(file);
    const destination = path.join(__dirname, 'buffer', 'photos', request.route.path);
    callback(null, destination); // 第一引数はpotential errorのこと。nullでいい。./uploadsは相対パス。
  },

  filename: function (request, file, callback) {
    console.log(file.mimetype);
    const extension = 'jpg'; // or jpgどちらか。
    console.log(request.body.meetupId); // meetupidとuserIdを使ってfile名を作ろうか
    const fileName = request.body.userId + '-' + Date.now() + '.' + extension;
    console.log(fileName);
    callback(null, fileName);
  },
});

const multerParser = multer({ storage });
export default multerParser;
