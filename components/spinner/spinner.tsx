import React from "react"
import { PiNewspaperClippingFill } from "react-icons/pi"

export default function Spinner() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <PiNewspaperClippingFill className="animate-ping text-6xl text-pink-500" />
    </div>
  )
}
