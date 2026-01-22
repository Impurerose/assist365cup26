import { SuitcaseRolling, SoccerBall, AirplaneTilt, ArrowRight } from '@phosphor-icons/react';

export default function Assist365BannersWidget() {
  return (
    <div className="flex gap-6 items-center justify-center">
      {/* 1. Icono amarillo - Maleta */}
      <div className="bg-brand-comp-yellow rounded-full w-[176px] h-[280px] flex items-center justify-center px-[27px] py-[78px]">
        <SuitcaseRolling 
          size={123} 
          weight="duotone" 
          className="text-white" 
        />
      </div>

      {/* 2. Card lila - Worldcup Care */}
      <div className="bg-brand-comp-lilac rounded-2xl w-[486px] h-[280px] p-6 flex flex-col gap-6 justify-center relative overflow-hidden">
        {/* Imagen decorativa shape (absolute) */}
        <img 
          src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/banner/shape3.svg"
          alt=""
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[143px] h-[300px]"
        />
        
        {/* Textos */}
        <div className="flex flex-col gap-1 relative z-10">
          <p className="text-xl font-semibold text-text-default leading-7">
            Viví cada partido sin preocupaciones
          </p>
          <p className="text-3xl font-semibold text-text-default leading-9">
            Worldcup Care
          </p>
          <p className="text-2xl text-text-default leading-8">
            La cobertura pensada para acompañarte dentro y fuera de la cancha
          </p>
        </div>
        
        {/* Botón */}
        <button className="bg-action-default hover:bg-action-hover active:bg-action-pressed text-white font-semibold px-4 py-2 rounded-xl flex items-center gap-1 w-fit h-[36px] transition-colors relative z-10">
          <span className="text-base leading-6">Cotizá tu viaje ahora</span>
          <ArrowRight size={16} weight="bold" />
        </button>
      </div>

      {/* 3. Card verde - Pelota */}
      <div className="bg-brand-comp-green rounded-xl w-[278px] h-[280px] flex items-center justify-center p-[62px]">
        <SoccerBall 
          size={123} 
          weight="duotone" 
          className="text-icon-darker" 
        />
      </div>

      {/* 4. Icono celeste circular - Avión */}
      <div className="bg-brand-comp-lightblue rounded-full w-[280px] h-[280px] flex items-center justify-center p-[62px]">
        <AirplaneTilt 
          size={156} 
          weight="duotone" 
          className="text-white" 
        />
      </div>
    </div>
  );
}
