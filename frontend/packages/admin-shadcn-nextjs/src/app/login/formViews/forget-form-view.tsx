"use client";
import { FieldText } from "@/src/shadcn/components/hookForm/field-text";
import { Button } from "@/src/shadcn/components/ui/button";
import { Form } from "@/src/shadcn/components/ui/form";
import { cn } from "@/src/shadcn/lib/utils";
import { emit } from "src/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});

export function ForgetFormView({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
        },
    });
    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("You submitted the following values", {
            description: (
                <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    return (
        <Form {...form}>
            <form className={cn("flex flex-col gap-6", className)} {...props}>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Forgot password?</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your email address and we’ll send you a link to
                        reset your password.
                    </p>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <FieldText
                            required={true}
                            label="Email"
                            type={"email"}
                            name="email"
                            form={form}
                            placeholder={"m@example.com"}></FieldText>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        onClick={() => {
                            emit("authStore").setCurrentViewId(
                                "ForgetPasswordCheckCode"
                            );
                        }}>
                        Send code
                    </Button>
                </div>
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a
                        onClick={() => {
                            emit("authStore").setCurrentViewId("SignUp");
                        }}
                        className="underline underline-offset-4">
                        Sign up
                    </a>
                </div>
            </form>
        </Form>
    );
}
