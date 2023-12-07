import { NextApiRequest, NextApiResponse } from "next";

function corsMiddleware(handler: any) {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const origin = req.headers.origin ?? "*";
		const allowedMethods = [
			"GET",
			"HEAD",
			"OPTIONS",
			"PUT",
			"PATCH",
			"POST",
			"DELETE",
		];
		const allowedHeaders = [
			"Content-Type",
			"Authorization",
			"Origin",
			"Accept",
		];

		res.setHeader("Access-Control-Allow-Origin", origin);
		res.setHeader("Access-Control-Allow-Methods", allowedMethods.join(","));
		res.setHeader("Access-Control-Allow-Headers", allowedHeaders.join(","));

		if (req.method === "OPTIONS") {
			return res.status(200).send("OK");
		}

		return handler(req, res);
	};
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Your API logic here...
	res.status(200).json({ message: "Hello, world! from middleware." });
}

export const config = {
	api: {
		middlewares: [corsMiddleware],
	},
	matcher: `/api:path*`,
};
