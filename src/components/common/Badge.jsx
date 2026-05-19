const badgeStyles = {
  discount: 'bg-red-500 text-white',
  new: 'bg-green-500 text-white',
  bestseller: 'bg-orange-500 text-white',
  hot: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
  info: 'bg-primary-100 text-primary-700',
};

const Badge = ({ type = 'info', children, className = '' }) => {
  return (
    <span className={`${badgeStyles[type]} text-xs font-bold px-2.5 py-1 rounded-lg inline-block ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
