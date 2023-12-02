//@ts-nocheck
import { connectToDb } from "@/lib/helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		await connectToDb();
		const users = await prisma.user.findMany();
		return NextResponse.json(
			{ message: "success. all users get", users },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "error. all users get", error },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
};
