"use client"; 
import { ReactNode } from "react"
import PrimaryButton from "./buttons/primaryButton";
import LinkButton from "./buttons/linkButton";
import { useRouter } from "next/navigation";

export default function AppBar() : ReactNode{
    const router = useRouter(); 
    return(
        <div className="flex border-b justify-between p-4">
            <div className="flex flex-col justify-center text-2xl font-extrabold">
                Workflow Automaton
            </div>
            <div className="flex">
                <LinkButton onClick={()=>{}}>Contact Sales</LinkButton>
                <LinkButton onClick={()=>{router.push('/login')}}>Log in</LinkButton>
                <PrimaryButton onClick={()=>{router.push('/signup')}} size="small">Signup</PrimaryButton>
            </div>
        </div>
    )
}