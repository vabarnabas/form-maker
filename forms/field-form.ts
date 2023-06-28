import { FormHandler } from "@/services/FormHandler";
import createOption from "@/services/createOption";
import { FormObject } from "@/types/form.types";

const f = new FormHandler();

f.title("New Element");
f.select("type")
  .title("Input Type")
  .options([
    createOption("Text"),
    createOption("Input"),
    createOption("Select"),
    createOption("Checkbox"),
  ])
  .required();
f.input("title").title("Title").required().placeholder("Title");
f.input("placeholder")
  .title("Placeholder")
  .placeholder("Placeholder")
  .visible({ key: "type", value: "text", notEqual: true });
f.input("options")
  .title("Options")
  .description(
    "Please state the options separated by a comma  (Yellow, Green, Blue)"
  )
  .placeholder("Green, Yellow, Blue")
  .visible({ key: "type", value: "select" })
  .required();
f.checkbox("isValidation")
  .title("Do you want to add validations?")
  .visible({ key: "type", value: "text", notEqual: true });
f.input("min")
  .title("Minimum length")
  .number()
  .placeholder("Minimum Length")
  .visible([
    { key: "isValidation", value: true },
    { key: "type", value: "input" },
  ]);
f.input("max")
  .title("Maximum length")
  .number()
  .placeholder("Maximum Length")
  .visible([
    { key: "isValidation", value: true },
    { key: "type", value: "input" },
  ]);
f.checkbox("isRequired")
  .title("Required")
  .visible({ key: "isValidation", value: true });

export const fieldForm = f.form;

export const newForm: FormObject = {
  elements: [
    {
      type: "input",
      inputType: "text",
      key: "first-name",
      title: "First Name",
      placeholder: "First Name",
      validations: {
        required: true,
      },
    },
    {
      type: "input",
      inputType: "text",
      key: "last-name",
      title: "Last Name",
      placeholder: "Last Name",
      validations: {
        required: true,
      },
    },
    {
      type: "select",
      key: "what-is-your-favorite-color?",
      view: "list",
      title: "What is your Favorite Color?",
      options: [
        {
          title: "Green",
          value: "green",
        },
        {
          title: "Red",
          value: "red",
        },
        {
          title: "Blue",
          value: "blue",
        },
      ],
      validations: {
        required: true,
      },
    },
    {
      type: "checkbox",
      key: "i-accept-the-terms-and-conditions",
      defaultValue: false,
      title: "I accept the Terms and Conditions",
      validations: {
        required: true,
      },
    },
  ],
  title: "Test Form",
};
