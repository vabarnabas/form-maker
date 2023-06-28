// Key, Value, Not Equal
export interface ElementComparison {
  key: string;
  value: string | number | boolean | undefined;
  notEqual?: boolean;
}

export interface Comparison {
  comparison: ElementComparison | ElementComparison[];
  type?: "AND" | "OR";
}

export interface BaseElement {
  title: string;
  description?: string;
  placeholder?: string;
  visible?: ElementComparison | ElementComparison[];
  disabled?: ElementComparison;
  key: string;
}

export type TextType =
  | "paragraph-small"
  | "paragraph"
  | "body"
  | "heading 2"
  | "heading 3";
export interface Text extends BaseElement {
  type: "text";
  textType: TextType;
  validations: never;
}

export interface InputValidation {
  min?: number;
  max?: number;
  required?: boolean;
}

export type InputType = "text" | "number" | "email";

export interface Input extends BaseElement {
  type: "input";
  inputType: InputType;
  placeholder?: string;
  validations?: InputValidation;
}

export interface SelectValidations {
  required?: boolean;
}

export type SelectView = "list" | "dropdown" | "grid";

export interface SelectOption {
  title: string;
  value: string;
}

export interface Select extends BaseElement {
  type: "select";
  options: SelectOption[];
  view: SelectView;
  validations?: SelectValidations;
}

export interface CheckboxValidations {
  required?: boolean;
}

export interface Checkbox extends BaseElement {
  type: "checkbox";
  defaultValue: boolean;
  validations?: CheckboxValidations;
}

export type FormElement = Input | Select | Checkbox | Text;

export type ElementType = "input" | "select" | "checkbox" | "text";

export interface FormObject {
  title: string;
  description?: string;
  elements: FormElement[];
}
