import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    // Read files in the uploads directory
    if (fs.existsSync(uploadDir)) {
      const files = fs.readdirSync(uploadDir);
      const imagePaths = files.map((file) => `/uploads/${file}`);
      res.status(200).json({ images: imagePaths });
    } else {
      res.status(404).json({ message: 'No images found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
