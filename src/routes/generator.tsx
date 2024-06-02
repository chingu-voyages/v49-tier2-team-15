import { useContext } from 'react';

import { ColorPreview } from '@/components';
import { BasicForm, GuidedForm } from '@/components';
import { ColorContext } from '@/context/ColorContext';

export default function Generator() {
  const { accentColor } = useContext(ColorContext);

  return (
    <>
      <section
        className="grid gap-6 md:grid-cols-2"
        aria-label="color generator form"
      >
        <div className="space-y-6">
          <h2
            className="text-2xl text-center md:text-start"
            style={{ color: accentColor }}
          >
            Pick a colour if you know what you're looking for...
          </h2>
          <BasicForm />
        </div>

        <div className="space-y-6">
          <h2
            className="text-2xl text-center md:text-start"
            style={{ color: accentColor }}
          >
            Or get help here if you don't know where to start...
          </h2>
          <GuidedForm />
        </div>
      </section>

      <ColorPreview />
    </>
  );
}
