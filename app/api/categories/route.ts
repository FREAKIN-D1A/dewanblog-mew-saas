import {
	connectToDb,
	generateErrorMessage,
	generateSuccessMessage,
} from "@/lib/helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		await connectToDb();
		const categories = await prisma.category.findMany();
		return NextResponse.json(
			{ message: "success. all categories get", categories },
			{ status: 200 }
		);

		// return generateSuccessMessage({ categories }, 200);
	} catch (error: any) {
		return NextResponse.json(
			{ message: "error. all categories get", ...error },
			{ status: 500 }
		);

		// return generateErrorMessage({ error }, 500);
	} finally {
		await prisma.$disconnect();
	}
};

export const POST = async (req: Request) => {
	try {
		const { name } = await req.json();
		await connectToDb();
		const category = await prisma.category.create({ data: { name } });
		return NextResponse.json(
			{ message: "success. categories POST", ...category },
			{ status: 200 }
		);

		// return generateSuccessMessage({ category }, 200);
	} catch (error: any) {
		return NextResponse.json(
			{ message: "error. categories POST", ...error },
			{ status: 500 }
		);

		// return generateErrorMessage({ error }, 500);
	} finally {
		await prisma.$disconnect();
	}
};
