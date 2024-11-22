'use client'
import { useRouter } from "next/navigation";
import AppBar from "../../components/appbar";
import CheckFeature from "../../components/checkFeature";
import { useState } from "react";
import PrimaryButton from "../../components/buttons/primaryButton";
import axios from 'axios'; 

export default function Home() {

    const router = useRouter(); 
    const [username, setUsername] = useState(); 
    const [email, setEmail] = useState(); 
    const [password, setPassword] = useState(); 
    const [errorMessage, setErrorMessage] = useState<String>(); 

    const handleSignup = async () => {
        const res = await axios.post("http://localhost:3000", {
            name: username, 
            email: email, 
            password: password
        }); 
        if(res.status == 409){
            setErrorMessage("Email already used"); 
            return; 
        }

        if(res.status == 200){
            router.push('/login')
        }
    }

    return (
    <div>
      <AppBar></AppBar>
      <div className="flex mx-auto px-40 py-20 max-w-6xl justify-items-center">
        <div className="max-w-2xl">
          <div className="text-4xl font-semibold text-left pb-10">
            Join millions worldwide who automate their work using
            Workflow-automaton.
          </div>
          <div className="">
            <CheckFeature children={"Easy setup, no coding required"} />
          </div>
          <div>
            <CheckFeature children={"Free forever for core features"} />
          </div>
        </div>
        <div className="max-w-4xl min-w-fit border p-4">
            <label className="text-lg font-mono">
                Name*<br />
                <input className="p-2 border" type="text" placeholder="john doe" onChange={(e:any) => {setUsername(e.target.value)}}></input>
            </label>
            <br/>
            <label className="text-lg font-mono">
                Email*<br />
                <input className="p-2 border" type="text" placeholder="johndoe@exammple.com" onChange={(e:any) => {setEmail(e.target.value)}}></input>
                {
                    errorMessage ? 
                    `${errorMessage}`
                    : ""
                }
            </label>
            <br/>
            <label className="text-lg font-mono">
                Password*<br />
                <input className="p-2 border" type="password" placeholder="password" onChange={(e:any) => {setPassword(e.target.value)}}></input>
            </label>
            <div className="py-4">
                <PrimaryButton onClick={() => {handleSignup}} >Get started for free</PrimaryButton>
            </div>
            <div>Already have an Account? <a className="text-blue-950 underline cursor-pointer" onClick={() => {router.push('/login')}}>Login</a></div>
        </div>
      </div>
    </div>
  );
}
