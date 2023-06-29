import autoAnimate from "@formkit/auto-animate"
import React, { useEffect, useRef } from "react"

import { FormElement } from "@/types/form.types"

import FormElementRender from "../form-element/form-element"

interface Props {
  elements: FormElement[]
  index: number
}

export default function FieldForm({ elements, index }: Props) {
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  return (
    <div ref={parent} className="flex flex-col gap-y-2">
      {elements.map((element) => (
        <FormElementRender
          key={element.key}
          element={element}
          isFieldArray={{ field: "elements", index }}
        />
      ))}
    </div>
  )
}
