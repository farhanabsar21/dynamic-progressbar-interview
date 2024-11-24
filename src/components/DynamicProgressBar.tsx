import React, { useState, useRef, useEffect } from "react";
import { ProgressBarProps } from "../@types";

const DynamicProgressBar: React.FC<ProgressBarProps> = ({
  initialValue = 0,
  onChange,
}) => {
  const [value, setValue] = useState<number>(initialValue);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const updateProgressFromMouse = (e: React.MouseEvent | MouseEvent): void => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const newValue = Math.min(Math.max((x / width) * 100, 0), 100);
      const roundedValue = Math.round(newValue);
      setValue(roundedValue);
      onChange?.(roundedValue);
    }
  };

  const handleMouseDown = (e: React.MouseEvent): void => {
    setIsDragging(true);
    updateProgressFromMouse(e);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (isDragging) {
      updateProgressFromMouse(e);
    }
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  return (
    <div className="w-[25rem] max-w-md mx-auto p-4">
      <div className="relative pt-3 pb-3" ref={progressRef}>
        <div
          className="relative h-4 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
          role="progressbar"
          onClick={updateProgressFromMouse}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(45deg, violet, indigo, blue, green, yellow, orange, red)",
              clipPath: `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`,
            }}
          />
        </div>

        <div
          className="absolute top-1 w-10 -ml-5 flex items-center justify-center"
          role="button"
          style={{
            left: `${value}%`,
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
        >
          <div
            className="w-8 h-8 bg-black rounded-full shadow-lg border-2 border-white"
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          />
        </div>
      </div>
    </div>
  );
};

export default DynamicProgressBar;
