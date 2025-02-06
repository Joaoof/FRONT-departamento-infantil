// components/Illustration.tsx
import Image from "next/image"

export function Illustration() {
    return (
        <div className="hidden lg:flex lg:w-1/2 bg-blue-50 items-center justify-center p-12">
            <div className="relative w-full max-w-lg">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
                <Image
                    src="/crianca.svg"
                    alt="Ilustração de Cadastro"
                    width={400}
                    height={400}
                    className="relative"
                />
            </div>
        </div>
    )
}