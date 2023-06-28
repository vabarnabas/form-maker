import React from "react";
import { HiDocumentDuplicate } from "react-icons/hi";

interface Props {
  title?: string;
  children?: JSX.Element | JSX.Element[];
}

export default function Layout({ children, title }: Props) {
  return (
    <div className="w-screen min-h-screen flex flex-col justify-start items-center text-gray-700 select-none">
      {children}
      <div className="fixed inset-x-0 top-0 h-14 border-b flex justify-center items-center bg-white">
        <div className="text-xl w-full flex max-w-[1024px] px-4 font-medium">
          <p className="flex justify-center items-center gap-x-1">
            <HiDocumentDuplicate className="text-pink-500" /> {title}
          </p>
        </div>
      </div>
    </div>
  );
}
