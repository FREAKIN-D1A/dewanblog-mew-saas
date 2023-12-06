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
		console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");
		console.log("endtered submit route");
		console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");

		const formData = await req.formData();

		console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");
		console.log("endtered submit route. formData : >>>");
		console.log(formData);
		console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");

		const { title, description, location, userId, categoryId, imageUrl } =
			JSON.parse(formData.get("postData") as string);
		// JSON.parse(formData);

		if (!title || !description || !location || !userId || !categoryId) {
			return NextResponse.json(
				{ message: "Invalid data", ...formData.get("postData") },
				{ status: 422 }
			);
		}

		console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");
		console.log("checking =......", {
			title,
			description,
			location,
			userId,
			categoryId,
			imageUrl,
		});
		console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");

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

		console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");
		console.log("checking done");
		console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");

		const uploadData = {
			title,
			description,
			location,
			userId,
			categoryId,
			imageUrl,
		};

		const blog = await prisma.blog.create({
			data: uploadData,
		});

		console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");
		console.log("creating blog done.....>>>");
		console.log("blog");
		console.log("-=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-");

		return NextResponse.json({ message: "blog data", blog }, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: "error. blogs....... POST", error },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
};
