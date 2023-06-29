import autoAnimate from "@formkit/auto-animate"
import React, { useEffect, useRef } from "react"
import { FormProvider, useForm } from "react-hook-form"

import Layout from "@/components/layout/layout"
import { newForm } from "@/forms/new-form"
import { testForm } from "@/forms/test-form"
import isVisible from "@/services/isVisible"

import FormElementRender from "../components/form-element/form-element"

export default function Home() {
  const form = useForm()
  const { handleSubmit, getValues, watch } = form

  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const onSubmit = handleSubmit((data) => console.log(data))

  watch()

  return (
    <Layout title={testForm.title}>
      <FormProvider {...form}>
        <form
          ref={parent}
          onSubmit={onSubmit}
          className="mb-6 mt-20 flex w-full max-w-[1024px] flex-col gap-2 px-4"
        >
          {newForm.elements
            .filter((element) => isVisible(element, getValues))
            .map((element) => (
              <FormElementRender key={element.key} element={element} />
            ))}
          <button className="rounded bg-pink-500 px-3 py-1.5 text-white hover:bg-pink-600 sm:col-span-2">
            Submit
          </button>
        </form>
      </FormProvider>
    </Layout>
  )
}
