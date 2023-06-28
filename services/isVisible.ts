import { FormElement } from "@/types/form.types";
import { FieldValues, UseFormGetValues } from "react-hook-form";

export default function isVisible(
  element: FormElement,
  getValues: UseFormGetValues<FieldValues>,
  index?: number
): boolean {
  let returnValue: boolean = true;

  if (!element.visible) return true;

  if (!Array.isArray(element.visible)) {
    return element.visible.notEqual
      ? getValues(
          index !== undefined
            ? `elements.${index}.${element.visible.key}`
            : element.visible.key
        ) !== element.visible.value
      : getValues(
          index !== undefined
            ? `elements.${index}.${element.visible.key}`
            : element.visible.key
        ) === element.visible.value;
  } else {
    for (const check of element.visible) {
      returnValue = returnValue
        ? check.notEqual
          ? getValues(
              index !== undefined ? `elements.${index}.${check.key}` : check.key
            ) !== check.value
          : getValues(
              index !== undefined ? `elements.${index}.${check.key}` : check.key
            ) === check.value
        : false;
    }
    return returnValue;
  }
}
