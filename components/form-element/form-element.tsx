import clsx from "clsx"
import React from "react"
import { useFormContext } from "react-hook-form"

import isDisabled from "@/services/isDisabled"
import isVisible from "@/services/isVisible"
import { FormElement } from "@/types/form.types"

interface Props {
  element: FormElement
  isFieldArray?: { field: string; index: number }
}

export default function FormElementRender({ element, isFieldArray }: Props) {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext()

  return (
    <div
      key={
        isFieldArray
          ? `${isFieldArray.field}.${isFieldArray.index}.${element.key}`
          : element.key
      }
      className="w-full"
    >
      {element.type !== "checkbox" &&
      element.type !== "text" &&
      element.type !== "group" ? (
        <p className="text-sm">
          {element.title}
          {element.validations?.required ? (
            <span className="text-pink-500"> - required</span>
          ) : null}
        </p>
      ) : null}
      <p className="mb-1 text-xs font-light opacity-60">
        {element.description}
      </p>
      {element.type === "input" ? (
        <input
          disabled={isDisabled(element, getValues)}
          className="w-full rounded border bg-white px-3 py-1 disabled:bg-gray-200"
          placeholder={element.placeholder}
          type={element.inputType}
          {...register(
            isFieldArray
              ? `${isFieldArray.field}.${isFieldArray.index}.${element.key}`
              : element.key,
            isVisible(element, getValues) && !isDisabled(element, getValues)
              ? {
                  required: element.validations?.required
                    ? "This is required."
                    : undefined,
                  minLength: element.validations?.min
                    ? {
                        value: element.validations?.min,
                        message: `This needs to be at least ${element.validations.min} characters.`,
                      }
                    : undefined,
                  maxLength: element.validations?.max
                    ? {
                        value: element.validations?.max,
                        message: `This needs to be at least ${element.validations.max} characters.`,
                      }
                    : undefined,
                }
              : undefined
          )}
        />
      ) : null}
      {element.type === "select" ? (
        <select
          disabled={isDisabled(element, getValues)}
          {...register(
            isFieldArray
              ? `${isFieldArray.field}.${isFieldArray.index}.${element.key}`
              : element.key,
            isVisible(element, getValues) && !isDisabled(element, getValues)
              ? {
                  required: element.validations?.required
                    ? "This is required."
                    : undefined,
                }
              : undefined
          )}
          className="w-full rounded border bg-white px-3 py-1.5"
        >
          {element.options.map((option) => (
            <option
              key={`${
                isFieldArray
                  ? `${isFieldArray.field}.${isFieldArray.index}.${element.key}`
                  : element.key
              }-${option.value}`}
              value={option.value}
            >
              {option.title}
            </option>
          ))}
        </select>
      ) : null}
      {element.type === "checkbox" ? (
        <div className="flex w-full gap-x-2">
          <input
            disabled={isDisabled(element, getValues)}
            {...register(
              isFieldArray
                ? `${isFieldArray.field}.${isFieldArray.index}.${element.key}`
                : element.key,
              isVisible(element, getValues) && !isDisabled(element, getValues)
                ? {
                    required: element.validations?.required
                      ? "This is required."
                      : undefined,
                  }
                : undefined
            )}
            id={
              isFieldArray
                ? `${isFieldArray.field}.${isFieldArray.index}.${element.key}`
                : element.key
            }
            className="accent-pink-500"
            type="checkbox"
          />
          <label
            htmlFor={
              isFieldArray
                ? `${isFieldArray.field}.${isFieldArray.index}.${element.key}`
                : element.key
            }
          >
            {element.title}
            {element.validations?.required ? (
              <span className="text-sm text-pink-500"> - required</span>
            ) : null}
          </label>
        </div>
      ) : null}
      {element.type === "text" ? (
        <p
          key={
            isFieldArray
              ? `${isFieldArray.field}.${isFieldArray.index}.${element.key}`
              : element.key
          }
          className={clsx({
            "text-xs": element.textType === "paragraph-small",
            "text-sm": element.textType === "paragraph",
            "text-lg font-medium": element.textType === "heading-3",
            "text-xl font-medium": element.textType === "heading-2",
            "text-2xl font-medium": element.textType === "heading-1",
          })}
        >
          {element.title}
        </p>
      ) : null}
      {element.type === "group" ? (
        <div className="grid grid-cols-2 gap-2">
          {element.elements.map((groupElement) => (
            <FormElementRender
              key={`${element.key}-${groupElement.key}`}
              element={groupElement}
            />
          ))}
        </div>
      ) : null}
      <p className="mt-1 text-xs text-pink-500">
        {errors[element.key]?.message as string}
      </p>
    </div>
  )
}
