import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Security from './components/Security';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <Security />
      <Gallery />
      <Testimonials />
      <Booking />
      <Contact />
      <Footer />
      <LiveChat />
    </div>
  );
}

export default App;