// import { useState } from "react";
// import { MapPin, X } from "lucide-react";

// export default function RentalSection() {
//   const [selectedRental, setSelectedRental] = useState(null);

//   const rentals = [
//     { title: "Furnished Apartment", rent: "₹25,000/month", location: "City Center", type: "Residential", image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800" },
//     { title: "Office Space", rent: "₹80,000/month", location: "Business District", type: "Commercial", image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800" },
//     { title: "Retail Shop", rent: "₹35,000/month", location: "Shopping Area", type: "Retail", image: "https://images.pexels.com/photos/273209/pexels-photo-273209.jpeg?auto=compress&cs=tinysrgb&w=800" },
//     { title: "Warehouse", rent: "₹50,000/month", location: "Industrial Zone", type: "Industrial", image: "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800" },
//     { title: "Co-working Space", rent: "₹15,000/month", location: "Tech Hub", type: "Shared Office", image: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800" },
//     { title: "Studio Flat", rent: "₹18,000/month", location: "Residential Area", type: "Studio", image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800" }




//   ];

//   return (
//     <section id="rental" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

//           {rentals.map((rental, index) => (
//             <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
//               <img src={rental.image} className="w-full h-48 object-cover" />
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-800">{rental.title}</h3>
//                 <p className="text-purple-600 font-semibold">{rental.rent}</p>

//                 <button
//                   onClick={() => setSelectedRental(rental)}
//                   className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}

//         </div>

//         {/* POPUP */}
//         {selectedRental && (
//           <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-xl max-w-sm w-full relative">
//               <button onClick={() => setSelectedRental(null)} className="absolute right-3 top-3">
//                 <X size={20} />
//               </button>
//               <img src={selectedRental.image} className="rounded-md w-full h-40 object-cover" />
//               <h3 className="text-xl font-bold mt-4">{selectedRental.title}</h3>
//               <p className="text-purple-600">{selectedRental.rent}</p>
//               <p className="text-gray-600">{selectedRental.location}</p>
//             </div>
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }




import { useState } from "react";
import { MapPin, X, Phone, MessageCircle } from "lucide-react";

export default function RentalSection() {
  const [selectedRental, setSelectedRental] = useState(null);

  const rentals = [
    {
      title: "Furnished Apartment",
      rent: "₹25,000/month",
      location: "City Center",
      type: "Residential",
      area: "1200 sq.ft",
      phone: "+91 9963632436",
      amenities: ["Parking", "Balcony", "24/7 Water", "Security"],
      description:
        "A fully-furnished apartment in the heart of the city. Close to malls, metro, schools, and hospitals. Peaceful location with 24/7 water and security.",
      image:
        "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Office Space",
      rent: "₹80,000/month",
      location: "Business District",
      type: "Commercial",
      area: "2200 sq.ft",
      phone: "+91 9963632436",
      amenities: ["Wi-Fi", "Conference Room", "CCTV", "Power Backup"],
      description:
        "Premium office space located in the main business hub — ideal for IT companies, startups, or corporate offices.",
      image:
        "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Retail Shop",
      rent: "₹35,000/month",
      location: "Shopping Area",
      type: "Retail",
      area: "900 sq.ft",
      phone: "+91 9963632436",
      amenities: ["Footfall Zone", "Parking", "Security"],
      description:
        "Retail shop located in a high footfall commercial area, suitable for clothing, mobiles, or other commercial outlets.",
      image:
        "https://images.pexels.com/photos/273209/pexels-photo-273209.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Warehouse",
      rent: "₹50,000/month",
      location: "Industrial Zone",
      type: "Industrial",
      area: "3500 sq.ft",
      phone: "+91 9963632436",
      amenities: ["Truck Access", "24/7 Security", "Power Backup"],
      description:
        "Spacious warehouse perfect for logistics, storage, and industrial use with easy truck entry.",
      image:
        "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Co-working Space",
      rent: "₹15,000/month",
      location: "Tech Hub",
      type: "Shared Office",
      area: "600 sq.ft",
      phone: "+91 9963632436",
      amenities: ["Wi-Fi", "Meeting Rooms", "Cafeteria"],
      description:
        "Shared co-working office with networking opportunities, perfect for freelancers and startups.",
      image:
        "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      title: "Studio Flat",
      rent: "₹18,000/month",
      location: "Residential Area",
      type: "Studio",
      area: "450 sq.ft",
      phone: "+91 9963632436",
      amenities: ["Modular Kitchen", "Balcony", "Parking"],
      description:
        "Ideal for bachelors and students. A cozy studio flat located in a peaceful residential area.",
      image:
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  return (
    <section id="rental" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rentals.map((rental, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <img src={rental.image} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{rental.title}</h3>
                <p className="text-purple-600 font-semibold">{rental.rent}</p>

                <button
                  onClick={() => setSelectedRental(rental)}
                  className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Popup Details Modal */}
        {selectedRental && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-6 rounded-xl max-w-lg w-full relative overflow-y-auto max-h-[90vh]">
              <button onClick={() => setSelectedRental(null)} className="absolute right-3 top-3 p-1 bg-gray-100 rounded-full">
                <X size={20} />
              </button>

              <img src={selectedRental.image} className="rounded-md w-full h-40 object-cover" />

              <h3 className="text-2xl font-bold mt-4">{selectedRental.title}</h3>
              <p className="text-purple-600 font-semibold">{selectedRental.rent}</p>
              <p className="text-gray-600 flex items-center mt-1"><MapPin size={15} className="mr-1" />{selectedRental.location}</p>

              <p className="mt-3"><strong>Area:</strong> {selectedRental.area}</p>
              <p className="mt-2"><strong>Type:</strong> {selectedRental.type}</p>

              <p className="mt-3"><strong>Property Description:</strong><br />{selectedRental.description}</p>

              <div className="mt-3">
                <strong>Amenities:</strong>
                <ul className="list-disc ml-6 mt-1 text-gray-700">
                  {selectedRental.amenities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* ✅ Contact Buttons */}
              <div className="mt-5 flex gap-3">
                <a href={`tel:${selectedRental.phone}`} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg w-full justify-center">
                  <Phone size={18} /> Call Owner
                </a>

                <a
                  href={`https://wa.me/${selectedRental.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg w-full justify-center"
                >
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
