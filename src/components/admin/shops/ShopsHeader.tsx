
import React from 'react';

interface ShopsHeaderProps {
  title: string;
  description: string;
}

const ShopsHeader: React.FC<ShopsHeaderProps> = ({
  title,
  description
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ShopsHeader;
