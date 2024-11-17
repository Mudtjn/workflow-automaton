import { ReactNode } from "react";

export default function LinkButton(
    {
        children, 
        onClick
    }: 
    {
        children: ReactNode, 
        onClick: () => void
    }
): ReactNode{
    return(
        <div 
            onClick={onClick} 
            className="flex justify-center px-2 py-2 text-sm font-light cursor-pointer hover:bg-slate-100"
        >
            {children}
        </div>
    )
}