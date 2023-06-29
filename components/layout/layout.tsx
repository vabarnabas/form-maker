import { useRouter } from "next/router"
import React from "react"
import { HiDocumentDuplicate, HiPlus } from "react-icons/hi"

interface Props {
  title?: string
  children?: JSX.Element | JSX.Element[]
}

export default function Layout({ children, title }: Props) {
  const router = useRouter()

  return (
    <div className="flex min-h-screen w-screen select-none flex-col items-center justify-start text-gray-700">
      {children}
      <div className="fixed inset-x-0 top-0 flex h-14 items-center justify-center border-b bg-white">
        <div className="flex w-full max-w-[1024px] items-center justify-between px-4">
          <p
            onClick={() => router.push("/")}
            className="flex cursor-pointer items-center justify-center gap-x-1 text-xl font-medium"
          >
            <HiDocumentDuplicate className="text-pink-500" /> {title}
          </p>
          <button
            onClick={() => router.push("/forms/new")}
            className="flex items-center gap-x-1 rounded bg-pink-500 px-3 py-1 text-sm text-white hover:bg-pink-600 sm:col-span-2"
          >
            <HiPlus /> Create Form
          </button>
        </div>
      </div>
    </div>
  )
}
