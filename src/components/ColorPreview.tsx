import { useContext } from 'react';

import { ColorContext } from '@/context/ColorContext';
import { getWCAGTextColor } from '@/lib/colors';

export default function ColorPreview() {
  const { colors } = useContext(ColorContext);

  const previewColor = colors.length ? colors : Array(5).fill('#ff206e');

  return (
    <section
      className="flex flex-col flex-wrap gap-1 md:flex-row"
      aria-label="hex color grid"
    >
      {previewColor.map((color, index) => (
        <div
          key={color + index}
          className="grid flex-1 p-16 font-medium text-white rounded-sm xl:aspect-[4/6] place-items-center"
          style={{ color: getWCAGTextColor(color), backgroundColor: color }}
        >
          {color.toUpperCase()}
        </div>
      ))}
    </section>
  );
}
