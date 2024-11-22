export default function HeroVideo() {
  return (
    <div className="w-full bg-[#e6f1ed] pt-20 justify-items-center pb-8">
      <div className="text-center justify-items-center pb-8">
        <div className="flex justify-items-center text-6xl font-semibold p-4 max-w-3xl">
          Build powerful workflows incredibly fast
        </div>
        <div className="flex justify-items-center text-2xl font-normal max-w-4xl py-4">
          Whether you're a team of one or a thousand, Zapier puts the power of
          automation in your hands—no coding required. Take your workflows to
          the next level with our suite of automation tools.
        </div>
      </div>
      <div className="flex justify-items-center max-w-4xl">
        <video
          src="https://res.cloudinary.com/zapier-media/video/upload/q_auto:best/f_auto/v1726860621/Homepage%20%E2%80%94%20Sept%202024/sc01_HP_240917_Connect_v01_edm2pd.mp4"
          controls={false}
          autoPlay
          muted
        ></video>
      </div>
    </div>
  );
}
