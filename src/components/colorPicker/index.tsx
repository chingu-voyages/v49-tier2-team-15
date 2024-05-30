import { Sketch } from '@uiw/react-color';
import React, { useState } from 'react';

import { Button } from '../ui/button';

import { createBasicColorPrompt } from '@/helpers/generators';
import { useColorGenerator } from '@/hooks';

const ColorPicker = () => {
  const [currentColor, setCurrentColor] = useState('#39FF14');
  const [usage, setUsage] = useState('interior design');

  const BASIC = createBasicColorPrompt({
    initialColor: currentColor,
    usage: usage,
  });

  const handleColorChange = (color) => {
    setCurrentColor(`${color.hex}`);
  };

  const handleUsageChange = (event) => {
    // console.log(event.target.value);
    setUsage(event.target.value);
  };

  function handleGetColors() {
    // console.log(`${currentColor} & ${usage}`);
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
        <input
          onChange={handleUsageChange}
          type="text"
          placeholder="I'm using these colors for..."
          name="basic-usage"
          className="block w-full rounded-md border-0 px-3.5 py-2 my-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        ></input>
        <Button className=" w-full" onClick={handleGetColors}>
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
