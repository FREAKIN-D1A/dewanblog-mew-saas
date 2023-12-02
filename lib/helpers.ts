//@ts-nocheck
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { apiUrl } from "./config";

export const connectToDb = async () => {
	try {
		prisma.$connect();
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getAllBlogs = async (count?: number) => {
	const res = await fetch(`${apiUrl}/blogs`, {
		cache: "no-store",
	});
	const data = await res.json();
	if (count) {
		return data.blogs.slice(0, count);
	}
	// console.log(data.blogs);
	return data.blogs;
};

export const getBLogById = async (id?: string) => {
	const res = await fetch(`${apiUrl}/blogs/${id}`, {
		cache: "no-store",
	});
	const data = await res.json();
	return data.blog;
};

export const getCategoryById = async (id?: string) => {
	const res = await fetch(`${apiUrl}/categories/${id}`, {
		cache: "no-store",
	});
	const data = await res.json();

	console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<");
	console.log("data  ======>>\n", data);
	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");

	return data;
};

export const generateSuccessMessage = (data: any, status: number) => {
	return NextResponse.json(
		{ message: "Success", ...data },
		{ status, statusText: "OK" }
	);
};

export const generateErrorMessage = (error: any, status: number) => {
	return NextResponse.json(
		{ message: "Error", ...error },
		{ status, statusText: "Error" }
	);
};

export const verifyUserDetails = async (user: DefaultUser) => {
	await connectToDb();
	const doesUserExist = prisma.user.findFirst({
		where: { email: user.email as string },
	});

	if (doesUserExist) {
		return null;
	} else {
		const newUser = await prisma.user.create({
			data: { email: user.email as string, name: user.name as string },
		});
		return newUser;
	}
};
