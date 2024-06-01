import { useContext } from 'react';

import { ColorContext } from '@/context/ColorContext';

export default function Header() {
  const { accentColor } = useContext(ColorContext);

  return (
    <header
      className="grid w-full max-w-4xl p-12 mx-auto text-white rounded-lg place-content-center border-[12px]"
      style={{ color: accentColor, borderColor: accentColor }}
    >
      <h1 className="text-5xl font-water-brush md:text-7xl lg:text-9xl">
        Color Inspo
      </h1>
    </header>
  );
}
