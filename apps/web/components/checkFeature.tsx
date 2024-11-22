import { ReactNode } from "react";
import CheckMark from "./checkMark";

export default function CheckFeature({children}: {children: ReactNode}) {
    return (
        <div className="flex justify-left pb-3">
            <div>
                <CheckMark />
            </div>
            <div className="px-2 text-2xl font-normal">
                {children}
            </div>
        </div>
    )
}