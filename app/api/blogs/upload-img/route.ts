//@ts-nocheck
import { connectToDb } from "@/lib/helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { v2, UploadApiResponse } from "cloudinary";

const uploadImageFcn = async (file: Blob) => {
	// console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");
	// console.log("endtered uploadImageFcn");
	// console.log("file type >", typeof file);
	// console.log("file  >", file);
	// console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");
	return new Promise<UploadApiResponse>(async (resolve, reject) => {
		const buffer = Buffer.from(await file.arrayBuffer());
		v2.uploader
			.upload_stream(
				{
					resource_type: "auto",
					folder: "nextjs-saas-blog-prisma",
				},
				(error, result) => {
					if (error) {
						console.log(error);
						return reject(error);
					}
					if (result) {
						return resolve(result);
					}
				}
			)
			.end(buffer);
	});
};

export const POST = async (req: Request) => {
	try {
		// console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");
		// console.log("endtered server");
		// console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");

		v2.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_secret: process.env.CLOUDINARY_API_SECRET,
			api_key: process.env.CLOUDINARY_API_KEY,
		});

		const formData = await req.formData();

		// console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");
		// console.log("formData server >>>\n", formData);
		// console.log("formData server >>>\n", formData.get("file"));
		// console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");

		const file = formData.get("file") as Blob | null;

		let uploadedFile: UploadApiResponse | null = null;

		uploadedFile = await uploadImageFcn(file);

		// console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");
		// console.log(uploadedFile);
		// console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");

		return NextResponse.json(
			{ message: "blog data", url: uploadedFile?.url ?? null },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "error. image POST", error },
			{ status: 500 }
		);
	}
};
