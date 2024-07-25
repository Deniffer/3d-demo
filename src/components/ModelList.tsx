import React, { useState, useEffect, useMemo } from "react";
import { useAppStore } from "../store/appStore";
import { Link } from "react-router-dom";

export const ModelList: React.FC = () => {
  const models = useAppStore((state) => state.models);
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1100) setColumns(4);
      else if (width > 700) setColumns(3);
      else if (width > 500) setColumns(2);
      else setColumns(1);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columnModels = useMemo(() => {
    return Array.from({ length: columns }, (_, colIndex) =>
      models.filter((_, index) => index % columns === colIndex)
    );
  }, [models, columns]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">3D Models</h2>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`}
      >
        {columnModels.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col space-y-6">
            {column.map((model) => (
              <Link
                to={`/model/${model.id}`}
                key={model.id}
                className="group"
                aria-label={`View details for ${model.prompt}`}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  <div className="relative pb-[66.67%]">
                    <img
                      src={model.thumbnail_url}
                      alt={model.prompt}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 truncate group-hover:text-blue-600 transition-colors duration-300">
                      {model.prompt}
                    </h3>
                    <p className="text-sm text-gray-600">{model.type}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
