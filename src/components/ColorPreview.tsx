import { useContext } from 'react';

import { ColorContext } from '@/context/ColorContext';
import { getWCAGTextColor } from '@/lib/colors';

export default function ColorPreview() {
  const { colors } = useContext(ColorContext);

  return (
    <section
      className="flex flex-col flex-wrap md:flex-row"
      aria-label="hex color grid"
    >
      {colors.map((color) => (
        <div
          key={color}
          className="grid flex-1 p-16 font-medium text-white xl:aspect-[4/6] place-items-center"
          style={{ color: getWCAGTextColor(color), backgroundColor: color }}
        >
          {color.toUpperCase()}
        </div>
      ))}
    </section>
  );
}
