import {
  Checkbox,
  ElementComparison,
  FormElement,
  Group,
  Input,
  Select,
  SelectOption,
  Text,
  TextType,
} from "@/types/form.types"

export const e = {
  text(key: string) {
    let element = { type: "text", key, textType: "body" } as Text

    const functions = {
      title: (title: string) => {
        element = { ...element, title }
        return functions
      },
      description: (description: string) => {
        element = { ...element, description }
        return functions
      },
      visible: (visible: ElementComparison | ElementComparison[]) => {
        element = { ...element, visible }
        return functions
      },
      textType: (textType: TextType) => {
        element = { ...element, textType }
        return functions
      },
      build: () => {
        return element
      },
    }

    return functions
  },
  group(key: string) {
    let element = { type: "group", key, elements: [] as FormElement[] } as Group

    const functions = {
      title: (title: string) => {
        element = { ...element, title }
        return functions
      },
      description: (description: string) => {
        element = { ...element, description }
        return functions
      },
      visible: (visible: ElementComparison | ElementComparison[]) => {
        element = { ...element, visible }
        return functions
      },
      elements: (elements: FormElement[]) => {
        element = { ...element, elements }
        return functions
      },
      build: () => {
        return element
      },
    }

    return functions
  },
  input(key: string) {
    let element = {
      type: "input",
      key,
      inputType: "text",
    } as Input

    const functions = {
      title: (title: string) => {
        element = { ...element, title }
        return functions
      },
      description: (description: string) => {
        element = { ...element, description }
        return functions
      },
      min: (min: number) => {
        if (!element.validations) element.validations = {}
        element.validations = { ...element.validations, min }
        return functions
      },
      max: (max: number) => {
        if (!element.validations) element.validations = {}
        element.validations = { ...element.validations, max }
        return functions
      },
      required: () => {
        if (!element.validations) element.validations = {}
        element.validations = { ...element.validations, required: true }
        return functions
      },
      email: () => {
        element = { ...element, inputType: "email" }
        return functions
      },
      number: () => {
        element = { ...element, inputType: "number" }
        return functions
      },
      placeholder: (placeholder: string) => {
        element = { ...element, placeholder }
        return functions
      },
      visible: (visible: ElementComparison | ElementComparison[]) => {
        element = { ...element, visible }
        return functions
      },
      disabled: (disabled: ElementComparison) => {
        element = { ...element, disabled }
        return functions
      },
      build: () => {
        return element
      },
    }

    return functions
  },
  select(key: string) {
    let element = {
      type: "select",
      key,
      view: "list",
    } as Select

    const functions = {
      title: (title: string) => {
        element = { ...element, title }
        return functions
      },
      description: (description: string) => {
        element = { ...element, description }
        return functions
      },
      options: (options: SelectOption[]) => {
        element = { ...element, options }
        return functions
      },
      dropdown: () => {
        element = { ...element, view: "dropdown" }
        return functions
      },
      list: () => {
        element = { ...element, view: "list" }
        return functions
      },
      grid: () => {
        element = { ...element, view: "grid" }
        return functions
      },
      required: () => {
        if (!element.validations) element.validations = {}
        element.validations = { ...element.validations, required: true }
        return functions
      },
      visible: (visible: ElementComparison | ElementComparison[]) => {
        element = { ...element, visible }
        return functions
      },
      disabled: (disabled: ElementComparison) => {
        element = { ...element, disabled }
        return functions
      },
      build: () => {
        return element
      },
    }

    return functions
  },
  checkbox(key: string) {
    let element = {
      type: "checkbox",
      key,
      defaultValue: false,
    } as Checkbox

    const functions = {
      title: (title: string) => {
        element = { ...element, title }
        return functions
      },
      description: (description: string) => {
        element = { ...element, description }
        return functions
      },
      defaultValue: (defaultValue: boolean) => {
        element = { ...element, defaultValue }
        return functions
      },
      required: () => {
        if (!element.validations) element.validations = {}
        element.validations = { ...element.validations, required: true }
        return functions
      },
      visible: (visible: ElementComparison | ElementComparison[]) => {
        element = { ...element, visible }
        return functions
      },
      disabled: (disabled: ElementComparison) => {
        element = { ...element, disabled }
        return functions
      },
      build: () => {
        return element
      },
    }
  },
}
