import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
export const buttonStyles = cva(["transition-colors"],{
    variants:{
        variant:{
            default:["bg-gray-200","hover:bg-gray-300"],
            ghost:["hover:bg-gray-100"],
            dark:["bg-black text-white"]
        },
        size:{
            default:["rounded","p-2"],
            icon:[
                "rounded-full",
                "w-10",
                "h-10",
                "flex",
                "items-center",
                "justify-center",
                "p-2.5",
            ]
        }
    },
    defaultVariants:{
        variant:"default",
        size:"default"
    }
})
type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">
export function Button({variant="default",size="default",className,...props}:ButtonProps){
    return <button {...props}className={twMerge(buttonStyles({variant,size}),className)}/>
}