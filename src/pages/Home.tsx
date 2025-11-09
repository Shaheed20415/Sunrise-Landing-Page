import React, { useState, useEffect } from 'react';
import EnquiryForm from '../components/EnquiryForm';
import ContactForm from '../components/ContactForm';

  
 


import { 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  ArrowRight, 
  Building, 
  Home as HomeIcon, 
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Calendar,
  Camera,
  Heart,
  Filter,
  Play,
  Send,
  Clock,
  Target,
  Shield,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  AlertCircle
} from 'lucide-react';

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);


   
  const slides = [
    {
      title: "Find Your Dream Home",
      subtitle: "Premium Properties Await You",
      description: "Discover luxury living spaces designed for modern families with world-class amenities and prime locations.",
      image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1600",
      cta: "Explore Properties"
    },
    {
      title: "Commercial Excellence",
      subtitle: "Business Spaces That Inspire",
      description: "State-of-the-art commercial properties designed to elevate your business with strategic locations and modern infrastructure.",
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600",
      cta: "View Commercial"
    },
    {
      title: "Investment Opportunities",
      subtitle: "Secure Your Financial Future",
      description: "High-yield real estate investments with guaranteed returns and expert portfolio management for long-term wealth building.",
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1600",
      cta: "Invest Now"
    },
    {
      title: "Luxury Developments",
      subtitle: "Redefining Premium Living",
      description: "Exclusive residential projects featuring cutting-edge design, premium finishes, and unparalleled lifestyle amenities.",
      image: "https://images.pexels.com/photos/273209/pexels-photo-273209.jpeg?auto=compress&cs=tinysrgb&w=1600",
      cta: "Discover Luxury"
    },
    {
      title: "Smart City Projects",
      subtitle: "Future-Ready Communities",
      description: "Innovative smart city developments with integrated technology, sustainable design, and connected living experiences.",
      image: "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1600",
      cta: "Learn More"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'location', 'contact', 'enquiry', 'about', 'address', 'completed-projects', 'current-projects', 'listings', 'rental'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };


  // ✅ VIDEO AUTOPLAY ON SCROLL
useEffect(() => {
  const iframe = document.getElementById("youtubeVideo") as HTMLIFrameElement | null;
  const section = document.getElementById("video");

  if (!iframe || !section) return;  // ⛔ avoids "undefined.src" errors

  const originalSrc = iframe.src;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          iframe.src = originalSrc + "&autoplay=1";  // ✅ autoplay only when visible
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(section);

  return () => observer.disconnect(); // ✅ clean up observer on unmount
}, []);


 







  return (
    <div className="min-h-screen bg-white">
      {/* Floating Navigation */}
      <div className="fixed top-24 right-6 z-40 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-2 hidden lg:block">
        <div className="flex flex-col space-y-2">
          {['home', 'contact', 'enquiry', 'location', 'about'].map((section) => (
            <button
              key={section}
              onClick={() => {
                const element = document.getElementById(section);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 scale-125' 
                  : 'bg-gray-300 hover:bg-blue-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hero Slider Section */}
      <section id="home" className="relative min-h-screen overflow-hidden">
        {/* Slides Container */}
        <div className="relative w-full h-screen">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 translate-x-0' 
                  : index < currentSlide 
                    ? 'opacity-0 -translate-x-full' 
                    : 'opacity-0 translate-x-full'
              }`}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-3xl">
                    <div className="animate-fade-in-up">
                      <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
                        {slide.title}
                        <span className="block text-3xl md:text-4xl bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mt-4">
                          {slide.subtitle}
                        </span>
                      </h1>
                      <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
                        {slide.description}
                      </p>
                      <button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl ">
                        {slide.cta}
                        <ArrowRight className="w-5 h-5 ml-2 inline" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full transition-all duration-300 group"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full transition-all duration-300 group"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Quick Stats Overlay */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-4xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: "100+", label: "Projects Completed" },
              { number: "100+", label: "Happy Clients" },
              { number: "20+", label: "Team Members" },
              { number: "8+", label: "Years Experience" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center text-white">
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-xs md:text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our Prime Locations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We operate across major Indian metro cities like  Bangalore, Hyderabad, and Chennai, along with strategic expansion into North India, Rural, and Semi-Urban areas across the country , ensuring accessibility everywhere
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Downtown Office", address: "Business Areas", image: "https://images.pexels.com/photos/273209/pexels-photo-273209.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { name: "City Center Branch", address: " Main Streets", image: "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { name: "Suburban Office", address: " Residential Area", image: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800" }
            ].map((location, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                <img src={location.image} alt={location.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{location.name}</h3>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{location.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Get in Touch with Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let’s Build Something Amazing Together
Share your requirements and we’ll transform your idea into a stunning experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {[
                {
                  icon: <Phone className="w-6 h-6" />,
                  title: "Call Us",
                  content: "+91  9963632436",
                  action: "tel:+91 9963632436"
                },
                {
                  icon: <Mail className="w-6 h-6" />,
                  title: "Email Us",
                  content: "sunrisemarketing007@gmail.com",
                  action: "mailto:sunrisemarketing007@gmail.com"
                },
                {
                  icon: <MapPin className="w-6 h-6" />,
                  title: "Visit Us",
                  content: "#47,Sri Sai Shine,Peddanna Reddy Layout,Horamavu, Bangalore",
                  action: "#address"
                }
              ].map((contact, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-3 rounded-xl text-white">
                      {contact.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{contact.title}</h3>
                      <a
                        href={contact.action}
                        target={contact.action.startsWith('https://wa.me') ? '_blank' : undefined}
                        rel={contact.action.startsWith('https://wa.me') ? 'noopener noreferrer' : undefined}
                        className="text-orange-600 hover:text-orange-700 transition-colors duration-300"
                      >
                        {contact.content}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Section */}
      <section id="enquiry" className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Make an Enquiry
            </h2>
            <p className="text-xl text-gray-600">
              Let’s Connect!
Whether you have a project idea, a business inquiry, or simply want to say hello — we would love to hear from you.
            </p>
          </div>

          <EnquiryForm />
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                We are a Trusted Company
                <span className="block text-orange-600">with Years of Experience</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
               Impact Better Living.
With years of experience, we create solutions that add value and improve everyday life.
Our commitment is to deliver excellence that inspires growth, comfort, and happiness.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: <Users className="w-6 h-6" />, title: "Expert Team", desc: "Professional specialists" },
                  { icon: <Award className="w-6 h-6" />, title: "Quality Service", desc: "Excellence guaranteed" },
                  { icon: <TrendingUp className="w-6 h-6" />, title: "Growth Focus", desc: "Continuous improvement" },
                  { icon: <Shield className="w-6 h-6" />, title: "Trusted Partner", desc: "Reliable solutions" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-orange-100 p-2 rounded-lg text-orange-600 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Our Team"
                  className="w-full h-80 object-cover rounded-xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">8+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Address Section */}
      <section id="address" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our Address
            </h2>
            <p className="text-xl text-gray-600">
              Visit us at our office location
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-12 text-center shadow-xl">
              <button 
                onClick={() => window.open('https://maps.app.goo.gl/SHLAYkBiMxkJARWUA', '_blank')}
                className="bg-orange-100 hover:bg-orange-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 transform hover:scale-110 cursor-pointer group"
              >
                <MapPin className="w-8 h-8 text-orange-600 group-hover:text-orange-700 transition-colors duration-300" />
              </button>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Sunrise Marketing Solutions</h3>
              <p className="text-xl text-gray-600 mb-6">
                Sri Sai Shine, Peddanna Reddy Layout , Horamavu <br />
                Bangalore, Karntaka - 560043<br />
                India
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <button 
                    onClick={() => window.open('https://maps.app.goo.gl/SHLAYkBiMxkJARWUA', '_blank')}
                    className="text-gray-600 hover:text-orange-600 tra''nsition-colors duration-300 cursor-pointer"
                  >
                   Sun-Sat(9AM-6PM)
                  </button>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-600">+91 9963632436</span>
                </div>
                <div className="flex items-center justify-center space-x-0">
                  <Mail className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-600 ml-2">sunrisemarketing007@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Completed Projects Section */}
      <section id="completed-projects" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Completed Projects Showcase
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A collection of our successfully delivered works across various industries.
Every project reflects our dedication to quality, innovation, and customer satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Residential Complex A", status: "Completed 2023", image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Commercial Plaza B", status: "Completed 2022", image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Housing Project C", status: "Completed 2023", image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Office Building D", status: "Completed 2022", image: "https://images.pexels.com/photos/273209/pexels-photo-273209.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Retail Center E", status: "Completed 2023", image: "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Mixed Use Development F", status: "Completed 2022", image: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800" }
            ].map((project, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-semibold">{project.status}</span>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-gray-600 mt-2 text-sm"></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Projects Section */}
      <section id="current-projects" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Ongoing Projects Overview
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
             On-Going Projects.
We are actively working on multiple projects across various locations and industries.
Each project is driven by precision, planning, and a commitment to timely delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Modern Towers", progress: 75, image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Green Valley Homes", progress: 60, image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Business Hub", progress: 45, image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800" }
            ].map((project, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{project.title}</h3>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm"></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section id="listings" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Explore Property Listings
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore Property Listings.
Discover premium properties tailored to your lifestyle and investment goals.
Find the perfect space that matches your vision and future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Luxury Apartment", price: "₹85 L", location: "Downtown", type: "Apartment", bedrooms: 3, image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Family Villa", price: "₹2.5 Cr", location: "Suburbs", type: "Villa", bedrooms: 4, image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Commercial Space", price: "₹1.2 Cr", location: "Business District", type: "Commercial", bedrooms: null, image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Studio Apartment", price: "₹45 L", location: "City Center", type: "Studio", bedrooms: 1, image: "https://images.pexels.com/photos/273209/pexels-photo-273209.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Penthouse Suite", price: "₹3.0 Cr", location: "Premium Area", type: "Penthouse", bedrooms: 5, image: "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Office Complex", price: "₹3.2 Cr", location: "Tech Hub", type: "Office", bedrooms: null, image: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800" }
            ].map((property, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 group">
                <div className="relative">
                  <img src={property.image} alt={property.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4">
                    <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors duration-300">
                      <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{property.title}</h3>
                    <span className="text-2xl font-bold text-orange-600">{property.price}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full">{property.type}</span>
                    {property.bedrooms && (
                      <div className="flex items-center">
                        <HomeIcon className="w-4 h-4 mr-1" />
                        <span>{property.bedrooms} BHK</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rental & Lease Section */}
      <section id="rental" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Find Rental & Lease Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find Rental and Lease Opportunities.
Explore flexible rental and lease options that fit your budget and lifestyle.
We offer properties in prime locations with transparent terms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Furnished Apartment", rent: "₹25,000/month", location: "City Center", type: "Residential", image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Office Space", rent: "₹80,000/month", location: "Business District", type: "Commercial", image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Retail Shop", rent: "₹35,000/month", location: "Shopping Area", type: "Retail", image: "https://images.pexels.com/photos/273209/pexels-photo-273209.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Warehouse", rent: "₹50,000/month", location: "Industrial Zone", type: "Industrial", image: "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Co-working Space", rent: "₹15,000/month", location: "Tech Hub", type: "Shared Office", image: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800" },
              { title: "Studio Flat", rent: "₹18,000/month", location: "Residential Area", type: "Studio", image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800" }
            ].map((rental, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                <img src={rental.image} alt={rental.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{rental.title}</h3>
                    <span className="text-lg font-bold text-purple-600">{rental.rent}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{rental.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">{rental.type}</span>
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience excellence with our premium services designed to exceed your expectations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Quick response times and efficient service delivery for all your needs"
              },
              {
                icon: "💰",
                title: "Affordable Pricing",
                description: "Competitive rates without compromising on quality and service excellence"
              },
              {
                icon: "🎨",
                title: "Modern Solutions",
                description: "Contemporary approaches with cutting-edge technology and innovation"
              },
              {
                icon: "🤖",
                title: "AI Powered",
                description: "Smart automation and intelligent systems for enhanced user experience"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 group"
              >
                <div className="text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers who have experienced our exceptional service
            </p>
          </div>

          {/* Animated Testimonials Carousel */}
          <div className="relative">
            <div className="flex animate-scroll-x space-x-8">
              {[
                {
                  name: "Rajesh Kumar",
                  role: "Property Investor",
                  image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
                  rating: 5,
                  text: "Exceptional service! They helped me find the perfect investment property. The team was professional, knowledgeable, and always available to answer my questions."
                },
                {
                  name: "Priya Sharma",
                  role: "First-time Home Buyer",
                  image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
                  rating: 5,
                  text: "Amazing experience from start to finish! They made buying my first home stress-free and guided me through every step of the process."
                },
                {
                  name: "Amit Patel",
                  role: "Business Owner",
                  image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
                  rating: 5,
                  text: "Outstanding commercial property solutions! Their expertise in the market helped me secure the perfect location for my business at a great price."
                },
                {
                  name: "Sneha Reddy",
                  role: "Property Developer",
                  image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
                  rating: 5,
                  text: "Incredible attention to detail and customer service. They understood exactly what I was looking for and delivered beyond my expectations."
                },
                {
                  name: "Vikram Singh",
                  role: "Real Estate Investor",
                  image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
                  rating: 5,
                  text: "Professional, reliable, and results-driven. I've worked with many agencies, but none compare to their level of service and market knowledge."
                },
                {
                  name: "Kavya Nair",
                  role: "Home Owner",
                  image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150",
                  rating: 5,
                  text: "They made our dream home a reality! The entire process was smooth, transparent, and they were always there to support us."
                }
              ].map((testimonial, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-80 bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 group"
                >
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
                      <p className="text-orange-600 text-sm font-semibold">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">⭐</span>
                    ))}
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="mt-6 flex justify-center">
                    <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-20 bg-gradient-to-br from-slate-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 gradient-text">
              Project Demo / Watch Video
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See our projects come to life and discover how we transform dreams into reality
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500">
              {/* Video Container with 16:9 Aspect Ratio */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                {/* <video 
                  controls 
                   autoPlay
                    muted
                    playsInline
                  src="https://www.youtube.com/embed/Jfb9lZErme0?autoplay=1&mute=1"
                  
                  className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg object-cover"
                  poster="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200"
                >
                  Your browser does not support the video tag.
                </video> */}

             
  <iframe
   id="youtubeVideo"
    src="https://www.youtube.com/embed/Jfb9lZErme0?enablejsapi=1&mute=1&controls=1&rel=0&playsinline=1"
    className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg"
     allow="autoplay; encrypted-media"
    allowFullScreen
    
  ></iframe>







              </div>
              
              {/* Video Description */}
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Experience Our Excellence
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Watch this comprehensive overview of our completed projects, client testimonials, 
                  and the innovative solutions we bring to every real estate venture.
                </p>
                
                {/* Video Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl p-4">
                    <div className="text-2xl font-bold text-orange-600">12-24 Months</div>
                    <div className="text-sm text-gray-600">Projects Duration</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-4">
                    <div className="text-2xl font-bold text-blue-600">High Quality</div>
                    <div className="text-sm text-gray-600">Materials</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4">
                    <div className="text-2xl font-bold text-green-600">Real Projects</div>
                    <div className="text-sm text-gray-600">Cutting edge technology</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Success in Numbers
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Years of dedication and hard work have led to these impressive achievements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Properties Sold", icon: "🏠" },
              { number: "1000+", label: "Happy Clients", icon: "😊" },
              { number: "50+", label: "Team Members", icon: "👥" },
              { number: "10+", label: "Years Experience", icon: "🏆" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center group hover:scale-110 transition-all duration-500"
              >
                <div className="text-6xl mb-4 group-hover:animate-bounce">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-32 w-12 h-12 bg-pink-300 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 right-10 w-24 h-24 bg-green-300 rounded-full animate-pulse"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Join thousands of satisfied customers who found their perfect home with us
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => {
                const element = document.getElementById('enquiry');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Start Your Journey Today
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              Get Free Consultation
            </button>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/logo1.png" 
                  alt="Company Logo" 
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white">Sunrise Marketing Solutions</h3>
                  <p className="text-orange-400 text-sm">Impact Better Living</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                We are dedicated to providing exceptional real estate services with a focus on innovation, 
                quality, and customer satisfaction. Our experienced team helps you find the perfect property 
                solutions for your needs.
              </p>
              <p className="text-gray-400 text-sm">
                Transforming dreams into reality with premium properties and professional service excellence.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-orange-400">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', section: 'home' },
                  { name: 'About Us', section: 'about' },
                  { name: 'Services', section: 'location' },
                  { name: 'Contact', section: 'contact' },
                  { name: 'Enquiry', section: 'enquiry' }
                ].map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        const element = document.getElementById(link.section);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-300 hover:translate-x-2 transform inline-block"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-orange-400">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Sri Sai Shine, Peddanna Reddy Layout<br />
                      Horamavu, Bangalore - 560043
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <a 
                    href="tel:+919963632436" 
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
                  >
                    +91 9963632436
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <a 
                    href="mailto:sunrisemarketing007@gmail.com" 
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm"
                  >
                    sunrisemarketing007@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">Sun-Sat (9AM-6PM)</p>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="mt-6">
                <h5 className="text-sm font-semibold mb-3 text-orange-400">Follow Us</h5>
                <div className="flex space-x-4">
                  {[
                    { icon: "📘", name: "Facebook", href: "#" },
                    { icon: "📷", name: "Instagram", href: "#" },
                    { icon: "🐦", name: "Twitter", href: "#" },
                    { icon: "💼", name: "LinkedIn", href: "#" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-gray-700 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                      title={social.name}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2024 Sunrise Marketing Solutions. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {/* <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50 group"
        aria-label="Back to top"
      >
        <svg 
          className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button> */}
    </div>
  );
};




export default Home;