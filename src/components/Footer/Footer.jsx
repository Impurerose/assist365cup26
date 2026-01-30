/**
 * Footer Component
 *
 * Footer reutilizable basado en diseño de Figma World Cup Map
 * Incluye sección de redes sociales, CTA y subfooter con información legal
 *
 * @example
 * import Footer from '@/components/Footer';
 *
 * <Footer />
 */

import React from "react";
import Button from "../../dsys/Button";
import { ArrowRight } from "@phosphor-icons/react";

const Footer = () => {
  // URLs de iconos desde CDN de Assist365
  const ASSETS_URL =
    "https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/icons";

  // Configuración de redes sociales
  const socialNetworks = [
    {
      name: "Instagram",
      icon: `${ASSETS_URL}/InstagramLogo.svg`,
      url: "https://www.instagram.com/assist365ok/",
    },
    {
      name: "Facebook",
      icon: `${ASSETS_URL}/FacebookLogo.svg`,
      url: "https://www.facebook.com/assist.365.cover/",
    },
    {
      name: "X",
      icon: `${ASSETS_URL}/XLogo.svg`,
      url: "https://twitter.com/assist365ok",
    },
    {
      name: "TikTok",
      icon: `${ASSETS_URL}/TiktokLogo.svg`,
      url: "https://www.tiktok.com/@assist365ok",
    },
    {
      name: "LinkedIn",
      icon: `${ASSETS_URL}/LinkedinLogo.svg`,
      url: "https://ar.linkedin.com/company/assist-365",
    },
    {
      name: "Youtube",
      icon: `${ASSETS_URL}/YoutubeLogo.svg`,
      url: "https://www.youtube.com/c/Assist365_Seguro_de_viaje",
    },
  ];

  // Handler para abrir redes sociales en nueva pestaña
  const handleSocialClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Handler para botón CTA (cotización)
  const handleCTAClick = () => {
    // TODO: Implementar navegación a página de cotización
    console.log("Navegar a cotización");
  };

  // Handler para términos y condiciones
  const handleTermsClick = () => {
    // TODO: Implementar navegación a términos y condiciones
    console.log("Abrir términos y condiciones");
  };

  return (
    <footer className="w-full max-w-[1366px] flex flex-col items-center mt-20 mx-auto">
      <div className="w-full">
        {/* ========================================
            FOOTER SUPERIOR - Redes Sociales + CTA
            ======================================== */}
        <div className="bg-white flex items-start xl:items-center justify-between px-[83px] pt-10 pb-16 flex-col-reverse xl:flex-row gap-y-8 xl:gap-y-0">
          {/* Izquierda: Redes Sociales */}
          <div className="max-w-[548px] mx-auto flex flex-col gap-4 w-full">
            <h3 className="text-text-decorative-darker font-semibold text-base leading-6">
              Seguinos en redes
            </h3>
            <div className="flex gap-3">
              {socialNetworks.map((social) => (
                <button
                  key={social.name}
                  type="button"
                  onClick={() => handleSocialClick(social.url)}
                  className="w-9 h-9 p-2 border-2 border-brand-primary rounded-xl flex items-center justify-center hover:border-text-decorative-darker hover:text-text-decorative-darker active:border-action-pressed active:text-action-pressed focus:outline-none focus:ring-4 focus:ring-brand-primary focus:ring-opacity-100 focus:border-transparent transition-all duration-300"
                  aria-label={`Visitar ${social.name}`}
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-5 h-5 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Derecha: Tagline + CTA */}
          <div className=" max-w-[548px] flex xl:items-end gap-6 xl:gap-12 mx-auto xl:mx-0 flex-col xl:flex-row  xl:max-w-full items-center w-full">
            <p className="text-text-decorative-darker text-[36px] leading-10">
              <span className="font-normal">En tu viaje,</span>{" "}
              <span className="font-semibold">a tu lado.</span>
            </p>
            <Button
              variant="default"
              color="primary"
              fullWidth
              classes="w-full xl:w-auto"
              size="large"
              icon={<ArrowRight size={20} weight="bold" />}
              iconPosition="right"
              onClick={handleCTAClick}
            >
              Cotizá tu asistencia
            </Button>
          </div>
        </div>

        {/* ========================================
            SUBFOOTER - Términos + Texto Legal
            ======================================== */}
        <div className="bg-action-focus pt-8 pb-16 flex flex-col  gap-6">
          {/* Botón Términos y Condiciones */}
          
          
          <div className="max-w-[548px] xl:max-w-[1200px] mx-auto px-4 xl:px-0">
          <div>
            <Button
              variant="alt"
              color="tertiary"
              padding={false}
              size="small"
              onClick={handleTermsClick}
              classes="mb-6 w-fit"
            >
              Términos y condiciones
            </Button>
          </div>

          {/* Línea divisoria */}
          <div className="w-full h-px bg-border-alt-secondary" />

          {/* Texto Legal */}
          <div className="w-full pt-6">
            <p className="text-white text-sm font-normal leading-5">
              TEXTO A CONFIRMAR!!!
              <br />
              Copyright © 2024 ASSIST 365. Todos los derechos reservados.
              <br />
              LOS SERVICIOS ASSIST 365 TIENEN LIMITACIONES EXCLUSIVAS SEGÚN EL
              TIPO DE PRODUCTO ADQUIRIDO. APLICAN LAS LIMITACIONES Y EXCLUSIONES
              DE USO HABITUAL Y/O LEGAL EN EL PAÍS EN QUE SE EMITA EL PRODUCTO
              ASSIST 365. A PARTIR DE LOS 75 AÑOS INCLUSIVE SE APLICA UN
              INCREMENTO DEL 50% SOBRE LAS TARIFAS. EL LÍMITE DE EDAD PARA LAS
              COBERTURAS OFRECIDAS ES DE HASTA 85 AÑOS, Y LOS SERVICIOS OFRECEN
              UNA COBERTURA DE ALCANCE MUNDIAL, A EXCEPCIÓN DEL PAÍS DE
              RESIDENCIA PERMANENTE DEL BENEFICIARIO. LOS SERVICIOS Y PRODUCTOS
              SE RIGEN POR CONDICIONES GENERALES QUE SE INFORMAN CON LA COMPRA
              DE CADA PRODUCTO ASSIST 365 Y SE HALLAN A SU DISPOSICIÓN
              INGRESANDO EN EL PORTAL WEB, PUEDEN SER SOLICITADAS EN FORMA
              TELEFÓNICA O POR E-MAIL. LAS ENFERMEDADES PREEXISTENTES TIENEN
              EXCLUSIONES Y LIMITACIONES. ASSIST 365 NO ES UNA EMPRESA DE
              SEGUROS, SINO QUE ACTÚA EN CALIDAD DE TOMADORA EN BENEFICIO DE SUS
              CLIENTES.
            </p>
          </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
