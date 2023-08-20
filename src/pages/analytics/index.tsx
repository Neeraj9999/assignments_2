import React from "react";
import LineChart from "./lineChart";
import Maps from "./maps";

export default function Index() {
  const [flag, setFlag] = React.useState<boolean>(false);
  return (
    <div className="flex-1 bg-stone-950 text-stone-300">
      <div
        className="p-1 h-10 w-10 grid place-items-center text-xs absolute z-10 bottom-16 md:bottom-4 right-4 rounded-full bg-stone-700 hover:bg-stone-600 hover:scale-105 hover:shadow-md cursor-pointer"
        onClick={() => setFlag((prev) => !prev)}
      >
        {flag ? "Map" : "Graph"}
      </div>
      <div className="h-full w-full flex sticky">{flag ? <LineChart /> : <Maps />}</div>
    </div>
  );
}
