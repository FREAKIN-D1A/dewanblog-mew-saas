//@ts-nocheck
import { connectToDb } from "@/lib/helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
	const { name, email, password } = await req.json();
	if (!email || !password || !name) {
		return NextResponse.json({ message: "Invalid data" }, { status: 422 });
	}

	try {
		await connectToDb();
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: { name, email, password: hashedPassword },
		});

		return NextResponse.json(
			{ message: "User Successfully created", ...user },
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ message: "User not created. server error", ...error },
			{ status: 201 }
		);
	} finally {
		await prisma.$disconnect();
	}
};
