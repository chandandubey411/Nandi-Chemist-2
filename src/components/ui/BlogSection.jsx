import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import { blogs } from '../../data/testimonials';
import { FiClock, FiArrowRight } from 'react-icons/fi';

const BlogSection = () => {
  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-max">
        <SectionTitle subtitle="Health Blog" title="Latest Health Articles" description="Stay informed with expert health tips and medical news." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog, i) => (
            <motion.article key={blog.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }} className="bg-white rounded-3xl overflow-hidden shadow-card border border-gray-100 cursor-pointer group">
              <div className="relative h-40 overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary-600 px-3 py-1 rounded-full">{blog.category}</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                  <span>{blog.date}</span>
                  <span className="flex items-center gap-1"><FiClock size={12} /> {blog.readTime}</span>
                </div>
                <h3 className="font-semibold text-dark text-sm leading-snug mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">{blog.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-2 mb-3">{blog.excerpt}</p>
                <span className="text-xs font-semibold text-primary-600 flex items-center gap-1 group-hover:gap-2 transition-all">Read More <FiArrowRight size={12} /></span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
