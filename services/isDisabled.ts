import { FormElement } from "@/types/form.types";
import { FieldValues, UseFormGetValues } from "react-hook-form";

export default function isDisabled(
  element: FormElement,
  getValues: UseFormGetValues<FieldValues>,
  index?: number
): boolean {
  return element.disabled
    ? !(element.disabled.notEqual
        ? getValues(
            index !== undefined
              ? `elements.${index}.${element.disabled.key}`
              : element.disabled.key
          ) !== element.disabled.value
        : getValues(
            index !== undefined
              ? `elements.${index}.${element.disabled.key}`
              : element.disabled.key
          ) === element.disabled.value)
    : false;
}
