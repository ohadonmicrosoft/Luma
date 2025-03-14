import React from "react";
import { useTranslation } from "next-i18next";

export interface Specification {
  id: string;
  name: string;
  value: string;
  category: string;
}

export interface TechnicalSpecsProps {
  specifications: Specification[];
}

const TechnicalSpecs: React.FC<TechnicalSpecsProps> = ({ specifications }) => {
  const { t } = useTranslation("common");

  // Group specifications by category
  const groupedSpecs = specifications.reduce((acc, spec) => {
    if (!acc[spec.category]) {
      acc[spec.category] = [];
    }
    acc[spec.category].push(spec);
    return acc;
  }, {} as Record<string, Specification[]>);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">
        {t("technicalSpecifications")}
      </h3>

      {Object.entries(groupedSpecs).map(([category, specs]) => (
        <div key={category} className="mb-6">
          <h4 className="text-lg font-medium mb-3">{category}</h4>
          <div className="grid grid-cols-1 gap-2">
            {specs.map((spec) => (
              <div key={spec.id} className="flex py-2 border-b">
                <span className="w-1/3 text-gray-600">{spec.name}</span>
                <span className="w-2/3 font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechnicalSpecs;
