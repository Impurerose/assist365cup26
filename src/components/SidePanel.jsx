/**
 * SidePanel Component
 * Contenedor de presentación para el panel lateral
 */

const SidePanel = ({ children, showBackground = false }) => {
  return (
    <div className={`rounded-l-xl flex flex-col p-6 w-[467px] h-[640px] bg-[rgba(81,90,96,0.06)] ${showBackground ? 'bg-[url(https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/BallWidthDots.svg)] bg-no-repeat bg-top bg-contain' : ''}`}>
      {children}
    </div>
  );
};

export default SidePanel;
