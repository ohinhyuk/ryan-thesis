import { ReactNode } from "react";

interface ILayout {
  children: ReactNode;
}
export default function layout({ children }: ILayout) {
  return (
    <div className="flex p-[50px] justify-center align-center w-full h-full bg-slate-100">
      {children}
    </div>
  );
}
