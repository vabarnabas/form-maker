// Key, Value, Not Equal
export interface ElementComparison {
  key: string;
  value: string | number | boolean | undefined;
  notEqual?: boolean;
}

export interface BaseElement {
  title: string;
  description?: string;
  placeholder?: string;
  visible?: ElementComparison | ElementComparison[];
  disabled?: ElementComparison;
  key: string;
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

export type FormElement = Input | Select | Checkbox;

export enum ElementType {
  INPUT = "INPUT",
  SELECT = "SELECT",
  CHECKBOX = "CHECKBOX",
}

export interface FormObject {
  title: string;
  description?: string;
  elements: FormElement[];
}
