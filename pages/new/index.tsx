import autoAnimate from "@formkit/auto-animate"
import clsx from "clsx"
import React, { ElementType, useEffect, useRef } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs"

import FieldForm from "@/components/field-form/field-form"
import Layout from "@/components/layout/layout"
import { fieldForm } from "@/forms/field-form"
import { formInfoForm } from "@/forms/form-info-form"
import convertToForm, { Element } from "@/services/convertToForm"
import isVisible from "@/services/isVisible"
import { FormElement } from "@/types/form.types"

import FormElementRender from "../../components/form-element/form-element"

export default function NewForm() {
  const form = useForm()
  const { handleSubmit, getValues, watch, control } = form

  const { fields, append, remove, swap } = useFieldArray({
    name: "elements",
    control,
  })

  const parent = useRef(null)

  console.log(fieldForm)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const onSubmit = handleSubmit((data) =>
    console.log(convertToForm("Test Form", data.elements as Element[]))
  )

  watch()
  const elements = watch("elements")

  return (
    <Layout title="New Form">
      <FormProvider {...form}>
        <form
          className="mb-6 mt-20 flex w-full max-w-[1024px] flex-col gap-y-2 px-4"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-y-2">
            {formInfoForm.elements
              .filter((element) => isVisible(element, getValues))
              .map((element) => (
                <FormElementRender key={element.key} element={element} />
              ))}
          </div>
          <div
            ref={parent}
            className={clsx("flex flex-col gap-y-8", {
              "mt-8": fields.length !== 0,
            })}
          >
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-y-2 rounded-md">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-2xl font-medium first-letter:uppercase">
                    {elements[index].title ||
                      `${elements[index].type} ${elements
                        .slice(0, index + 1)
                        .map((element: FormElement) => element.type)
                        .reduce((acc: number, curr: ElementType) => {
                          return curr === getValues(`elements.${index}.type`)
                            ? acc + 1
                            : acc
                        }, 0)}`}
                  </p>
                  <div className="flex items-center gap-x-2 text-sm">
                    <BsCaretDownFill
                      onClick={() =>
                        fields.length > index + 1 && swap(index, index + 1)
                      }
                      className={clsx(
                        fields.length > index + 1
                          ? "cursor-pointer text-pink-500 hover:text-pink-600"
                          : "text-gray-400"
                      )}
                    />
                    <BsCaretUpFill
                      onClick={() => index > 0 && swap(index, index - 1)}
                      className={clsx(
                        index > 0
                          ? "cursor-pointer text-pink-500 hover:text-pink-600"
                          : "text-gray-400"
                      )}
                    />
                    <p
                      onClick={() => remove(index)}
                      className="ml-3 cursor-pointer text-pink-500 hover:text-pink-600"
                    >
                      Remove
                    </p>
                  </div>
                </div>
                <FieldForm
                  elements={fieldForm.elements.filter((element) =>
                    isVisible(element, getValues, index)
                  )}
                  index={index}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-y-4">
            <button
              onClick={(e) => {
                e.preventDefault()
                append({
                  type: "text",
                  title: undefined,
                  textStyle: "body",
                })
              }}
              className="rounded border border-pink-500 px-3 py-1.5 text-pink-500 hover:border-pink-600 hover:text-pink-600 sm:col-span-2"
            >
              Add Element
            </button>
            <button
              onClick={(e) => onSubmit(e)}
              className="rounded bg-pink-500 px-3 py-1.5 text-white hover:bg-pink-600 sm:col-span-2"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </Layout>
  )
}
