import { useState } from 'react';
import { Plus, Mail, Filter, Star, Users, ArrowUp, Zap, Target, Heart } from 'lucide-react';

const FloatingActionButton = ({ onQuickFilter, onScrollToTop }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    { icon: Star, label: 'Top Rated', action: () => onQuickFilter('top'), color: 'bg-yellow-500' },
    { icon: Users, label: 'Most Active', action: () => onQuickFilter('active'), color: 'bg-green-500' },
    { icon: Target, label: 'AI Focus', action: () => onQuickFilter('ai'), color: 'bg-purple-500' },
    { icon: Heart, label: 'Favorites', action: () => onQuickFilter('favorites'), color: 'bg-red-500' },
    { icon: ArrowUp, label: 'Scroll Top', action: onScrollToTop, color: 'bg-blue-500' },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Quick Action Buttons */}
      <div className={`absolute bottom-16 right-0 space-y-3 transition-all duration-300 ${
        isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {quickActions.map((action, index) => (
          <div
            key={action.label}
            className={`transform transition-all duration-300 ${
              isExpanded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <button
              onClick={action.action}
              className={`${action.color} hover:scale-110 transform transition-all duration-200 
                         text-white rounded-full p-3 shadow-lg hover:shadow-xl
                         flex items-center justify-center group relative`}
              title={action.label}
            >
              <action.icon className="h-5 w-5" />
              
              {/* Tooltip */}
              <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 
                             bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap
                             opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {action.label}
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full 
                   p-4 shadow-2xl hover:shadow-3xl transform transition-all duration-300 
                   hover:scale-110 ${isExpanded ? 'rotate-45' : 'rotate-0'} 
                   border-4 border-white/20 backdrop-blur-sm`}
      >
        <Plus className="h-6 w-6" />
      </button>

      {/* Pulse ring animation */}
      <div className={`absolute inset-0 rounded-full border-2 border-blue-500/30 
                      animate-ping ${isExpanded ? 'opacity-0' : 'opacity-100'}`}></div>
    </div>
  );
};

export default FloatingActionButton;
