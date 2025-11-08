import React, { useState } from 'react';
import { Send, User, Mail, Phone, MessageSquare, Tag, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  mobile?: string;
  subject?: string;
  message?: string;
}

const EnquiryForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    subject: '',
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

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      
      // For now, we'll store in localStorage to simulate database storage
      const existingEnquiries = JSON.parse(localStorage.getItem('enquiries') || '[]');
      const newEnquiry = {
        id: Date.now(),
        ...formData,
        status: 'unread',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      existingEnquiries.push(newEnquiry);
      localStorage.setItem('enquiries', JSON.stringify(existingEnquiries));

      setSubmitStatus('success');
      setSubmitMessage('Thank you! Your enquiry has been submitted successfully. We will get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        message: ''
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error submitting your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Make an Enquiry</h3>
        <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
      </div>

      {/* Success/Error Messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl mb-6 flex items-center animate-fade-in-up">
          <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0" />
          <div>
            <p className="font-semibold">Success!</p>
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
        {/* Name and Email Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Full Name *
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
              Email Address *
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

        {/* Mobile and Subject Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Mobile Number *
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
              <Tag className="w-4 h-4 inline mr-2" />
              Subject *
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={`w-full py-4 px-6 rounded-xl border transition-all duration-300 outline-none ${
                errors.subject 
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
              }`}
            >
              <option value="">Select a subject</option>
              <option value="Property Inquiry">Property Inquiry</option>
              <option value="Investment Consultation">Investment Consultation</option>
              <option value="Rental Services">Rental Services</option>
              <option value="Commercial Properties">Commercial Properties</option>
              <option value="Legal Assistance">Legal Assistance</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Other">Other</option>
            </select>
            {errors.subject && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.subject}
              </p>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className={`w-full py-4 px-6 rounded-xl border transition-all duration-300 outline-none resize-none ${
              errors.message 
                ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
                : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
            }`}
            placeholder="Please describe your inquiry in detail..."
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Submit Enquiry
            </>
          )}
        </button>
      </form>

      {/* Form Info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl">
        <p className="text-sm text-gray-600 text-center">
          <strong>Note:</strong> All fields marked with (*) are required. We typically respond within 24 hours during business days.
        </p>
      </div>
    </div>
  );
};

export default EnquiryForm;