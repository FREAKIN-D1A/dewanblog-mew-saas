//@ts-nocheck
//@ts-nocheck
"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const signInWithCreds = async (data: { email: string; password: string }) => {
		try {
			await signIn("credentials", { ...data });
		} catch (error) {
			console.error("Error during login:", error);
			// Handle error (display error message, etc.)
		}
	};

	const thirdPartySignIn = async (signInType: "google" | "github") => {
		try {
			await signIn(signInType);
		} catch (error) {
			console.error("Error during login:", error);
			// Handle error (display error message, etc.)
		}
	};

	return (
		<div className='min-h-screen flex my-5 justify-center'>
			<div className='w-full max-w-md p-4 bg-white shadow-md rounded-md'>
				<h2 className='text-2xl font-semibold mb-4'>Login</h2>

				{
					<form onSubmit={handleSubmit(signInWithCreds)}>
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
							Log In
						</button>
					</form>
				}

				<div className='mt-4'>
					<button
						onClick={async () => thirdPartySignIn("google")}
						className='w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600'>
						Log In with Google
					</button>
				</div>

				<div className='mt-4'>
					<button
						onClick={async () => thirdPartySignIn("github")}
						className='w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-900'>
						Log In with GitHub
					</button>
				</div>
			</div>
		</div>
	);
}
