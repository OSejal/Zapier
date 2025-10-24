import { ReactNode } from "react"

export const LinkButton = ({ children, onClick }:{children: ReactNode, onClick: () => void}) => {
    return <div className="py-2 px-2 cursor-pointer hover:bg-slate-100 font-light text-sm" onClick={onClick}>
        {children}
    </div>
}