//@ts-nocheck
"use client";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Register() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const signUpWithCreds = async (data: { email: string; password: string }) => {
		try {
			const apiUrl =
				process.env.NODE_ENV === "production"
					? process.env.NEXT_PUBLIC_PRUDUCTION_API_URL
					: process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL;

			const response = await fetch(`${apiUrl}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...data }),
			});

			if (response.ok) {
				// After successful registration, redirect the user to the login page
				router.push("/login");
				console.log("Registration data:", data);
			} else {
				// Handle registration failure (display error message, etc.)
				console.error("Error during registration:", response.statusText);
			}
		} catch (error) {
			console.error("Error during registration:", error);
			// Handle error (display error message, etc.)
		}
	};
	const thirdPartySignIn = async (signInType: "google" | "github") => {
		try {
			await signIn(signInType);
		} catch (error) {
			console.error("Error during registration:", error);
			// Handle error (display error message, etc.)
		}
	};

	return (
		<div className='min-h-screen flex my-5 justify-center'>
			<div className='w-full max-w-md p-4 bg-white shadow-md rounded-md'>
				<h2 className='text-2xl font-semibold mb-4'>Register</h2>

				<form onSubmit={handleSubmit(signUpWithCreds)}>
					<div className='mb-4'>
						<label
							htmlFor='name'
							className='block text-sm font-medium text-gray-600'>
							Name
						</label>
						<input
							type='text'
							id='name'
							{...register("name", { required: "Name is required" })}
							className='mt-1 p-2 w-full border rounded-md'
						/>
						{errors.name && (
							<span className='text-red-500 text-sm'>
								{errors.name.message as string}
							</span>
						)}
					</div>

					<div className='mb-4'>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-gray-600'>
							Email
						</label>
						<input
							type='email'
							id='email'
							{...register("email", { required: "Email is required" })}
							className='mt-1 p-2 w-full border rounded-md'
						/>
						{errors.email && (
							<span className='text-red-500 text-sm'>
								{errors.email.message as string}
							</span>
						)}
					</div>

					<div className='mb-4'>
						<label
							htmlFor='password'
							className='block text-sm font-medium text-gray-600'>
							Password
						</label>
						<input
							type='password'
							id='password'
							{...register("password", { required: "Password is required" })}
							className='mt-1 p-2 w-full border rounded-md'
						/>
						{errors.password && (
							<span className='text-red-500 text-sm'>
								{errors.password.message as string}
							</span>
						)}
					</div>

					<button
						type='submit'
						className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'>
						Register
					</button>
				</form>

				<div className='mt-4'>
					<button
						onClick={() => thirdPartySignIn("google")}
						className='w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600'>
						Register with Google
					</button>
				</div>

				<div className='mt-4'>
					<button
						onClick={() => thirdPartySignIn("github")}
						className='w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-900'>
						Register with GitHub
					</button>
				</div>
			</div>
		</div>
	);
}
