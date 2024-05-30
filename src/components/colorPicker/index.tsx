import { Sketch } from '@uiw/react-color';
import React, { useState } from 'react';

const ColorPicker = () => {
  const [currentColor, setCurrentColor] = useState('#39FF14');

  function handleColorChange(color) {
    console.log(color.hex);
    setCurrentColor(color.hex);
  }

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
        {/* <label htmlFor="SelectedColor">Select a Color</label> */}
      </div>
    </div>
  );
};

export default ColorPicker;
