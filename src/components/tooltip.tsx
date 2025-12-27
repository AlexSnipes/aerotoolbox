import React, { FC, useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}
const Tooltip: FC<TooltipProps> = ({ text, children }) => {
  const [isTooltipVisible, setTooltipVisible] = useState<boolean>(false);

  const showTooltip = () => setTooltipVisible(true);
  const hideTooltip = () => setTooltipVisible(false);

  return (
    <>
      <span onMouseEnter={showTooltip} onMouseLeave={hideTooltip} className="cursor-pointer">
        {children}
      </span>

      {isTooltipVisible && (
        <span className="absolute z-50 bg-gray-800 text-white p-2 rounded-md text-sm -mt-8 ml-2 pointer-events-none">{text}</span>
      )}
    </>
  );
};

export default Tooltip;
