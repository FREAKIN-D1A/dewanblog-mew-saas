//@ts-nocheck
import { connectToDb } from "@/lib/helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { v2, UploadApiResponse } from "cloudinary";

export const GET = async () => {
	try {
		await connectToDb();

		const blogs = await prisma.blog.findMany();
		return NextResponse.json(
			{ message: "success. all blogs get", blogs },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "error. all blogs get", error },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
};

const uploadImageOLD = async (file: Blob) => {
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
		// console.log("entered post\n===============================\n");

		const formData = await req.formData();
		const { title, description, location, userId, categoryId } = JSON.parse(
			formData.get("postData") as string
		);
		if (!title || !description || !location || !userId || !categoryId) {
			return NextResponse.json(
				{ message: "Invalid data", formData },
				{ status: 422 }
			);
		}

		const user = await prisma.user.findFirst({ where: { id: userId } });
		const category = await prisma.category.findFirst({
			where: { id: categoryId },
		});

		if (!user || !category) {
			return NextResponse.json(
				{ message: "Invalid ID given for category or ID", formData },
				{ status: 422 }
			);
		}

		// console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-\n");
		// console.log(formData);
		// console.log("formData done");
		// console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-\n");

		v2.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_secret: process.env.CLOUDINARY_API_SECRET,
			api_key: process.env.CLOUDINARY_API_KEY,
		});

		// console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");
		// // console.log(uploadedFile);
		// console.log("config done");
		// console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");

		const file = formData.get("image") as Blob | null;
		let uploadedFile: UploadApiResponse | null = null;

		if (file) {
			uploadedFile = await uploadImageOLD(file);
		} else {
			uploadedFile = null;
		}

		// console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");
		// console.log(uploadedFile);
		// console.log("uploadedFile done");
		// console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");

		const uploadData = {
			title,
			description,
			location,
			userId,
			categoryId,
			imageUrl: uploadedFile?.url ?? null,
		};

		// console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");
		// console.log(uploadData);
		// console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");

		const blog = await prisma.blog.create({
			data: uploadData,
		});

		// console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");
		// console.log(blog);
		// console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");

		return NextResponse.json({ message: "blog data", blog }, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: "error. blogs POST", error },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
};
