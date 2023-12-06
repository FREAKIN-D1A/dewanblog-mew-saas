// @ts-nocheck
import { apiUrl } from "./config";

export const fetchCategories = async () => {
	try {
		const response = await fetch(`${apiUrl}/categories/`);
		if (!response.ok) {
			throw new Error("Failed to fetch categories");
		}

		const data = await response.json();

		return Array.isArray(data.categories) ? data.categories : [];
	} catch (error) {
		console.error("Error fetching categories:", error.message);
		// Handle error (display error message, etc.)
		return [];
	}
};

// export const categories = await fetchCategories();
