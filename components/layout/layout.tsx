import React from "react"
import { HiDocumentDuplicate } from "react-icons/hi"

interface Props {
  title?: string
  children?: JSX.Element | JSX.Element[]
}

export default function Layout({ children, title }: Props) {
  return (
    <div className="flex min-h-screen w-screen select-none flex-col items-center justify-start text-gray-700">
      {children}
      <div className="fixed inset-x-0 top-0 flex h-14 items-center justify-center border-b bg-white">
        <div className="flex w-full max-w-[1024px] px-4 text-xl font-medium">
          <p className="flex items-center justify-center gap-x-1">
            <HiDocumentDuplicate className="text-pink-500" /> {title}
          </p>
        </div>
      </div>
    </div>
  )
}
