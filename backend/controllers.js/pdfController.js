const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("../config/s3");

exports.getPdfUrl = async (req, res) => {
  const { pdfKey } = req.query;

  const command = new GetObjectCommand({
    Bucket: process.env.S3_PDF_BUCKET,
    Key: pdfKey
  });

  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 300 // 5 minutes
  });

  res.json({ url: signedUrl });
};
