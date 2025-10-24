import React from "react";
import { Star, DollarSign, MapPin } from "lucide-react"; // Assuming lucide-react for icons

interface Hospital {
  id: string;
  name: string;
  rating: number;
  avgTotalPayment: number;
  location: string; // e.g., "City, State"
}

interface HospitalGridProps {
  hospitals: Hospital[];
  onCompare?: (hospitalId: string) => void;
  onViewDetails?: (hospitalId: string) => void;
}

const HospitalGrid: React.FC<HospitalGridProps> = ({
  hospitals,
  onCompare,
  onViewDetails,
}) => {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Additional Hospitals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-primary mb-2 flex items-center gap-2">
                <span role="img" aria-label="hospital">🏥</span> {hospital.name}
              </h3>
              <p className="flex items-center gap-2 text-gray-700">
                <Star size={18} className="text-yellow-500" /> {hospital.rating}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <DollarSign size={18} className="text-green-600" />{" "}
                <span className="font-bold">{formatCurrency(hospital.avgTotalPayment)}</span>
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <MapPin size={18} className="text-red-500" /> {hospital.location}
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              {onCompare && (
                <button
                  onClick={() => onCompare(hospital.id)}
                  className="flex-1 bg-accent text-white px-3 py-2 rounded-full text-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-colors duration-200"
                >
                  Compare
                </button>
              )}
              {onViewDetails && (
                <button
                  onClick={() => onViewDetails(hospital.id)}
                  className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200"
                >
                  View Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalGrid;
