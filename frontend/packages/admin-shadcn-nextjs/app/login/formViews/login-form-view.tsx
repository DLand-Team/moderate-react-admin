"use client";
import { FieldText } from "@/components/hookForm/field-text";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { emit, useFlat } from "@/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
	username: z
		.string()
		.min(2, { message: "Username must be at least 2 characters long!" }),
	password: z.string().min(1, {
		message: "Password is required.",
	}),
});

export function LoginFormView({
	className,
	...props
}: React.ComponentProps<"form">) {
	const { captchaAct, getIdByNameAct, loginAct } = useFlat("authStore");
	const form = useForm<{ username: string; password: string }>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = form.handleSubmit(async () => {
		const values = form.getValues();
		try {
			await captchaAct();
			await getIdByNameAct({
				tenantName: "芋道源码",
			});
			loginAct({
				username: values.username,
				password: values.password,
			});
		} catch (error) {
			console.log("Login error:", error);
		}
	});

	return (
		<Form {...form}>
			<form
				className={cn("flex flex-col gap-6", className)}
				{...props}
				onSubmit={onSubmit}
			>
				<div className="flex flex-col items-center gap-2 text-center">
					<h1 className="text-2xl font-bold">
						Login to your account
					</h1>
					<p className="text-muted-foreground text-sm text-balance">
						Enter your email below to login to your account
					</p>
				</div>
				<div className="grid gap-6">
					<div className="grid gap-3">
						<FieldText
							label="User name"
							name="username"
							form={form}
							placeholder={"m@example.com"}
						></FieldText>
					</div>
					<div className="grid gap-3">
						<FieldText
							label={() => {
								return (
									<div
										className="flex items-center"
										style={{
											width: "100%",
										}}
									>
										<Label htmlFor="password">
											Password
										</Label>
										<a
											onClick={() => {
												// emit(
												// 	"authStore"
												// ).setCurrentViewId(
												// 	"ForgetPassword"
												// );
											}}
											href="#"
											className="ml-auto text-sm underline-offset-4 hover:underline"
										>
											Forgot your password?
										</a>
									</div>
								);
							}}
							type={"password"}
							name="password"
							form={form}
							placeholder={"****"}
						></FieldText>
					</div>
					<Button type="submit" className="w-full">
						Login
					</Button>
				</div>
				<div className="text-center text-sm">
					Don&apos;t have an account?{" "}
					<a
						onClick={() => {
							// emit("authStore").setCurrentViewId("SignUp");
						}}
						href="#"
						className="underline underline-offset-4"
					>
						Sign up
					</a>
				</div>
			</form>
		</Form>
	);
}
