import { FiStar } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const RatingStars = ({ rating, reviews, size = 'sm', showCount = true }) => {
  const sizeClass = size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg';
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars.push(<FaStar key={i} className="text-amber-400" />);
    else if (i - 0.5 <= rating) stars.push(<FaStarHalfAlt key={i} className="text-amber-400" />);
    else stars.push(<FiStar key={i} className="text-gray-300" />);
  }
  return (
    <div className={`flex items-center gap-1 ${sizeClass}`}>
      <div className="flex">{stars}</div>
      {showCount && <span className="text-gray-400 text-xs ml-1">({reviews || 0})</span>}
    </div>
  );
};

export default RatingStars;
