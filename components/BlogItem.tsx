//@ts-nocheck
// "use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiUrl } from "@/lib/config";

const BlogItem = ({ title, description, imageUrl, id, byCurrentUser }) => {
	// const router = useRouter();

	// const handleViewMore = () => {
	// 	// Redirect to the detailed view of the blog or any other desired action
	// 	router.push(`/blogs/${id}`);
	// };

	// console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<");
	// console.log("byCurrentUser  ======>>\n", byCurrentUser);
	// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");

	// useEffect(() => {
	// 	first;

	// 	return () => {
	// 		second;
	// 	};
	// }, [third]);

	return (
		<div className='rounded overflow-hidden shadow-lg m-4 relative transition-transform transform hover:scale-105 min-h-[380px] w-[350px]'>
			<img className='w-full h-40 object-cover' src={imageUrl} alt={title} />

			<div className='px-6 py-7 min-h-fit'>
				<div className='font-bold text-xl mb-2'>{title}</div>
				<p className='text-gray-700 text-base'>{stripHtmlTags(description)}</p>
			</div>

			{byCurrentUser ? (
				<>
					<Link
						className='absolute bottom-2 left-3 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 my-3'
						href={`./blogs/edit/${id}`}>
						Edit Blog
					</Link>
					{/* 
					<button onClick={handleDelelte}>Delete</button> */}
				</>
			) : null}
			<Link
				className='absolute bottom-2 right-3 px-5  py-2 bg-blue-500 text-white rounded hover:bg-blue-600 my-3'
				href={`./blogs/${id}`}>
				View More
			</Link>
		</div>
	);
};

// const stripHtmlTags = (htmlString, maxLength = 65) => {
// 	// Remove HTML tags using a regular expression
// 	let textContent = htmlString.replace(/<[^>]*>/g, "");

// 	// Trim the textContent to the specified maxLength
// 	if (textContent.length > maxLength) {
// 		textContent = textContent.substring(0, maxLength) + "...";
// 	}

// 	return textContent;
// };

const stripHtmlTags = (htmlString, maxLength = 60) => {
	// Remove HTML tags using a regular expression
	let textContent = htmlString.replace(/<[^>]*>/g, "");

	// Trim the textContent to the specified maxLength
	textContent = textContent.substring(0, maxLength) + "...";

	return textContent;
};

export default BlogItem;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Helper function to strip HTML tags from the description
// const stripHtmlTags = (htmlString) => {
// 	const doc = new DOMParser().parseFromString(htmlString, "text/html");
// 	return doc.body.textContent || "";
// };
