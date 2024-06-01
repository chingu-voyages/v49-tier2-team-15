import { useContext } from 'react';

import { ColorPreview } from '@/components';
import { BasicForm } from '@/components';
import { ColorContext } from '@/context/ColorContext';

export default function Generator() {
  const { accentColor } = useContext(ColorContext);

  return (
    <>
      <h2 className="text-2xl" style={{ color: accentColor }}>
        Pick a colour if you know what you're looking for...
      </h2>

      <section
        className="flex flex-col gap-6 justify-content-center"
        aria-label="color generator form"
      >
        <BasicForm />
      </section>

      <ColorPreview />
    </>
  );
}
