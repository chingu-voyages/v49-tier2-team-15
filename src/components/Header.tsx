import { useContext } from 'react';

import { ColorContext } from '@/context/ColorContext';

export default function Header() {
  const { accentColor } = useContext(ColorContext);

  return (
    <header
      className="grid place-content-center max-w-[981px] h-[220px] lg:h-60 border-[12px] rounded-[10px] text-white"
      style={{ color: accentColor, borderColor: accentColor }}
    >
      <h1 className="text-5xl font-water-brush lg:text-9xl">Color Inspo</h1>
    </header>
  );
}
