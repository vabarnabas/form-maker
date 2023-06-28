import Layout from "@/components/layout/layout";
import { fieldForm } from "@/forms/field-form";
import convertToForm, { Element } from "@/services/convertToForm";
import isDisabled from "@/services/isDisabled";
import isVisible from "@/services/isVisible";
import autoAnimate from "@formkit/auto-animate";
import React, { useEffect, useRef } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";

export default function NewForm() {
  const form = useForm();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    control,
    formState: { errors },
  } = form;

  const { fields, append } = useFieldArray({ name: "elements", control });

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const onSubmit = handleSubmit((data) =>
    console.log(convertToForm("Test Form", data.elements as Element[]))
  );

  watch();

  return (
    <Layout title="New Form">
      <form
        ref={parent}
        className="flex flex-col gap-4 w-full max-w-[1024px] px-4 mt-20 mb-6"
        onSubmit={onSubmit}
      >
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="shadow bg-gray-50 p-4 rounded-md flex flex-col gap-y-2"
          >
            {fieldForm.elements
              .filter((element) => isVisible(element, getValues, index))
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
                      disabled={isDisabled(element, getValues, index)}
                      className="border px-3 py-1 rounded bg-white w-full disabled:bg-gray-200"
                      placeholder={element.placeholder}
                      type={element.inputType}
                      {...register(
                        `elements.${index}.${element.key}`,
                        isVisible(element, getValues, index) &&
                          !isDisabled(element, getValues, index)
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
                      disabled={isDisabled(element, getValues, index)}
                      {...register(
                        `elements.${index}.${element.key}`,
                        isVisible(element, getValues, index) &&
                          !isDisabled(element, getValues, index)
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
                        disabled={isDisabled(element, getValues, index)}
                        {...register(
                          `elements.${index}.${element.key}`,
                          isVisible(element, getValues, index) &&
                            !isDisabled(element, getValues, index)
                            ? {
                                required: element.validations?.required
                                  ? `This is required.`
                                  : undefined,
                              }
                            : undefined
                        )}
                        id={`elements.${index}.${element.key}`}
                        className="accent-pink-500"
                        type="checkbox"
                      />
                      <label htmlFor={`elements.${index}.${element.key}`}>
                        {element.title}
                        {element.validations?.required ? (
                          <span className="text-rose-500"> *</span>
                        ) : null}
                      </label>
                    </div>
                  ) : null}
                  {/* <p className="text-rose-500 text-xs mt-1">
                    {errors.elements?.[index.toString()]?.message as string}
                  </p> */}
                </div>
              ))}
          </div>
        ))}
        <button
          onClick={(e) => {
            e.preventDefault();
            append({});
          }}
          className="border-pink-500 hover:border-pink-600 text-pink-500 hover:text-pink-600 border py-1.5 px-3 rounded sm:col-span-2"
        >
          Add Element
        </button>
        <button
          onClick={(e) => onSubmit(e)}
          className="bg-pink-500 hover:bg-pink-600 text-white py-1.5 px-3 rounded sm:col-span-2"
        >
          Submit
        </button>
      </form>
    </Layout>
  );
}
