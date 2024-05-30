import { Sketch } from '@uiw/react-color';
import React, { useState } from 'react';

const ColorPicker = () => {
  const [currentColor, setCurrentColor] = useState('#39FF14');

  // function handleColorchange(event) {
  //   setColor(event.target.value);
  // }

  return (
    <div className="color-picker-container flex justify-between w-1/2">
      <Sketch color={currentColor} />
      <div className="w-3/5">
        <div
          className="color-display h-32 justify-center content-center rounded-md"
          style={{ backgroundColor: currentColor }}
        >
          <p className="text-center">Selected Color</p>
        </div>
        {/* <label htmlFor="SelectedColor">Select a Color</label> */}
        <input type="text" value={currentColor} />
      </div>
    </div>
  );
};

export default ColorPicker;
