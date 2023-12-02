//@ts-nocheck
export const apiUrl =
	process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
		? process.env.NEXT_PUBLIC_PRUDUCTION_API_URL
		: process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL;
