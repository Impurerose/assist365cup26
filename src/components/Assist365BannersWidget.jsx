import {
  SuitcaseRolling,
  SoccerBallIcon,
  AirplaneTiltIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";
import Button from "../dsys/Button";

export default function Assist365BannersWidget() {
  return (
    <div className="flex gap-6 items-center justify-center">
      {/* 1. Icono amarillo - Maleta */}
      <div className="hidden lg:flex bg-brand-comp-yellow rounded-full w-[176px] h-[280px] items-center justify-center px-[27px] py-[78px]">
        <SuitcaseRolling size={123} weight="duotone" className="text-white" />
      </div>

      {/* 2. Card lila - Worldcup Care */}
      <div className="bg-brand-comp-lilac rounded-2xl w-full lg:w-[486px] lg:h-[280px] p-4 lg:p-6 flex flex-col gap-6 justify-center relative overflow-hidden">
        {/* Imagen decorativa shape (absolute) */}
        <img
          src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/banner/shape3.svg"
          alt=""
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[143px] h-[300px]"
        />

        {/* Textos */}
        <div className="flex flex-col gap-1 relative z-10">
          <p className="text-base md:text-xl font-semibold text-text-default lg:leading-7">
            Viví cada partido sin preocupaciones
          </p>
          <p className="text-2xl md:text-3xl font-semibold text-text-default lg:leading-9">
            Worldcup Care
          </p>
          <p className="text-base md:text-2xl text-text-default lg:leading-8">
            La cobertura pensada para acompañarte dentro y fuera de la cancha
          </p>
        </div>

        {/* Botón */}
        <Button
          icon={<ArrowRightIcon size={16} weight="bold" />}
          iconPosition="right"
          size="small"
        >
          Cotizá tu viaje ahora
        </Button>
      </div>

      {/* 3. Card verde - Pelota */}
      <div className="bg-brand-comp-green rounded-xl w-[278px] h-[280px] items-center justify-center p-[62px] hidden lg:flex">
        <SoccerBallIcon
          size={123}
          weight="duotone"
          className="text-icon-darker"
        />
      </div>

      {/* 4. Icono celeste circular - Avión */}
      <div className="bg-brand-comp-lightblue rounded-full w-[280px] h-[280px] hidden lg:flex items-center justify-center p-[62px]">
        <AirplaneTiltIcon size={156} weight="duotone" className="text-white" />
      </div>
    </div>
  );
}
