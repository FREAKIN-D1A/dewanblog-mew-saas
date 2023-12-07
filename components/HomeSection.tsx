//@ts-nocheck
"use client";
import { getAllBlogs } from "@/lib/helpers";
import Image from "next/image";
import BlogItem from "./BlogItem";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HomeSection() {
	// const blogs = await getAllBlogs(6);

	const { data, status, update } = useSession();

	// console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<");
	// console.log("session  ======>\n", data?.user.id);
	// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");

	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		const fetchBlogs = async () => {
			const fetchedBlogs = await getAllBlogs();
			setBlogs(fetchedBlogs);

			// console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<");
			// console.log("fetchedBlogs ======>\n", fetchedBlogs);
			// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");
		};

		fetchBlogs();
	}, []);

	return (
		<section className='bg-white bg-opacity-90 text-gray-800 py-16'>
			<div className='container mx-auto text-center flex flex-row justify-center items-center '>
				{/* <Image
					src={
						"https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg?w=1380&t=st=1700922551~exp=1700923151~hmac=211b9c9d15076a6cb9e011ec554dc6f6b20736484d457172b02648b6f4b0120d"
					}
					alt='Welcome Image'
					width={800}
					height={800}
					objectFit='cover'
					className='rounded-md mb-8'
				/> */}
				<div className='m-4'>
					{data?.user.name ? (
						<h1 className='text-xl font-bold leading-tight mb-4'>
							Howdy, {data?.user.name}
						</h1>
					) : null}
					<h1 className='text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4'>
						Welcome to DBlog
					</h1>
					<p className='text-base md:text-lg lg:text-xl'>
						Share your thoughts....
						<br />
						Register or Login to write a new blog.
					</p>
				</div>
			</div>
			<hr className='p-2 m-4' />

			<div className='flex flex-col justify-center items-center'>
				<div className='p-4'>
					<h2 className='text-2xl font-semibold'> Recent Articles </h2>
				</div>
				<div className='flex w-full flex-wrap justify-center'>
					{/* {JSON.stringify(blogs)} */}

					{blogs &&
						blogs
							.sort(
								(a, b) =>
									Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
							)
							.slice(0, 7)
							.map((blog: any) => {
								blog.byCurrentUser = blog.userId === data?.user.id;
								return <BlogItem {...blog} key={blog.id} />;
							})}
				</div>
			</div>

			<div className='w-full p-4 text-center'>
				<Link
					href='/blogs'
					className='mx-auto mt-auto border-[1px] p-3 bg-white rounded-lg hover:bg-violet-600 hover:text-white duration-500 font-semibold'>
					Explore More Articles.
				</Link>
			</div>

			<hr className='p-2 m-4' />
		</section>
	);
}
