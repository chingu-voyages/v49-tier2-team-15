import { Sketch } from '@uiw/react-color';
import type { ColorResult } from '@uiw/react-color';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { AiOutlineLoading3Quarters as LoadingIcon } from 'react-icons/ai';

import { Button } from '@/components/ui/button';
import { ColorContext } from '@/context/ColorContext';
import { createBasicColorPrompt } from '@/helpers/generators';
import { HEX } from '@/types';

const BasicForm = () => {
  const { accentColor, updatePrompt, loading } = useContext(ColorContext);
  const [currentColor, setCurrentColor] = useState<HEX>(accentColor);
  const [usage, setUsage] = useState('');

  const handleColorChange = (color: ColorResult) => {
    setCurrentColor(color.hex as HEX);
  };

  const handleUsageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsage(event.target.value);
  };

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const prompt = createBasicColorPrompt({
      initialColor: currentColor,
      usage: usage,
    });

    updatePrompt(prompt);
  }

  return (
    <form
      className="flex flex-wrap justify-center gap-6 md:justify-normal"
      onSubmit={handleSubmit}
    >
      <Sketch
        className="w-full max-w-64"
        color={currentColor}
        onChange={handleColorChange}
      />

      <div className="w-full max-w-64">
        <div
          className="grid w-full p-16 font-medium text-white rounded-md aspect-square place-content-center"
          style={{ backgroundColor: currentColor }}
        >
          {loading ? (
            <LoadingIcon size={40} className="animate-spin" />
          ) : (
            currentColor
          )}
        </div>

        <input
          className="block w-full px-5 py-3 my-4 text-gray-900 border rounded-md shadow-sm placeholder:text-gray-400 sm:text-sm"
          type="text"
          name="basic-usage"
          placeholder="I'm using these colors for..."
          required
          onChange={handleUsageChange}
        />

        <Button
          className="self-start w-full text-wrap disabled:opacity-50"
          style={{ color: accentColor, borderColor: accentColor }}
          onClick={handleSubmit}
          disabled={loading}
        >
          Get me some color matches!
        </Button>
      </div>
    </form>
  );
};

export default BasicForm;
