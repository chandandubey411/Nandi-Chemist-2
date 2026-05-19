const Input = ({ label, error, icon, className = '', ...props }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>}
        <input className={`input-field ${icon ? 'pl-10' : ''} ${error ? 'border-red-400 ring-2 ring-red-100' : ''}`} {...props} />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
