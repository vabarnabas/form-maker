import {
  FormElement,
  FormObject,
  ElementType,
  Select,
  Checkbox,
  SelectView,
  Input,
  InputType,
  SelectOption,
  ElementComparison,
} from "@/types/form.types";

export class FormHandler {
  form = { elements: [] as FormElement[] } as FormObject;

  title(title: string) {
    return (this.form.title = title);
  }

  description(description: string) {
    return (this.form.description = description);
  }

  addElement(elementType: ElementType, key: string) {
    let element: FormElement;

    switch (elementType) {
      case ElementType.INPUT:
        element = { type: "input", inputType: "text", key } as Input;
        break;
      case ElementType.SELECT:
        element = { type: "select", key, view: "list" } as Select;
        break;
      case ElementType.CHECKBOX:
        element = { type: "checkbox", key, defaultValue: false } as Checkbox;
        break;
    }

    this.form.elements.push(element);

    return this.form.elements.length - 1;
  }

  editElement(
    index: number,
    options?: {
      title?: string;
      description?: string;
      required?: boolean;
      min?: number;
      max?: number;
      options?: SelectOption[];
      view?: SelectView;
      inputType?: InputType;
      defaultValue?: boolean;
      placeholder?: string;
      visible?: ElementComparison | ElementComparison[];
      disabled?: ElementComparison;
    }
  ) {
    const element = this.form.elements[index];

    if (!element) return;

    if (options?.title) {
      element.title = options.title;
    }

    if (options?.description) {
      element.description = options.description;
    }

    if (options?.placeholder) {
      element.placeholder = options.placeholder;
    }

    if (options?.min && element.type === "input") {
      if (!element.validations) element.validations = {};

      element.validations.min = options.min;
    }

    if (options?.max && element.type === "input") {
      if (!element.validations) element.validations = {};

      element.validations.max = options.max;
    }

    if (options?.inputType && element.type === "input") {
      element.inputType = options.inputType;
    }

    if (options?.options && element.type === "select") {
      element.options = options.options;
    }

    if (options?.view && element.type === "select") {
      element.view = options.view;
    }

    if (options?.defaultValue && element.type === "checkbox") {
      element.defaultValue = options.defaultValue;
    }

    if (options?.required) {
      if (!element.validations) element.validations = {};

      element.validations.required = options.required;
    }

    if (options?.visible) {
      element.visible = options.visible;
    }

    if (options?.disabled) {
      element.disabled = options.disabled;
    }
  }

  input(key: string) {
    let index: number = this.addElement(ElementType.INPUT, key);

    const functions = {
      title: (title: string) => {
        this.editElement(index, { title });
        return functions;
      },
      description: (description: string) => {
        this.editElement(index, { description });
        return functions;
      },
      min: (min: number) => {
        this.editElement(index, { min });
        return functions;
      },
      max: (max: number) => {
        this.editElement(index, { max });
        return functions;
      },
      required: () => {
        this.editElement(index, { required: true });
        return functions;
      },
      email: () => {
        this.editElement(index, { inputType: "email" });
        return functions;
      },
      number: () => {
        this.editElement(index, { inputType: "number" });
        return functions;
      },
      placeholder: (placeholder: string) => {
        this.editElement(index, { placeholder });
        return functions;
      },
      visible: (visible: ElementComparison | ElementComparison[]) => {
        this.editElement(index, { visible });
        return functions;
      },
      disabled: (disabled: ElementComparison) => {
        this.editElement(index, { disabled });
        return functions;
      },
    };

    return functions;
  }

  select(key: string) {
    let index: number = this.addElement(ElementType.SELECT, key);

    const functions = {
      title: (title: string) => {
        this.editElement(index, { title });
        return functions;
      },
      description: (description: string) => {
        this.editElement(index, { description });
        return functions;
      },
      options: (options: SelectOption[]) => {
        this.editElement(index, { options });
        return functions;
      },
      dropdown: () => {
        this.editElement(index, { view: "dropdown" });
        return functions;
      },
      list: () => {
        this.editElement(index, { view: "list" });
        return functions;
      },
      grid: () => {
        this.editElement(index, { view: "grid" });
        return functions;
      },
      required: () => {
        this.editElement(index, { required: true });
        return functions;
      },
      visible: (visible: ElementComparison | ElementComparison[]) => {
        this.editElement(index, { visible });
        return functions;
      },
      disabled: (disabled: ElementComparison) => {
        this.editElement(index, { disabled });
        return functions;
      },
    };

    return functions;
  }

  checkbox(key: string) {
    let index: number = this.addElement(ElementType.CHECKBOX, key);

    const functions = {
      title: (title: string) => {
        this.editElement(index, { title });
        return functions;
      },
      description: (description: string) => {
        this.editElement(index, { description });
        return functions;
      },
      defaultValue: (defaultValue: boolean) => {
        this.editElement(index, { defaultValue });
        return functions;
      },
      required: () => {
        this.editElement(index, { required: true });
        return functions;
      },
      visible: (visible: ElementComparison | ElementComparison[]) => {
        this.editElement(index, { visible });
        return functions;
      },
      disabled: (disabled: ElementComparison) => {
        this.editElement(index, { disabled });
        return functions;
      },
    };

    return functions;
  }
}
