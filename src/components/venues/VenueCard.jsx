/**
 * VenueCard Component
 * Wrapper reutilizable para cards de información de sedes
 */
function VenueCard({ children, className = "" }) {
  return (
    <div className={`bg-bg-primary rounded-3xl text-base text-text-default p-6 ${className}`}>
      {children}
    </div>
  );
}

export default VenueCard;
