import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
const logo = '/images/projects/logo1.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Technologies', href: '#technologies' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-dark py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">




          {/* Logo - Image instead of text */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src={logo}
                alt="42.AI Logo"
                className="h-12 w-auto transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{ maxWidth: '200px' }}
              />
            </Link>



          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <Link to="/get-started" className="glass px-6 py-2 rounded-lg hover:glow-blue transition-all duration-300 text-sm font-medium">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 glass-dark rounded-lg p-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-foreground/80 hover:text-foreground transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Link to="/get-started" className="w-full mt-4 glass px-6 py-2 rounded-lg hover:glow-blue transition-all duration-300 text-sm font-medium text-center block">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
