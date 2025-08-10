import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="/" className="flex items-center gap-2 font-medium">
                        <div className=" text-primary-foreground flex size-8 items-center justify-center rounded-md">
                            <img src="/logo.png" className="size-8 " />
                        </div>
                        Makethumb
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignupForm />
                    </div>
                </div>
            </div>
            <div className=" relative hidden lg:block">
                <img
                    src="/auth-image.jpg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover rounded-l-4xl"
                />
            </div>
        </div>
    )
}
