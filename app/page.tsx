
import HomeSection from "@/components/HomeSection";

export default function Home() {


	return (
		<main>
			{/* Hellow World
			<div> {JSON.stringify(data)}</div>
			<div> {JSON.stringify(status)}</div> */}
			<HomeSection />
		</main>
	);
}

// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/route";

// export default async function Home() {
// 	const data = await getServerSession(authOptions);
// 	return (
// 		<main>
// 			Hellow World
// 			<div> {JSON.stringify(data)}</div>
// 		</main>
// 	);
// }
