import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "ds7zejank",
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  const { path } = await req.json();
  if (!path) {
    return NextResponse.json(
      { message: "the image path is required" },
      { status: 400 }
    );
  }
  try {
    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
      transformation: [{ width: 1000, height: 752, crop: "scale" }],
    };
    const result = await cloudinary.uploader.upload(path, options);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
