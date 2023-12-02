import { connectToDb } from "@/lib/helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { URL } from "url";
// import { v2, UploadApiResponse } from "cloudinary";

export const GET = async (req: Request) => {
	const searchedTitle = new URL(req.url).searchParams.get("title");

	try {
		await connectToDb();
		const blogs = await prisma.blog.findMany({
			where: {
				title: { contains: searchedTitle ?? "" },
				description: { contains: searchedTitle ?? "" },
			},
		});
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
