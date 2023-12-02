"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/context/searchContext";
import { apiUrl } from "@/lib/config";
import BlogItem from "@/components/BlogItem";
import { useSession } from "next-auth/react";
// import BlogList from "@/components/blogs/BlogList";

export default function SearchPage() {
	const { data, status, update } = useSession();

	const { setSearchQuery, searchResults, setSearchResults } = useSearch();
	const [loading, setloading] = useState(true);

	const searchParams = useSearchParams();
	const query = searchParams.get("searchQuery");

	useEffect(() => {
		fetchResultsOnLoad();
		setloading(false);
	}, [query]);

	const fetchResultsOnLoad = async () => {
		try {
			const response = await fetch(`${apiUrl}/search?searchQuery=${query}`);
			if (!response.ok) {
				throw new Error("Failed to fetch search results");
			}
			const data = await response.json();

			console.log("data.blogs  =======>>>\n", data.blogs);
			setSearchResults(data.blogs);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className='container'>
				<div className='row'>
					<div className='col'>
						{loading ? (
							<div>Loading...</div>
						) : (
							<div>
								<h1 className='text-center text-2xl'>
									{/* {JSON.stringify(searchResults)} */}
									Search result found : {searchResults.length} blogs
								</h1>
								<div className='flex w-full flex-wrap justify-center'>
									{searchResults &&
										searchResults
											.sort(
												(a, b) =>
													Number(new Date(b.createdAt)) -
													Number(new Date(a.createdAt))
											)
											.slice(0, 6)
											.map((blog: any) => {
												blog.byCurrentUser = blog.userId === data?.user.id;
												return <BlogItem {...blog} key={blog.id} />;
											})}
								</div>

								{/* {searchResults ? <BlogList blogs={searchResults} /> : ""} */}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
