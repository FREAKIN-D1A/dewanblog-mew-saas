"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { apiUrl } from "@/lib/config";
import { fetchCategories } from "@/lib/stuff";
import { useSession } from "next-auth/react";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function NewBLogPage() {
	const { data: session } = useSession();
	const router = useRouter();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [location, setLocation] = useState("");
	const [image, setImage] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [categoryId, setCategoryId] = useState("");

	// let categories = [];
	const [categories, setCategories] = useState([]);

	const handleImageChange = async (e) => {
		const file = e.target.files[0];

		if (file) {
			console.log(file);
			// setLoading(true);
			const formData = new FormData();
			formData.append("file", file);
			// formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

			console.log("FormData.file: ---------->");
			console.log(formData.get("file"));

			// upload to cloudinary
			try {
				const response = await fetch(`${apiUrl}/blogs/upload-img`, {
					method: "POST",
					body: formData,
				});

				// setLoading(false);
				const data = await response.json();
				console.log("image upload response >>>>\n ", data.url);
				setImageUrl(data.url);
			} catch (err) {
				// setLoading(false);
				console.log(err);
			}
		}
	};

	// submit to create blog api
	const handleSubmit = async (e) => {
		const postData = JSON.stringify({
			title: title,
			description: content,
			location: location,
			userId: session?.user.id,
			imageUrl: imageUrl,
			categoryId: categoryId,
			// imageFile: imageFile,
		});

		// console.log("first post data");
		// console.log(postData);

		const formData = new FormData();
		formData.append("postData", postData);

		console.log(`${apiUrl}/blogs`);
		const response = await fetch(`${apiUrl}/blogs`, {
			method: "POST",
			body: formData,
		});

		// if (response.ok) {
		const data = await response.json();
		console.log("=================================");
		console.log("response data => ");
		console.log(data);
		console.log("=================================");

		router.push(`/`);

		// router.push("");
		// } else {
		// 	const errorData = await response.json();

		// 	console.log("=================================");
		// 	console.log("errorData data => ");
		// 	console.log(errorData);
		// 	console.log("=================================");
		// }

		// console.log(err);
		// toast.error("An error occurred. Try again.");
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedCategories = await fetchCategories();
				// categories = fetchedCategories;
				setCategories(fetchedCategories);

				console.log("=================================");
				console.log(fetchedCategories);
				console.log("fetchedCategories data => ", categories.length);
				console.log("=================================");
			} catch (error) {
				console.error("Error fetching categories:", error.message);
				// Handle error (display error message, etc.)
			}
		};

		fetchData();
	}, []);

	return (
		<div className='container mx-auto mt-8'>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}>
				<div className='mb-4'>
					<label
						htmlFor='title'
						className='block text-sm font-medium text-gray-600'>
						Title
					</label>
					<input
						type='text'
						id='title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='mt-1 p-2 w-full border rounded-md'
						placeholder='Enter the title of your blog'
					/>
				</div>

				<div className='mb-4'>
					<label
						htmlFor='location'
						className='block text-sm font-medium text-gray-600'>
						Location
					</label>
					<input
						type='text'
						id='location'
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						className='mt-1 p-2 w-full border rounded-md'
						placeholder='Enter the location of your blog'
					/>
				</div>

				<div className='mb-4'>
					<label
						htmlFor='category'
						className='block text-sm font-medium text-gray-600'>
						Category
					</label>
					{categories.length == 0 ? null : (
						<select
							onChange={(event) => {
								setCategoryId(event.target.value);
								console.log("User Selected Value - ", event.target.value);
							}}
							id='category'
							className='mt-1 p-2 border rounded-md'>
							{Array.isArray(categories) &&
								categories.map((item) => (
									<option key={item.id} value={item.id}>
										{item?.name}
									</option>
								))}
						</select>
					)}

					{/* {JSON.stringify(categories)} */}
				</div>

				<div className='mb-4'>
					<label
						htmlFor='content'
						className='block text-sm font-medium text-gray-600'>
						Content
					</label>
					<ReactQuill
						className='min-h-fit border rounded-md block'
						value={content}
						id='content'
						onChange={(e) => setContent(e)}
					/>
				</div>

				<div className='flex flex-col justify-between'>
					{imageUrl ? (
						<img
							src={imageUrl}
							alt='preview image'
							className='w-[500px] mt-3'
						/>
					) : null}
					<div>
						<label className='btn btn-outline-secondary cursor-pointer'>
							{/* {loading ? "Uploading..." : "Upload image"} */}
							Upload image
						</label>
						<input
							type='file'
							accept='image/*'
							onChange={handleImageChange}
							className='block'
							// hidden
						/>
					</div>
				</div>

				<button
					type='submit'
					className='w-full my-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'>
					Submit
				</button>
			</form>
		</div>
	);
}
