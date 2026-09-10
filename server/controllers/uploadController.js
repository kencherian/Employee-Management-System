import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from 'crypto';

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const generatePresignedUrl = async (req, res) => {
    try {
        const rawBytes = crypto.randomBytes(16);
        const imageName = rawBytes.toString('hex');
        
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `profiles/${imageName}`,
            ContentType: req.query.fileType
        });

        // Generate a URL valid for 60 seconds
        const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
        const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/profiles/${imageName}`;

        res.status(200).json({ success: true, uploadUrl, imageUrl });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to generate presigned URL" });
    }
};

export { generatePresignedUrl };