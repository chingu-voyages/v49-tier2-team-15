import { Sketch } from '@uiw/react-color';
import React, { useState } from 'react';

import { Button } from '../ui/button';

import { createBasicColorPrompt } from '@/helpers/generators';
import { useColorGenerator } from '@/hooks';

const BASIC = createBasicColorPrompt({
  initialColor: '#579fde',
  usage: 'social media',
});

const ColorPicker = () => {
  const [currentColor, setCurrentColor] = useState('#39FF14');

  function handleColorChange(color) {
    console.log(color.hex);
    setCurrentColor(color.hex);
  }

  function handleGetColors() {
    console.log(currentColor);
    updatePrompt(BASIC);
  }

  const { colors, loading, error, updatePrompt } = useColorGenerator();

  return (
    <div className="color-picker-container flex justify-between w-1/2">
      <Sketch color={currentColor} onChange={handleColorChange} />
      <div className="w-3/5">
        <div
          className="color-display h-32 justify-center content-center rounded-md"
          style={{ backgroundColor: currentColor }}
        >
          <p className="text-center">{currentColor}</p>
        </div>
        <Button className="my-3 w-full" onClick={handleGetColors}>
          Get me some color matches!
        </Button>
        <h2 className="text-xl">Loading Status</h2>
        {loading ? <div>loading</div> : null}

        <h2 className="text-xl">Errors</h2>
        {error ? <div className="text-red-500">{error?.message}</div> : null}
      </div>
    </div>
  );
};

export default ColorPicker;
