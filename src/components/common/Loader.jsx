const Loader = ({ type = 'spinner', count = 4 }) => {
  if (type === 'skeleton') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white rounded-3xl p-4 shadow-card">
            <div className="skeleton h-48 w-full mb-4 rounded-2xl" />
            <div className="skeleton h-4 w-3/4 mb-2" />
            <div className="skeleton h-3 w-1/2 mb-4" />
            <div className="skeleton h-6 w-1/3 mb-2" />
            <div className="skeleton h-10 w-full rounded-xl" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary-500 animate-spin" />
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-b-cyan-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>
    </div>
  );
};

export default Loader;
