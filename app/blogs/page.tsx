//@ts-nocheck
//@ts-nocheck
import BlogItem from "@/components/BlogItem";
import { getAllBlogs } from "@/lib/helpers";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/authOptionsFile";
// import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function page() {
	const data = await getServerSession(authOptions);
	const blogs = await getAllBlogs();

	console.log("\n\n\n\n<<<<<<<<<<<<<<<<<<<<<<<<<<");
	console.log("data  ======>>\n", data);
	console.log("data  data?.user.id; ======>>\n", data?.user.id);
	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>\n\n\n\n");

	return (
		<section>
			<div className='flex flex-col justify-center items-center'>
				<div className='p-4'>
					<h2 className='text-2xl font-semibold'> Blog Articles</h2>
				</div>
				<div className='flex w-full flex-wrap justify-center'>
					{/* {JSON.stringify(blogs)} */}

					{blogs &&
						blogs
							.sort(
								(a: any, b: any) =>
									Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
							)
							.map((blog: any) => {
								blog.byCurrentUser = blog.userId === data?.user.id;
								return <BlogItem {...blog} key={blog.id} />;
							})}
				</div>
			</div>
		</section>
	);
}
