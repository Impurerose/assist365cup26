/**
 * TabNavigation Component
 * Navegación por tabs reutilizable
 */

import Chip from '../dsys/Chip';

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex gap-2 mb-6">
      {tabs.map((tab) => (
        <Chip
          key={tab.id}
          state={activeTab === tab.id ? 'selected' : 'default'}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </Chip>
      ))}
    </div>
  );
};

export default TabNavigation;
