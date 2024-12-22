import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { cloudinary } from "../config";
import { Image } from "../interface";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: Express.Request, file: Express.Multer.File) => ({
    folder: "cloudinaryFiles",
    public_id: `${file.originalname.replace(/\.[^/.]+$/, "")}-${uuidv4()}`,
  }),
});

const upload = multer({ storage });

const uploadImage = async (
  files: Express.Multer.File[],
  oldImagePublicIds: string[]
): Promise<Image[]> => {
  if (!files || !Array.isArray(files)) return [];

  for (const publicId of oldImagePublicIds) {
    if (publicId) await cloudinary.uploader.destroy(publicId);
  }

  const uploadPromises = files.map((file) =>
    cloudinary.uploader
      .upload(file.path, { public_id: file.filename })
      .then((result) => ({
        public_id: result.public_id,
        url: result.secure_url,
        originalname: file.originalname,
      }))
  );

  return Promise.all(uploadPromises);
};

export { upload, uploadImage };
