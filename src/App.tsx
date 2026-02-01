import { motion } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Traditions from './components/Traditions';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
    return (
        <div className="bg-white text-gray-900 overflow-hidden">
            <Navbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <Hero />
                <About />
                <Traditions />
                <Gallery />
                <Contact />
            </motion.div>
            <Footer />
        </div>
    );
}

export default App;