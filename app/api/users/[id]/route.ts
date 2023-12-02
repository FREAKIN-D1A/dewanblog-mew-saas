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
		const user = await prisma.user.findFirst({
			where: { id: id },
			include: { _count: true, blogs: true },
		});
		return NextResponse.json(
			{ message: "success. all users get", user },
			{ status: 200 }
		);

		// return generateSuccessMessage({ ...user }, 200);
	} catch (error: any) {
		return NextResponse.json(
			{ message: "error. all users get", error },
			{ status: 500 }
		);

		// return generateErrorMessage({ ...error }, 500);
	} finally {
		await prisma.$disconnect();
	}
};
