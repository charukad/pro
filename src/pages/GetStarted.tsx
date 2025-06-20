import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Star, Clock, Users, Zap, Phone, Mail, Calendar, MessageSquare } from 'lucide-react';
import GlobalCursor from '@/components/GlobalCursor';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { API_ENDPOINTS } from '@/config/config';
import { useToast } from '@/hooks/use-toast';

const GetStarted = () => {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    preferredContactMethod: 'email'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'Custom web applications with modern frameworks',
      icon: '🌐',
      price: 'From $2,500',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Modern UI/UX']
    },
    {
      id: 'mobile-development',
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile apps',
      icon: '📱',
      price: 'From $3,500',
      features: ['iOS & Android', 'Cross-platform', 'Native Performance', 'App Store Ready']
    },
    {
      id: 'backend-apis',
      title: 'Backend & APIs',
      description: 'Robust backend systems and APIs',
      icon: '⚙️',
      price: 'From $2,000',
      features: ['Scalable Architecture', 'Secure APIs', 'Database Design', 'Cloud Integration']
    },
    {
      id: 'cloud-devops',
      title: 'Cloud & DevOps',
      description: 'Cloud infrastructure and CI/CD pipelines',
      icon: '☁️',
      price: 'From $1,800',
      features: ['AWS/Azure Setup', 'CI/CD Pipelines', 'Monitoring', 'Cost Optimization']
    },
    {
      id: 'qa-testing',
      title: 'QA & Testing',
      description: 'Comprehensive testing strategies',
      icon: '🧪',
      price: 'From $1,200',
      features: ['Automated Testing', 'Manual QA', 'Performance Testing', 'Security Testing']
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      description: 'User-centered design solutions',
      icon: '🎨',
      price: 'From $1,500',
      features: ['User Research', 'Wireframing', 'Visual Design', 'Prototyping']
    }
  ];

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $15,000',
    '$15,000 - $50,000',
    '$50,000+',
    'To be discussed'
  ];

  const timelineOptions = [
    'ASAP',
    '1-2 months',
    '3-6 months',
    '6+ months',
    'Flexible'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setFormData({
      ...formData,
      projectType: serviceId
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(API_ENDPOINTS.SERVICE_INQUIRY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          serviceType: services.find(s => s.id === selectedService)?.title || formData.projectType,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "🎉 Thank you for getting started!",
          description: "We'll review your project details and get back to you within 24 hours with a custom proposal.",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: '',
          preferredContactMethod: 'email'
        });
        setSelectedService('');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <GlobalCursor />
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 pt-24">
        <div className="container mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-black/30 px-6 py-3 rounded-full mb-8 border border-white/20">
              <Star size={20} className="mr-3 text-yellow-400" />
              <span className="text-base font-medium text-white">✨ Start Your Project Journey</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Let's Build Something
              </span>{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Tell us about your project and we'll create a custom solution that brings your vision to life.
            </p>
          </div>

          {/* Service Selection */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="gradient-text">Choose Your Service</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceSelect(service.id)}
                  className={`glass-dark rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedService === service.id ? 'ring-2 ring-blue-400 glow-blue' : 'hover:glow-purple'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold gradient-text mb-2">{service.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                    <div className="text-blue-400 font-semibold mb-4">{service.price}</div>
                    <div className="space-y-2">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-center text-xs text-gray-400">
                          <CheckCircle size={12} className="mr-2 text-green-400" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            <div className="glass-dark rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-center mb-8">
                <span className="gradient-text">Project Details</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full glass rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range} className="bg-gray-800">
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full glass rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map((option) => (
                        <option key={option} value={option} className="bg-gray-800">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContactMethod"
                        value="email"
                        checked={formData.preferredContactMethod === 'email'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <Mail size={16} className="mr-1" />
                      Email
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContactMethod"
                        value="phone"
                        checked={formData.preferredContactMethod === 'phone'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <Phone size={16} className="mr-1" />
                      Phone
                    </label>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full glass rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 resize-vertical"
                    placeholder="Tell us about your project, goals, specific requirements, and any other details that would help us understand your needs..."
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-lg font-semibold text-white text-lg hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Start My Project
                        <ArrowRight size={20} className="ml-2" />
                      </>
                    )}
                  </button>
                  
                  <p className="text-gray-400 text-sm mt-4">
                    We'll review your project and send you a custom proposal within 24 hours.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-12">
              <span className="gradient-text">Why Start With Us?</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-dark rounded-xl p-6">
                <Clock size={48} className="mx-auto mb-4 text-blue-400" />
                <h3 className="text-xl font-bold mb-2">Fast Response</h3>
                <p className="text-gray-300">Get a detailed proposal within 24 hours of submission.</p>
              </div>
              
              <div className="glass-dark rounded-xl p-6">
                <Users size={48} className="mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-bold mb-2">Expert Team</h3>
                <p className="text-gray-300">Work with experienced developers and designers.</p>
              </div>
              
              <div className="glass-dark rounded-xl p-6">
                <Zap size={48} className="mx-auto mb-4 text-yellow-400" />
                <h3 className="text-xl font-bold mb-2">Proven Results</h3>
                <p className="text-gray-300">Delivered 100+ successful projects across industries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default GetStarted;