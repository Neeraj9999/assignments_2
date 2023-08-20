import React from "react";

export default function Index({ children }: { children: React.ReactNode }) {
  return <div className="p-2 flex-1 bg-stone-950 text-stone-300">{children}</div>;
}
