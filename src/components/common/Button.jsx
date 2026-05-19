import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-gradient-to-r from-primary-500 to-cyan-500 text-white hover:shadow-glow',
  secondary: 'bg-white text-primary-600 border-2 border-primary-200 hover:bg-primary-50 hover:border-primary-400',
  outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
  ghost: 'text-primary-600 hover:bg-primary-50',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const Button = ({ children, variant = 'primary', size = 'md', icon, className = '', onClick, disabled, type = 'button', ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${sizes[size]} rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;
