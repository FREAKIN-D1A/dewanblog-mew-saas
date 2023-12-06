//@ts-nocheck
"use client";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Image from "next/image";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { apiUrl } from "@/lib/config";
imp;

import {
	ContentState,
	EditorState,
	convertFromHTML,
	convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useRouter } from "next/navigation";
import { getBLogById, getCategoryById } from "@/lib/helpers";
import { fetchCategories } from "@/lib/stuff";

export default function EditBlogPage({ params: { id } }) {
	// @ts-ignore
	let categories = [];
	const { data: session } = useSession();
	const { register, handleSubmit, setValue, reset } = useForm();
	// const titleRef = useRef();
	const [imageUrl, setImageUrl] = useState("");
	const [imageFile, setImageFile] = useState(null);

	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	// const [categories, setCategories] = useState([]);

	const router = useRouter();

	const [categoryName, setCategoryName] = useState("Education");

	const [loading, setLoading] = useState(true);

	// const handleImageChange = (e) => {
	// 	const file = e.target.files[0];
	// 	if (file) {
	// 		setImageFile(file);
	// 		setImageUrl(URL.createObjectURL(file));
	// 	}
	// };

	const convertEditorDataToHtml = () => {
		return draftToHtml(convertToRaw(editorState.getCurrentContent()));
	};

	const handleEditorStateChange = (e: any) => {
		// e.preventDefault();
		console.log(e);
		setEditorState(e);
	};

	const handleDelelte = async () => {
		try {
			console.log("\n\n\n\n<<<<<<<<<<<<<<<<<<<<<<<<<<");
			console.log("DELETE CLICKED");
			console.log("\n\n\n\n<<<<<<<<<<<<<<<<<<<<<<<<<<");
			console.log("id  ======>>\n", id);
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>\n\n\n\n");

			const res = await fetch(`${apiUrl}/blogs/${id}`, {
				method: "DELETE",
				// body: postData,
				// cache: "no-store",
			});

			if (res.ok) {
				const data = await res.json();

				router.push("/");
			}

			// console.log("\n\n\n\n<<<<<<<<<<<<<<<<<<<<<<<<<<");
			// console.log("data  ======>>\n", data);
			// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>\n\n\n\n");
		} catch (error) {
			console.log(error);
			console.log(error.message);
		}
	};

	const onSubmitFcn = async (data) => {
		// Handle form submission (data.title, data.category, data.location, imageUrl, etc.)

		console.log("Form html:\n", convertEditorDataToHtml());

		// const formData = new FormData();
		const postData = JSON.stringify({
			title: data.title,
			description: convertEditorDataToHtml(),
			location: data.location,
			userId: session?.user.id,
			categoryId: data.category,
			// imageFile: imageFile,
		});

		// formData.append("postData", postData);

		// console.log("Form Data:\n", formData.get("postData"));

		// formData.append("image", data.image[0]);

		// if (imageFile) {
		// 	formData.append("image", imageFile);
		// 	console.log("Form image:\n", imageFile);
		// }

		try {
			const res = await fetch(`${apiUrl}/blogs/${id}`, {
				method: "PUT",
				body: postData,
				cache: "no-store",
			});
			const data = res.json();
			console.log(data);

			router.push(`/`);
		} catch (error) {
			console.log(error);
			console.log(error.message);
		}
	};

	useEffect(async () => {
		const PopulateForm = async () => {
			const blog = await getBLogById(id);
			const category = await getCategoryById(blog.categoryId);
			setCategoryName(category.name);

			const contentBlocks = convertFromHTML(blog.description);
			const contentState = ContentState.createFromBlockArray(
				contentBlocks.contentBlocks
			);
			const initialState = EditorState.createWithContent(contentState);
			setEditorState(initialState);

			// console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<");
			// console.log("categorty  ======>>\n", category.name);
			// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>");

			setImageUrl(blog.imageUrl);

			reset({
				title: blog.title,
				location: blog.location,
				// category: category.name,
			});
		};

		PopulateForm();
		categories = await fetchCategories();
		console.log(categories);

		setLoading(false);
	}, []);

	return (
		<>
			{loading ? (
				<>Loading....</>
			) : (
				<div className='max-w-4xl mx-auto my-8 p-4'>
					<h1 className='text-4xl font-bold mb-4'>
						Welcome, {session?.user?.name}
					</h1>

					<form
						onSubmit={handleSubmit(onSubmitFcn)}
						className='bg-white p-4 shadow-md rounded-md'>
						<div className='mb-4'>
							<label className='block text-sm font-semibold text-gray-600'>
								Title:
							</label>
							<input
								contentEditable
								placeholder='Enter the Title of your blog'
								{...register("title", { required: "Title is required" })}
								// ref={titleRef}
								className='text-xl font-bold p-2 border rounded-md'
							/>
						</div>

						<div className='mb-4'>
							<label className='block text-sm font-semibold text-gray-600'>
								Image:
							</label>
							{/* <input
						type='file'
						accept='image/*'
						// name='image'
						onChange={handleImageChange}
						className='mt-1 p-2 border rounded-md'
						// {...register("image")}
					/> */}
							{imageUrl && (
								<Image
									src={imageUrl}
									alt='Blog Image'
									width={600}
									height={400}
									className='mt-4'
								/>
							)}
						</div>

						<div className='mb-4'>
							<label className='block text-sm font-semibold text-gray-600'>
								Category:
							</label>
							{/* <input
						type='text'
						placeholder='Enter the Category of your blog'
						{...register("category", { required: "Category is required" })}
						className='mt-1 p-2 border rounded-md'
					/> */}
							{/* // @ts-ignore */}
							{
								// @ts-ignore
								categories.length > 0 ? null : (
									<select
										// name='category'
										id='1'
										className='mt-1 p-2 border rounded-md'
										{...register("category", {
											required: "Category is required",
										})}>
										{Array.isArray(categories) &&
											categories.map((item) => (
												<option
													key={item.id}
													value={item.id}
													selected={item.name === categoryName}>
													{item.name}
												</option>
											))}
									</select>
								)
							}
						</div>

						<div className='mb-4'>
							<label className='block text-sm font-semibold text-gray-600'>
								Location:
							</label>
							<input
								type='text'
								placeholder='Enter your Location'
								{...register("location", { required: "Location is required" })}
								className='mt-1 p-2 border rounded-md'
							/>
						</div>

						<div className='mb-4'>
							<label className='block text-sm font-semibold text-gray-600'>
								Content:
							</label>
							<Editor
								editorState={editorState}
								onEditorStateChange={handleEditorStateChange}
								editorStyle={{
									minHeight: "30vh",
									height: "auto",
									border: "1px solid #000",
									padding: "10px",
								}}
								// className='p-2 border rounded-md'
							/>
						</div>

						<button
							type='submit'
							className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'>
							Publish Blog
						</button>
					</form>

					<button
						onClick={handleDelelte}
						className='bg-red-500 text-white mx-[15px] my-3 p-2 rounded-md hover:bg-red-600'>
						Delete Blog
					</button>
				</div>
			)}
		</>
	);
}
