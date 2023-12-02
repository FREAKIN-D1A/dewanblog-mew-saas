import { getBLogById } from "@/lib/helpers";
import prisma from "@/prisma";

const BlogPage = async ({ params }) => {
	const blog = await getBLogById(params.id);
	console.log(blog);

	const category = await prisma.category.findFirst({
		where: { id: blog.categoryId },
	});

	return (
		<div className='container mx-auto mt-8'>
			{/* {JSON.stringify(blog)} */}
			<div className='max-w-2xl mx-auto'>
				<img
					src={blog.imageUrl || "/placeholder-image.jpg"} // Use a placeholder image if imageUrl is not available
					alt={blog.title}
					className='w-full h-64 object-cover mb-4'
				/>
				<h1 className='text-3xl font-bold mb-2'>{blog.title}</h1>
				<div dangerouslySetInnerHTML={{ __html: blog.description }} />
				<div className='flex items-center justify-between'>
					<div>
						<p className='text-gray-700'>
							Category: {category ? `${category.name}` : "Uncategorized"}
						</p>
						<p className='text-gray-700'>Location: {blog.location || "N/A"}</p>
					</div>
					<p className='text-gray-500'>
						Published on: {new Date(blog.createdAt).toLocaleDateString()}
					</p>
				</div>
				{/* Add more details as needed */}
			</div>
		</div>
	);
};

export default BlogPage;
