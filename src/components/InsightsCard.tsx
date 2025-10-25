import React from "react";
import { Brain, Lightbulb } from "lucide-react";
import GradientText from "./GradientText";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown";
import remarkGfm from "remark-gfm"; // Import remarkGfm

interface InsightsCardProps {
  title: string;
  summary: string;
  costVariation: string;
  patientQuestions: string[];
  fullInsightsMarkdown: string;
  onRegenerate?: () => void;
}

const renderers: Components = {
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full divide-y divide-gray-300 border border-gray-200 rounded-lg">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-b border-gray-200">
      {children}
    </td>
  ),
  p: ({ children }) => <p className="mb-4">{children}</p>,
  h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-3">{children}</h1>,
  h2: ({ children }) => <h2 className="text-xl font-bold mt-5 mb-2">{children}</h2>,
  h3: ({ children }) => <h3 className="text-lg font-bold mt-4 mb-2">{children}</h3>,
  ul: ({ children }) => <ul className="list-disc list-inside ml-4 mb-4 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside ml-4 mb-4 space-y-1">{children}</ol>,
  li: ({ children }) => <li className="mb-1">{children}</li>,
  hr: () => <hr className="my-8 border-t-2 border-gray-200" />,
};

const InsightsCard: React.FC<InsightsCardProps> = ({
  title,
  summary,
  costVariation,
  patientQuestions,
  fullInsightsMarkdown,
  onRegenerate,
}) => {
  return (
    <div className="bg-card rounded-2xl shadow-xl p-8 border border-blue-100 transform transition-all duration-300 ease-in-out hover:scale-[1.01]">
      <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3 mb-5">
        <Brain size={28} className="text-primary" /> <GradientText text={`AI Insights:`} />
      </h2>
      {/* Render full markdown content */}
      <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none text-gray-800 leading-relaxed mb-6">
        <ReactMarkdown components={renderers} remarkPlugins={[remarkGfm]}>
          {fullInsightsMarkdown}
        </ReactMarkdown>
      </div>

      {/* Reintroducing specific sections for clarity and visual emphasis */}
      <div className="space-y-6 mt-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Lightbulb size={22} className="text-accent" /> Why costs vary:
          </h3>
          <p className="text-gray-700 mt-2 leading-relaxed">{costVariation}</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Lightbulb size={22} className="text-accent" /> Patient questions to ask your provider:
          </h3>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2 pl-4">
            {patientQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-sm text-gray-600 italic mt-6">
        Generated using Vertex AI from real CMS & BigQuery data.
      </p>
    </div>
  );
};

export default InsightsCard;
