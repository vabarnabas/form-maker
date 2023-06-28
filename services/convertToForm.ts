import { FormElement } from "@/types/form.types";
import { FormHandler } from "./FormHandler";
import createKey from "./createKey";
import createOption from "./createOption";

export interface Element {
  title: string;
  isRequired?: boolean;
  isValidating?: boolean;
  placeholder?: string;
  min?: string;
  max?: string;
  options?: string;
  type: "input" | "select" | "checkbox";
}

export default function convertToForm(title: string, elements: Element[]) {
  const f = new FormHandler();
  f.title(title);

  for (const element of elements) {
    const index = f.addElement(element.type, createKey(element.title));

    f.editElement(index, {
      title: element.title,
      required: element.isRequired,
      placeholder: element.placeholder,
      min: element.min ? parseInt(element.min) : undefined,
      max: element.max ? parseInt(element.max) : undefined,
      options: element.options
        ? element.options.split(", ").map((option) => createOption(option))
        : undefined,
    });
  }

  return f.form;
}
