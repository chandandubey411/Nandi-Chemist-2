import { motion } from 'framer-motion';
import { FiPackage, FiClock, FiCheck, FiTruck } from 'react-icons/fi';
import SectionTitle from '../components/common/SectionTitle';
import { Link } from 'react-router-dom';

const demoOrders = [
  { id: 'NC-A8K3M2', date: 'May 18, 2025', status: 'Delivered', items: 3, total: 547, color: 'bg-green-100 text-green-700', icon: <FiCheck /> },
  { id: 'NC-B9L4N7', date: 'May 15, 2025', status: 'In Transit', items: 2, total: 289, color: 'bg-blue-100 text-blue-700', icon: <FiTruck /> },
  { id: 'NC-C2M5P1', date: 'May 10, 2025', status: 'Processing', items: 5, total: 1234, color: 'bg-amber-100 text-amber-700', icon: <FiClock /> },
];

const Orders = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50/50 pt-28 pb-16">
      <div className="container-max px-4">
        <SectionTitle title="My Orders" subtitle="Order History" align="left" />
        <div className="space-y-4 max-w-3xl">
          {demoOrders.map((order, i) => (
            <motion.div key={order.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-card border border-gray-100 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${order.color} flex items-center justify-center`}>{order.icon}</div>
                <div>
                  <p className="font-semibold text-dark text-sm">Order #{order.id}</p>
                  <p className="text-xs text-gray-400">{order.date} • {order.items} items</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${order.color}`}>{order.status}</span>
                <span className="font-bold text-dark">₹{order.total}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/shop" className="btn-secondary text-sm inline-flex items-center gap-2"><FiPackage /> Continue Shopping</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Orders;
