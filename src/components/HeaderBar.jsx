import {
  SoccerBall,
  PaperPlaneTiltIcon,
  ArrowLeft,
} from "@phosphor-icons/react";
import Button from "../dsys/Button.jsx";
import ToolTip from "../dsys/ToolTip.jsx";

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
      <div className="flex items-center justify-between w-full max-w-[358px] sm:max-w-[548px] lg:max-w-[1200px] mx-auto py-3 px-0 md:px-4">
        <ArrowLeft
          size={24}
          weight="bold"
          className="text-action-default block lg:hidden"
        />

        <div className="flex w-fit items-center">
          <img
            className="hidden lg:block"
            src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/home/img/brand/a365_logo_xa.svg"
            alt="A365 Logo"
          />

          <img
            className="block lg:hidden"
            src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/home/img/brand/Assist-logo.svg"
            alt=""
          />

          <SoccerBallGradient />
          <svg
            viewBox="0 0 32 32"
            className="flex-shrink-0 w-6 h-6 lg:w-8 lg:h-8"
          >
            <SoccerBall
              size={32}
              weight="duotone"
              style={{ fill: "url(#soccerGradient)" }}
            />
          </svg>
          <h1 className="text-base lg:text-xl font-semibold text-text-decorative-darker">
            World Cup Map 2026
          </h1>
        </div>

        <ToolTip content="¡Enlace copiado!" alwaysVisible={true}>
          <Button
            icon={<PaperPlaneTiltIcon size={16} weight="bold" />}
            iconPosition="right"
            responsive={true}
          >
            <span className="pl-1 hidden lg:flex">Compartir</span>
          </Button>
        </ToolTip>
      </div>
    </header>
  );
}
