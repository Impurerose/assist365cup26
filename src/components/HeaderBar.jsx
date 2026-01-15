import { SoccerBallIcon, ShareNetworkIcon } from "@phosphor-icons/react";
import Button from "../dsys/Button.jsx";

export default function HeaderBar() {
  return (
    <header className="bg-white w-full">
      <div className="flex items-center justify-between w-full max-w-[1200px] mx-auto px-6 py-3 bg-red-500">
        <div className="flex items-center gap-3">
          <img
            src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/home/img/brand/a365_logo_xa.svg"
            alt="A365 Logo"
          />
          <div className="bg-gradient-to-b from-[#59D3C2] to-[#006FE8] bg-clip-text">
            <SoccerBallIcon
              size={32}
              weight="duotone"
              className="text-transparent"
              style={{ fill: "url(#soccerGradient)" }}
            />
          </div>
          <svg width="0" height="0" style={{ position: "absolute" }}>
            <defs>
              <linearGradient
                id="soccerGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#59D3C2", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#006FE8", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
          </svg>
          <div className="text-xl font-semibold text-[#0059BA]">
            World Cup Map 2026
          </div>
        </div>
        <Button
          icon={<ShareNetworkIcon size={16} weight="bold" iconPosition="left" />}
        >
          Compartir
        </Button>
      </div>
    </header>
  );
}
