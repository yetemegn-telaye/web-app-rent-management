import React from "react";


interface FilterSectionProps {
  areaRange: [number, number];
  setAreaRange: (range: [number, number]) => void;
  floorRange: [number, number];
  setFloorRange: (range: [number, number]) => void;
  selectedType: string | null;
  setSelectedType: (value: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  areaRange,
  setAreaRange,
  floorRange,
  setFloorRange,
  selectedType,
  setSelectedType,
  priceRange,
  setPriceRange,
}) => {
  // Define range options
  const areaOptions: [number, number][] = [
    [0, 50],
    [50, 100],
    [100, 200],
    [200, 1000],
  ];
  const floorOptions: [number, number][] = [
    [1, 3],
    [4, 6],
    [7, 10],
    [10, 100],
  ];
  const priceOptions: [number, number][] = [
    [0, 25000],
    [25000, 33000],
    [33000, 50000],
    [50000, 100000],
  ];
  const typeOptions = ['Office', 'Commercial', 'none'];

  return (
    <div className="flex flex-wrap gap-4 justify-center my-8">
      {/* Area */}
      <select
        className="border p-2 rounded"
        value={`${areaRange[0]}-${areaRange[1]}`}
        onChange={(e) => {
          const [min, max] = e.target.value.split('-').map(Number);
          setAreaRange([min, max]);
        }}
      >
        {areaOptions.map(([min, max], idx) => (
          <option key={idx} value={`${min}-${max}`}>
            {min} - {max} sq ft
          </option>
        ))}
      </select>

      {/* Floor */}
      <select
        className="border p-2 rounded"
        value={`${floorRange[0]}-${floorRange[1]}`}
        onChange={(e) => {
          const [min, max] = e.target.value.split('-').map(Number);
          setFloorRange([min, max]);
        }}
      >
        {floorOptions.map(([min, max], idx) => (
          <option key={idx} value={`${min}-${max}`}>
            {min} - {max} floor
          </option>
        ))}
      </select>

      {/* Type */}
      <select
        className="border p-2 rounded"
        value={selectedType || 'none'}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        {typeOptions.map((type, idx) => (
          <option key={idx} value={type}>
            {type}
          </option>
        ))}
      </select>

      {/* Price */}
      <select
        className="border p-2 rounded"
        value={`${priceRange[0]}-${priceRange[1]}`}
        onChange={(e) => {
          const [min, max] = e.target.value.split('-').map(Number);
          setPriceRange([min, max]);
        }}
      >
        {priceOptions.map(([min, max], idx) => (
          <option key={idx} value={`${min}-${max}`}>
            {min} - {max} ETB
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSection;
