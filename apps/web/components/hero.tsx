"use client"
import { ReactNode } from "react";
import PrimaryButton from "./buttons/primaryButton";
import { useRouter } from "next/navigation";

export default function Hero(): ReactNode {
  const router = useRouter(); 
  return (
    <div className="flex px-40 py-20 max-w-6xl justify-items-center">
      <div className="pt-10 justify-items-center">
        <h1 className="text-7xl font-extrabold font-sans max-w-4xl">
          Automate without limits
        </h1>
        <div className="text-lg font-lg pt-6 max-w-lg">
          Turn chaos into smooth operations by automating workflows yourself—no
          developers, no IT tickets, no delays. The only limit is your
          imagination.
        </div>
        <div className="pt-10">
          <PrimaryButton onClick={() => {router.push('/signup')}} size="big">
            Start with free email
          </PrimaryButton>
        </div>
      </div>
      <div className="flex justify-center max-w-[600px] max-h-[600px]">
        <img
          alt="hero-image"
          src="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1726210651/Homepage%20%E2%80%94%20Sept%202024/homepage-hero_vvpkmi.png"
        />
      </div>
    </div>
  );
}
