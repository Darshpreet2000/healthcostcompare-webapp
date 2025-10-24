import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white/80 backdrop-blur-md shadow-lg mt-12 py-6">
      <div className="container mx-auto px-6 text-center text-sm text-gray-600">
        Powered by Fivetran + BigQuery + Vertex AI
      </div>
    </footer>
  );
};

export default Footer;
