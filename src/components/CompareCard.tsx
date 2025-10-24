import React from "react";
import { Star, DollarSign, MapPin, TrendingDown } from "lucide-react"; // Assuming lucide-react for icons

interface HospitalData {
  name: string;
  rating: number;
  avgTotalPayment: number;
  medicarePayment: number;
  location: string;
  distance: string;
}

interface CompareCardProps {
  hospitalA: HospitalData;
  hospitalB: HospitalData;
  summary: string;
}

const CompareCard: React.FC<CompareCardProps> = ({ hospitalA, hospitalB, summary }) => {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  return (
    <div className="bg-card rounded-2xl shadow-xl p-8 border border-blue-100 transform transition-all duration-300 ease-in-out hover:scale-[1.01]">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Hospital Comparison</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hospital A Card */}
        <div className="border border-gray-200 rounded-lg p-4 bg-card-hover">
          <h3 className="text-xl font-semibold text-primary mb-3">{hospitalA.name}</h3>
          <div className="space-y-2 text-gray-800">
            <p className="flex items-center gap-2">
              <Star size={18} className="text-yellow-500" /> Rating: <span className="font-bold">{hospitalA.rating}</span>
            </p>
            <p className="flex items-center gap-2">
              <DollarSign size={18} className="text-green-600" /> Avg Total Payment:{" "}
              <span className="font-bold text-gray-900">{formatCurrency(hospitalA.avgTotalPayment)}</span>
            </p>
            <p className="flex items-center gap-2">
              <TrendingDown size={18} className="text-blue-500" /> Medicare Payment:{" "}
              <span className="font-bold text-gray-900">{formatCurrency(hospitalA.medicarePayment)}</span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={18} className="text-red-500" /> Location: <span className="font-bold">{hospitalA.location}</span>
            </p>
            <p className="flex items-center gap-2">
              Distance: <span className="font-bold">{hospitalA.distance}</span>
            </p>
          </div>
        </div>

        {/* Hospital B Card */}
        <div className="border border-gray-200 rounded-lg p-4 bg-card-hover">
          <h3 className="text-xl font-semibold text-primary mb-3">{hospitalB.name}</h3>
          <div className="space-y-2 text-gray-800">
            <p className="flex items-center gap-2">
              <Star size={18} className="text-yellow-500" /> Rating: <span className="font-bold">{hospitalB.rating}</span>
            </p>
            <p className="flex items-center gap-2">
              <DollarSign size={18} className="text-green-600" /> Avg Total Payment:{" "}
              <span className="font-bold text-gray-900">{formatCurrency(hospitalB.avgTotalPayment)}</span>
            </p>
            <p className="flex items-center gap-2">
              <TrendingDown size={18} className="text-blue-500" /> Medicare Payment:{" "}
              {formatCurrency(hospitalB.medicarePayment)}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={18} className="text-red-500" /> Location: <span className="font-bold">{hospitalB.location}</span>
            </p>
            <p className="flex items-center gap-2">
              Distance: <span className="font-bold">{hospitalB.distance}</span>
            </p>
          </div>
        </div>
      </div>

      <p className="text-lg text-gray-800 italic mt-6 mb-4 text-center">{summary}</p>
    </div>
  );
};

export default CompareCard;
