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
		const category = await prisma.category.findFirst({
			where: { id },
			include: {
				_count: true,
				blogs: true,
			},
		});
		return NextResponse.json(
			{ message: "success. category get", ...category },
			{ status: 200 }
		);

		// return generateSuccessMessage({ category }, 200);
	} catch (error: any) {
		return NextResponse.json(
			{ message: "error. category get", error },
			{ status: 500 }
		);
		// return generateErrorMessage({ error }, 500);
	} finally {
		await prisma.$disconnect();
	}
};
