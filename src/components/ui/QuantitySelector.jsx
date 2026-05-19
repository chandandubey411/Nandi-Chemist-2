import { FiMinus, FiPlus } from 'react-icons/fi';

const QuantitySelector = ({ quantity, onChange, min = 1, max = 10 }) => {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
      <button
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors disabled:opacity-40"
      >
        <FiMinus size={14} />
      </button>
      <span className="w-8 text-center font-semibold text-sm">{quantity}</span>
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors disabled:opacity-40"
      >
        <FiPlus size={14} />
      </button>
    </div>
  );
};

export default QuantitySelector;
