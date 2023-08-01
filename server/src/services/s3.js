import fs from 'fs';
import util from 'util';
const unlinkFile = util.promisify(fs.unlink);
import S3 from 'aws-sdk/clients/s3';
import path from 'path';

const s3 = new S3({
  region: process.env.AWS_S3_BUCKET_REGION,
  accessKeyId: process.env.AWS_S3_BUCKET_ACCESS_KEY_FOR_SERVER,
  secretAccessKey: process.env.AWS_S3_BUCKET_SECRET_KEY_FOR_SERVER,
});

export const uploadPhoto = async (fileName, contentType) => {
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, 'buffer', fileName);
  const fileStream = fs.createReadStream(filePath);

  const uploadParams = {
    Bucket: process.env.AWS_S3BUCKET_NAME,
    Body: fileStream,
    Key: contentType === 'photo' ? `photos/${fileName}` : `video/${fileName}`,
  };
  await s3.upload(uploadParams).promise();
  console.log('content uploaded');

  await unlinkFile(filePath);
};
