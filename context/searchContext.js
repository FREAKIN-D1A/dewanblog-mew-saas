"use client";
import { createContext, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/lib/config";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const router = useRouter();

	const fetchSearchResults = async (e) => {
		e.preventDefault();

		// console.log("searchQuery +=+=+=+==+>>>");
		// console.log(searchQuery);

		try {
			const response = await fetch(
				`${apiUrl}/search?searchQuery=${searchQuery}`
			);
			if (!response.ok) {
				throw new Error("Failed to fetch search results");
			}
			const data = await response.json();

			console.log(" data = await response.json();\ndata.blogs; +=+=+=+==+>>>");
			console.log(data.blogs);

			setSearchResults(data.blogs);
			router.push(`/search?searchQuery=${searchQuery}`);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<SearchContext.Provider
			value={{
				searchQuery,
				setSearchQuery,
				searchResults,
				setSearchResults,
				fetchSearchResults,
			}}>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearch = () => useContext(SearchContext);
