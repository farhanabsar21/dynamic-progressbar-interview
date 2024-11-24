import { useState } from "react";
import DynamicProgressBar from "../components/DynamicProgressBar";

function App() {
  const [changedValue, setChangedValue] = useState<number>(0);
  const onChangeNewValue = (newValue: number) => {
    setChangedValue(newValue);
  };
  return (
    <div className="h-screen w-full bg-white flex items-center justify-center">
      <div>
        <DynamicProgressBar initialValue={0} onChange={onChangeNewValue} />
        <div className="mt-4 flex justify-center items-center gap-3">
          <span>Your progress is:</span>
          <span className="w-[42px]">{changedValue}%</span>
        </div>
      </div>
    </div>
  );
}

export default App;
