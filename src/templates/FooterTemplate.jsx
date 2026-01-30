/**
 * Footer Template
 * Template para visualizar y testear el componente Footer de forma aislada
 * Uso: localhost:5173/?template=footer
 */

import React from 'react';
import Footer from '../components/Footer';

const FooterTemplate = () => {
  return (
    <div className="w-full min-h-screen bg-bg-secondary flex flex-col">
      {/* Spacer para visualización */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-text-lighter text-lg">
          👇 Footer Component Preview
        </p>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FooterTemplate;
