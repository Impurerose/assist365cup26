/**
 * SidePanel Component
 * Contenedor de presentación para el panel lateral
 */

const SidePanel = ({ children, showBackground = false }) => {
  return (
    <div className="bg-brand-darkening w-full lg:max-w-[467px]">
      <div
        className={`mx-auto lg:mx-0 rounded-l-xl flex flex-col lg:px-4 pt-4 lg:pt-6 lg:p-6 w-full max-w-[368px]  lg:max-w-full lg:w-[467px] h-[640px] ${showBackground ? "lg:bg-[url(https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/BallWidthDots.svg)] bg-no-repeat bg-top bg-contain" : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default SidePanel;