import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out animation
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500',
          border: 'border-green-600',
          icon: CheckCircle,
          iconColor: 'text-white'
        };
      case 'error':
        return {
          bg: 'bg-red-500',
          border: 'border-red-600',
          icon: XCircle,
          iconColor: 'text-white'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500',
          border: 'border-yellow-600',
          icon: AlertTriangle,
          iconColor: 'text-white'
        };
      default:
        return {
          bg: 'bg-blue-500',
          border: 'border-blue-600',
          icon: Info,
          iconColor: 'text-white'
        };
    }
  };

  const { bg, border, icon: Icon, iconColor } = getToastStyles();

  return (
    <div 
      className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`${bg} ${border} border-l-4 text-white p-4 rounded-lg shadow-lg max-w-sm min-w-64`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Icon className={`h-5 w-5 ${iconColor} mr-3`} />
            <span className="text-sm font-medium">{message}</span>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="ml-3 text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
