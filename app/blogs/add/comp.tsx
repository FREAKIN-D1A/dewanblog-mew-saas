// // @ts-nocheck
// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// // import toast from "react-hot-toast";
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import "react-quill/dist/quill.snow.css";

// import { apiUrl } from "@/lib/config";
// import { fetchCategories } from "@/lib/stuff";
// import { useSession } from "next-auth/react";

// export default function AdminBlogCreate() {
// 	let categories = [];
// 	const [title, setTitle] = useState("");
// 	const [content, setContent] = useState("");
// 	const [location, setLocation] = useState("");
// 	const [categoryId, setCategoryId] = useState("");
// 	const [image, setImage] = useState("");
// 	const [loading, setLoading] = useState(false);

// 	const router = useRouter();

// 	const { data: session } = useSession();

// 	const [imageUrl, setImageUrl] = useState("");
// 	const [imageFile, setImageFile] = useState(null);

// 	// image upload to cloudinary
// 	const handleImageChange = async (e) => {
// 		const file = e.target.files[0];

// 		if (file) {
// 			// setLoading(true);
// 			const formData = new FormData();
// 			formData.append("file", file);
// 			formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

// 			// upload to cloudinary
// 			try {
// 				const response = await fetch(process.env.CLOUDINARY_URL, {
// 					method: "POST",
// 					body: formData,
// 				});
// 				if (response.ok) {
// 					// setLoading(false);
// 					const data = await response.json();
// 					console.log("image upload response => ", data);
// 					setImageUrl(data.secure_url);
// 				}
// 			} catch (err) {
// 				setLoading(false);
// 				console.log(err);
// 			}
// 		}
// 	};

// 	// submit to create blog api
// 	const handleSubmit = async (e) => {
// 		const postData = JSON.stringify({
// 			title: title,
// 			description: content,
// 			location: location,
// 			userId: session?.user.id,
// 			categoryId: categoryId,
// 			imageUrl: imageUrl,
// 			// imageFile: imageFile,
// 		});
// 		console.log("first post data => ", postData);

// 		// const formData = new FormData();
// 		// formData.append("postData", postData);
// 		// console.log("Form Data:\n", formData.get("postData"));

// 		// 	try {
// 		// 		const response = await fetch(`${process.env.API}/blogs`, {
// 		// 			method: "POST",
// 		// 			headers: {
// 		// 				"Content-Type": "application/json",
// 		// 			},
// 		// 			body: postData,
// 		// 		});

// 		// 		if (response.ok) {
// 		// 			// router.push("/dashboard/admin");
// 		// 			// toast.success("Blog created successfully");
// 		// 		} else {
// 		// 			const errorData = await response.json();
// 		// 			// toast.error(errorData.err);
// 		// 		}
// 		// 	} catch (err) {
// 		// 		console.log(err);
// 		// 		toast.error("An error occurred. Try again.");
// 		// 	}
// 		};
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       setLoading(true);  // Set loading to true when starting the fetch

//       const fetchedCategories = await fetchCategories();
//       console.log(fetchedCategories);

//       // Update the categories state
//       setCategories(fetchedCategories);
//     } catch (error) {
//       console.error('Error fetching categories:', error.message);
//       // Handle error (display error message, etc.)
//     } finally {
//       setLoading(false);  // Set loading to false whether fetch is successful or not
//     }
//   };

//   fetchData();
// }, []); // Emp array ensures the effect runs only once after the

// 		return (
// 			<>
// 				<div className='container mx-auto mb-5'>
// 					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
// 						<div>
// 							<p className='text-2xl font-bold mb-3'>Create Blog</p>
// 							<label className='text-gray-600'>Blog title</label>
// 							<input
// 								type='text'
// 								value={title}
// 								onChange={(e) => setTitle(e.target.value)}
// 								className='form-input p-2 my-2 border rounded-md'
// 							/>

// 							<label className='text-gray-600 mt-3'>Blog content</label>
// 							<ReactQuill
// 								className='border rounded my-2'
// 								value={content}
// 								onChange={(e) => setContent(e)}
// 							/>

// 							<label className='text-gray-600 mt-3'>Blog category</label>
// 							{categories.length > 0 ? null : (
// 								<select
// 									onChange={(event) => {
// 										setCategoryId(event.target.value);
// 										console.log("User Selected Value - ", event.target.value);
// 									}}
// 									id='1'
// 									className='mt-1 p-2 border rounded-md'>
// 									{Array.isArray(categories) &&
// 										categories.map((item) => (
// 											<option key={item.id} value={item.id}>
// 												{item?.name}
// 											</option>
// 										))}
// 								</select>
// 							)}

// 							{imageUrl && (
// 								<img src={imageUrl} alt='preview image' className='w-24 mt-3' />
// 							)}
// 						</div>

// 						<div className='flex flex-col justify-between'>
// 							<div>
// 								<label className='btn btn-outline-secondary cursor-pointer'>
// 									{loading ? "Uploading..." : "Upload image"}
// 									<input
// 										type='file'
// 										accept='image/*'
// 										onChange={handleImageChange}
// 										hidden
// 									/>
// 								</label>
// 							</div>

// 							<div className='mt-3'>
// 								<button
// 									className='btn bg-primary text-white'
// 									disabled={loading}
// 									onClick={handleSubmit}>
// 									Save
// 								</button>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</>
// 		);
// 	};
// }
