import { BrowserRouter as Router, Routes, Route } from 'react-router';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import Traditions from '../components/Traditions';

export default function PageRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/footer" element={<Footer />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/traditions" element={<Traditions />} />
            </Routes>
        </Router>
    );
}