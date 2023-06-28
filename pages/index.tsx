import { testForm } from "@/forms/test-form";
import { HiDocumentDuplicate, HiDocumentText } from "react-icons/hi";
import React, { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import isVisible from "@/services/isVisible";
import isDisabled from "@/services/isDisabled";
import autoAnimate from "@formkit/auto-animate";
import Layout from "@/components/layout/layout";
import { newForm } from "@/forms/field-form";

export default function Home() {
  const form = useForm();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = form;

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const onSubmit = handleSubmit((data) => console.log(data));

  watch();

  return (
    <Layout title={testForm.title}>
      <form
        ref={parent}
        onSubmit={onSubmit}
        className="flex flex-col gap-2 w-full max-w-[1024px] px-4 mt-20 mb-6"
      >
        {newForm.elements
          .filter((element) => isVisible(element, getValues))
          .map((element) => (
            <div key={element.key} className="w-full">
              {element.type !== "checkbox" ? (
                <p className="text-sm">
                  {element.title}
                  {element.validations?.required ? (
                    <span className="text-rose-500"> *</span>
                  ) : null}
                </p>
              ) : null}
              <p className="text-xs mb-1 opacity-60 font-light">
                {element.description}
              </p>
              {element.type === "input" ? (
                <input
                  disabled={isDisabled(element, getValues)}
                  className="border px-3 py-1 rounded bg-white w-full disabled:bg-gray-200"
                  placeholder={element.placeholder}
                  type={element.inputType}
                  {...register(
                    element.key,
                    isVisible(element, getValues) &&
                      !isDisabled(element, getValues)
                      ? {
                          required: element.validations?.required
                            ? `This is required.`
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
                    element.key,
                    isVisible(element, getValues) &&
                      !isDisabled(element, getValues)
                      ? {
                          required: element.validations?.required
                            ? `This is required.`
                            : undefined,
                        }
                      : undefined
                  )}
                  className="border px-3 py-1.5 rounded bg-white w-full"
                >
                  {element.options.map((option) => (
                    <option
                      key={`${element.key}-${option.value}`}
                      value={option.value}
                    >
                      {option.title}
                    </option>
                  ))}
                </select>
              ) : null}
              {element.type === "checkbox" ? (
                <div className="flex gap-x-2 w-full">
                  <input
                    disabled={isDisabled(element, getValues)}
                    {...register(
                      element.key,
                      isVisible(element, getValues) &&
                        !isDisabled(element, getValues)
                        ? {
                            required: element.validations?.required
                              ? `This is required.`
                              : undefined,
                          }
                        : undefined
                    )}
                    id={element.key}
                    className="accent-pink-500"
                    type="checkbox"
                  />
                  <label htmlFor={element.key}>
                    {element.title}
                    {element.validations?.required ? (
                      <span className="text-rose-500"> *</span>
                    ) : null}
                  </label>
                </div>
              ) : null}
              <p className="text-rose-500 text-xs mt-1">
                {errors[element.key]?.message as string}
              </p>
            </div>
          ))}
        <button className="bg-pink-500 hover:bg-pink-600 text-white py-1.5 px-3 rounded sm:col-span-2">
          Submit
        </button>
      </form>
    </Layout>
  );
}
