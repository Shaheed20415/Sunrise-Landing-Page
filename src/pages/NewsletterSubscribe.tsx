// import React, { useState } from 'react';
// import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

// const NewsletterSubscribe = () => {
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setStatus('error');
//       setMessage('Please enter a valid email address');
//       return;
//     }

//     setIsSubmitting(true);
//     setStatus('idle');

//     try {
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       setStatus('success');
//       setMessage('Thank you for subscribing! Check your inbox for confirmation.');
//       setEmail('');
//       setName('');

//       setTimeout(() => {
//         setStatus('idle');
//         setMessage('');
//       }, 5000);
//     } catch (error) {
//       setStatus('error');
//       setMessage('Something went wrong. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-2xl p-8 md:p-12 shadow-2xl">
//       <div className="max-w-2xl mx-auto text-center">
//         <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
//           <Mail className="w-8 h-8 text-orange-500" />
//         </div>

//         <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
//           Stay Updated with Latest Properties
//         </h3>

//         <p className="text-white/90 text-lg mb-8">
//           Subscribe to our newsletter and get exclusive property deals, investment tips, and market insights delivered to your inbox.
//         </p>

//         {status === 'success' && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl mb-6 flex items-center justify-center animate-fade-in-up">
//             <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0" />
//             <p className="font-semibold">{message}</p>
//           </div>
//         )}

//         {status === 'error' && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl mb-6 flex items-center justify-center animate-fade-in-up">
//             <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0" />
//             <p className="font-semibold">{message}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Your Name (Optional)"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full px-6 py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-md text-white placeholder-white/70 focus:border-white focus:bg-white/20 outline-none transition-all duration-300"
//             />
//             <input
//               type="email"
//               placeholder="Your Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-6 py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-md text-white placeholder-white/70 focus:border-white focus:bg-white/20 outline-none transition-all duration-300"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full md:w-auto bg-white text-orange-600 hover:bg-gray-50 disabled:bg-gray-300 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center mx-auto"
//           >
//             {isSubmitting ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mr-2"></div>
//                 Subscribing...
//               </>
//             ) : (
//               <>
//                 <Mail className="w-5 h-5 mr-2" />
//                 Subscribe Now
//               </>
//             )}
//           </button>
//         </form>

//         <p className="text-white/70 text-sm mt-6">
//           We respect your privacy. Unsubscribe at any time.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default NewsletterSubscribe;



import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');

    try {
//       const response = await fetch("http://localhost/sunrise_project/project/admin/subscribe.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email }),
// });



const response = await fetch("/api/subscribe", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email }),
});









      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("Thank you for subscribing! Check your inbox.");
        setEmail("");
        setName("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Server error! Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-2xl p-8 md:p-12 shadow-2xl">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Mail className="w-8 h-8 text-orange-500" />
        </div>

        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Stay Updated with Latest Properties
        </h3>

        <p className="text-white/90 text-lg mb-8">
          Subscribe to our newsletter and get exclusive property deals, investment tips, and market insights delivered to your inbox.
        </p>

        {status === "success" && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl mb-6 flex items-center justify-center animate-fade-in-up">
            <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0" />
            <p className="font-semibold">{message}</p>
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl mb-6 flex items-center justify-center animate-fade-in-up">
            <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0" />
            <p className="font-semibold">{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name (Optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-md text-white placeholder-white/70 focus:border-white focus:bg-white/20 outline-none transition-all duration-300"
            />

            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-6 py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-md text-white placeholder-white/70 focus:border-white focus:bg-white/20 outline-none transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto bg-white text-orange-600 hover:bg-gray-50 disabled:bg-gray-300 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center mx-auto"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="w-5 h-5 mr-2" />
                Subscribe Now
              </>
            )}
          </button>
        </form>

        <p className="text-white/70 text-sm mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSubscribe;

