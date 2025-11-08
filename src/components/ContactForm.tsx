import React, { useState } from 'react';
import { Send, User, Mail, Phone, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  mobile: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  mobile?: string;
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call - Replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store in localStorage to simulate database storage
      const existingContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      const newContact = {
        id: Date.now(),
        ...formData,
        status: 'new',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      existingContacts.push(newContact);
      localStorage.setItem('contacts', JSON.stringify(existingContacts));

      setSubmitStatus('success');
      setSubmitMessage('Thank you for contacting us! We will get back to you within 24 hours.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        mobile: '',
        message: ''
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
      
      {/* Success/Error Messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl mb-6 flex items-center animate-fade-in-up">
          <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0" />
          <div>
            <p className="font-semibold">Message Sent Successfully!</p>
            <p className="text-sm">{submitMessage}</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl mb-6 flex items-center animate-fade-in-up">
          <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0" />
          <div>
            <p className="font-semibold">Error!</p>
            <p className="text-sm">{submitMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Your Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full py-4 px-6 rounded-xl border transition-all duration-300 outline-none ${
                errors.name 
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Your Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full py-4 px-6 rounded-xl border transition-all duration-300 outline-none ${
                errors.email 
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Your Phone *
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className={`w-full py-4 px-6 rounded-xl border transition-all duration-300 outline-none ${
              errors.mobile 
                ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
            }`}
            placeholder="Enter your mobile number"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.mobile}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Your Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className={`w-full py-4 px-6 rounded-xl border transition-all duration-300 outline-none resize-none ${
              errors.message 
                ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
            }`}
            placeholder="Tell us how we can help you..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.message}
            </p>
          )}
          <p className="text-gray-500 text-sm mt-2">
            {formData.message.length}/500 characters
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Sending Message...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;