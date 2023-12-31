import {
  Checkbox,
  ElementComparison,
  ElementType,
  FormElement,
  FormObject,
  Group,
  Input,
  InputType,
  Select,
  SelectOption,
  SelectView,
  Text,
  TextType,
} from "@/types/form.types"

export class FormHandler {
  form = {
    elements: [] as FormElement[],
  } as FormObject

  title(title: string) {
    return (this.form.title = title)
  }

  description(description: string) {
    return (this.form.description = description)
  }

  addElement(elementType: ElementType, key: string) {
    let element: FormElement

    switch (elementType) {
      case "input":
        element = { type: "input", inputType: "text", key } as Input
        break
      case "select":
        element = { type: "select", key, view: "list" } as Select
        break
      case "checkbox":
        element = { type: "checkbox", key, defaultValue: false } as Checkbox
        break
      case "text":
        element = { type: "text", key, textType: "body" } as Text
        break
      case "group":
        element = { type: "group", key, elements: [] as FormElement[] } as Group
        break
    }

    this.form.elements.push(element)

    return this.form.elements.length - 1
  }

  editElement(
    index: number,
    options?: {
      title?: string
      description?: string
      required?: boolean
      min?: number
      max?: number
      options?: SelectOption[]
      view?: SelectView
      inputType?: InputType
      defaultValue?: boolean
      placeholder?: string
      visible?: ElementComparison | ElementComparison[]
      disabled?: ElementComparison
      textType?: TextType
      elements?: FormElement[]
    }
  ) {
    const element = this.form.elements[index]

    if (!element) return

    if (options?.title) {
      element.title = options.title
    }

    if (options?.description) {
      element.description = options.description
    }

    if (options?.placeholder) {
      element.placeholder = options.placeholder
    }

    if (options?.textType && element.type === "text") {
      element.textType = options.textType
    }

    if (options?.elements && element.type === "group") {
      element.elements = options.elements
    }

    if (options?.min && element.type === "input") {
      if (!element.validations) element.validations = {}

      element.validations.min = options.min
    }

    if (options?.max && element.type === "input") {
      if (!element.validations) element.validations = {}

      element.validations.max = options.max
    }

    if (options?.inputType && element.type === "input") {
      element.inputType = options.inputType
    }

    if (options?.options && element.type === "select") {
      element.options = options.options
    }

    if (options?.view && element.type === "select") {
      element.view = options.view
    }

    if (options?.defaultValue && element.type === "checkbox") {
      element.defaultValue = options.defaultValue
    }

    if (options?.required) {
      if (!element.validations) element.validations = {}

      element.validations.required = options.required
    }

    if (options?.visible) {
      element.visible = options.visible
    }

    if (options?.disabled) {
      element.disabled = options.disabled
    }
  }

  text(key: string) {
    const index: number = this.addElement("text", key)

    const functions = {
      title: (title: string) => {
        this.editElement(index, { title })
        return functions
      },
      description: (description: string) => {
        this.editElement(index, { description })
        return functions
      },
      visible: (visible: ElementComparison | ElementComparison[]) => {
        this.editElement(index, { visible })
        return functions
      },
      textType: (textType: TextType) => {
        this.editElement(index, { textType })
        return functions
      },
      build: () => {
        const element = this.form.elements[index]
        return element
      },
    }

    return functions
  }

  group(key: string) {
    const index: number = this.addElement("group", key)

    const functions = {
      title: (title: string) => {
        this.editElement(index, { title })
        return functions
      },
      description: (description: string) => {
        this.editElement(index, { description })
        return functions
      },
      visible: (visible: ElementComparison | ElementComparison[]) => {
        this.editElement(index, { visible })
        return functions
      },
      elements: (elements: FormElement[]) => {
        this.editElement(index, { elements })
        return functions
      },
      build: () => {
        const element = this.form.elements[index]
        return element
      },
    }

    return functions
  }

  input(key: string) {
    const index: number = this.addElement("input", key)

    const functions = {
      title: (title: string) => {
        this.editElement(index, { title })
        return functions
      },
      description: (description: string) => {
        this.editElement(index, { description })
        return functions
      },
      min: (min: number) => {
        this.editElement(index, { min })
        return functions
      },
      max: (max: number) => {
        this.editElement(index, { max })
        return functions
      },
      required: () => {
        this.editElement(index, { required: true })
        return functions
      },
      email: () => {
        this.editElement(index, { inputType: "email" })
        return functions
      },
      number: () => {
        this.editElement(index, { inputType: "number" })
        return functions
      },
      placeholder: (placeholder: string) => {
        this.editElement(index, { placeholder })
        return functions
      },
      visible: (visible: ElementComparison | ElementComparison[]) => {
        this.editElement(index, { visible })
        return functions
      },
      disabled: (disabled: ElementComparison) => {
        this.editElement(index, { disabled })
        return functions
      },
      build: () => {
        const element = this.form.elements[index]
        return element
      },
    }

    return functions
  }

  select(key: string) {
    const index: number = this.addElement("select", key)

    const functions = {
      title: (title: string) => {
        this.editElement(index, { title })
        return functions
      },
      description: (description: string) => {
        this.editElement(index, { description })
        return functions
      },
      options: (options: SelectOption[]) => {
        this.editElement(index, { options })
        return functions
      },
      dropdown: () => {
        this.editElement(index, { view: "dropdown" })
        return functions
      },
      list: () => {
        this.editElement(index, { view: "list" })
        return functions
      },
      grid: () => {
        this.editElement(index, { view: "grid" })
        return functions
      },
      required: () => {
        this.editElement(index, { required: true })
        return functions
      },
      visible: (visible: ElementComparison | ElementComparison[]) => {
        this.editElement(index, { visible })
        return functions
      },
      disabled: (disabled: ElementComparison) => {
        this.editElement(index, { disabled })
        return functions
      },
      build: () => {
        const element = this.form.elements[index]
        return element
      },
    }

    return functions
  }

  checkbox(key: string) {
    const index: number = this.addElement("checkbox", key)

    const functions = {
      title: (title: string) => {
        this.editElement(index, { title })
        return functions
      },
      description: (description: string) => {
        this.editElement(index, { description })
        return functions
      },
      defaultValue: (defaultValue: boolean) => {
        this.editElement(index, { defaultValue })
        return functions
      },
      required: () => {
        this.editElement(index, { required: true })
        return functions
      },
      visible: (visible: ElementComparison | ElementComparison[]) => {
        this.editElement(index, { visible })
        return functions
      },
      disabled: (disabled: ElementComparison) => {
        this.editElement(index, { disabled })
        return functions
      },
      build: () => {
        const element = this.form.elements[index]
        return element
      },
    }

    return functions
  }
}
