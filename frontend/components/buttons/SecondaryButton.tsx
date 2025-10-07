import { ReactNode } from "react"

export const SecondaryButton = ({children, onClick, size = "small"}: {
    children: ReactNode,
    onClick: () => void,
    size?: "big" | "small"
}) => {
    return <div onClick={ onClick } className={`${size === "small" ? "text-sm": "text-xl"} ${size === "small" ? "px-8 pt-2": "px-10 py-2"} cursor-pointer border border-black hover:shadow-md text-black
    rounded-full`}>
        {children}
    </div>
}