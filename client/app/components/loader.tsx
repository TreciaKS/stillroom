import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center w-full">
      <DotLottieReact
        src="https://lottie.host/e20107b3-5e7a-4ad6-bed7-6b5b343ff630/6mraTxvZuX.lottie"
        loop
        autoplay
        className="h-80 w-80"
      />
    </div>
  );
}