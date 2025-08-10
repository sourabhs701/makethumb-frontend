import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2 bg-background">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="/" className="flex items-center gap-2 font-medium">
                        <img src="/logo.png" className="size-8" />
                        Makethumb
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
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
