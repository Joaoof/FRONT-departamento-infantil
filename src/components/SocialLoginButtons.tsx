// components/SocialLoginButtons.tsx
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function SocialLoginButtons() {
    return (
        <div className="mt-6 grid grid-cols-3 gap-3">
            <Button
                type="button"
                variant="outline"
                className="w-full"
            >
                <Image
                    src="/placeholder.svg?text=G&height=20&width=20"
                    alt="Google"
                    width={20}
                    height={20}
                />
            </Button>
            <Button
                type="button"
                variant="outline"
                className="w-full"
            >
                <Image
                    src="/placeholder.svg?text=F&height=20&width=20"
                    alt="Facebook"
                    width={20}
                    height={20}
                />
            </Button>
            <Button
                type="button"
                variant="outline"
                className="w-full"
            >
                <Image
                    src="/placeholder.svg?text=T&height=20&width=20"
                    alt="Twitter"
                    width={20}
                    height={20}
                />
            </Button>
        </div>
    )
}