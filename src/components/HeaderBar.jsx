import { SoccerBall, ShareNetwork } from "@phosphor-icons/react";
import Button from "../dsys/Button.jsx";

const SoccerBallGradient = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      <linearGradient id="soccerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#59D3C2" stopOpacity={1} />
        <stop offset="100%" stopColor="#006FE8" stopOpacity={1} />
      </linearGradient>
    </defs>
  </svg>
);

export default function HeaderBar() {
  return (
    <header className="bg-white w-full">
      <div className="flex items-center justify-between w-full max-w-[1200px] mx-auto px-6 py-3">
        <div className="flex items-center gap-3">
          <img
            src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/home/img/brand/a365_logo_xa.svg"
            alt="A365 Logo"
          />
          <SoccerBallGradient />
          <svg width="32" height="32" viewBox="0 0 32 32" className="flex-shrink-0">
            <SoccerBall size={32} weight="duotone" style={{ fill: "url(#soccerGradient)" }} />
          </svg>
          <h1 className="text-xl font-semibold text-[#0059BA]">
            World Cup Map 2026
          </h1>
        </div>
        <Button
          icon={<ShareNetwork size={16} weight="bold" />}
          iconPosition="left"
        >
          Compartir
        </Button>
      </div>
    </header>
  );
}
