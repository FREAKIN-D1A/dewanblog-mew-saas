import prisma from "@/prisma";
import { NextResponse } from "next/server";
import queryString from "query-string";
import { connectToDb } from "@/lib/helpers";

export async function GET(req) {
	try {
		await connectToDb();
		const { searchQuery } = queryString.parseUrl(req.url).query; // "nextjs 13 app"

		const blogs = await prisma.blog.findMany({
			where: {
				OR: [
					{ title: { contains: searchQuery || "" } },
					{ location: { contains: searchQuery || "" } },
					{ description: { contains: searchQuery || "" } },
				],
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
}

// await dbConnect();
// const { searchQuery } = queryString.parseUrl(req.url).query; // "nextjs 13 app"

// try {
// 	const blogs = await Blog.find({
// 		$or: [
// 			{ title: { $regex: searchQuery, $options: "i" } },
// 			{ content: { $regex: searchQuery, $options: "i" } },
// 			{ category: { $regex: searchQuery, $options: "i" } },
// 		],
// 	}).sort({ createdAt: -1 });
// 	return NextResponse.json(blogs, { status: 200 });
// } catch (err) {
// 	console.log(err);
// 	return NextResponse.json(err, { status: 500 });
// }
