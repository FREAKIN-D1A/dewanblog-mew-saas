//@ts-nocheck
import {
	connectToDb,
	generateErrorMessage,
	generateSuccessMessage,
} from "@/lib/helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (
	req: Request,
	{ params }: { params: { id: string } }
) => {
	try {
		const id = params.id;
		await connectToDb();
		const blog = await prisma.blog.findFirst({
			where: { id },
		});
		return NextResponse.json(
			{ message: "success. blog get", blog },
			{ status: 200 }
		);

		// return generateSuccessMessage({ category }, 200);
	} catch (error: any) {
		return NextResponse.json(
			{ message: "error. blog get", error },
			{ status: 500 }
		);
		// return generateErrorMessage({ error }, 500);
	} finally {
		await prisma.$disconnect();
	}
};

export const PUT = async (
	req: Request,
	{ params }: { params: { id: string } }
) => {
	try {
		const id = params.id;
		const formData = await req.formData();

		console.log("<<<<<<<<<<<<<<<<<<\n\n");
		console.log("put req inside updating ======>> ");
		console.log(">>>>>>>>>>>>>>>>>>\n\n");

		// const postData = await req.json();

		console.log("\n\n<<<<<<<<<<<<<<<<<<<<<<<<<<");
		console.log("formData  ======>>\n", formData);
		console.log("id = params.id;  ======>>\n", id);
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>\n\n");

		const { title, description, location, userId, categoryId, imageUrl } =
			JSON.parse(formData.get("postData") as string);

		const uploadData = {
			title,
			description,
			location,
			userId,
			categoryId,
			imageUrl,
		};

		console.log("\n\n<<<<<<<<<<<<<<<<<<");
		console.log("put req uploadData ======>> ", uploadData);
		console.log("\n\n>>>>>>>>>>>>>>>>>>");

		await connectToDb();
		const blog = await prisma.blog.update({
			where: { id },
			// data: { title: title, description: description },
			data: { ...uploadData },
		});
		return NextResponse.json(
			{ message: "success. blog put", ...blog },
			{ status: 200 }
		);

		// return generateSuccessMessage({ category }, 200);
	} catch (error: any) {
		console.log("x-x-x-x-x-x-x-x-x-x-x-x-xx-\n\n");
		console.log("put req inside  (error: any ======>> ", error);
		console.log("x-x-x-x-x-x-x-x-x-x-x-x-xx-\n\n");
		return NextResponse.json(
			{ message: "error. blog updating ", error },
			{ status: 500 }
		);
		// return generateErrorMessage({ error }, 500);
	} finally {
		await prisma.$disconnect();
	}
};

export const DELETE = async (
	req: Request,
	{ params }: { params: { id: string } }
) => {
	try {
		console.log("\n\n\n\n<<<<<<<<<<<<<<<<<<<<<<<<<<");
		console.log("endtered params  ======>>\n", params);
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>\n\n\n\n");

		const id = params.id;

		await connectToDb();
		const blog = await prisma.blog.delete({
			where: { id },
		});
		return NextResponse.json(
			{ message: "success. blog delete", ...blog },
			{ status: 200 }
		);

		// return generateSuccessMessage({ category }, 200);
	} catch (error: any) {
		return NextResponse.json(
			{ message: "error. blog delete", error },
			{ status: 500 }
		);
		// return generateErrorMessage({ error }, 500);
	} finally {
		await prisma.$disconnect();
	}
};
