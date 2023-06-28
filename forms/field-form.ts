import { FormHandler } from "@/services/FormHandler";
import createOption from "@/services/createOption";

const f = new FormHandler();

f.title("New Element");
f.select("type")
  .title("Input Type")
  .options([
    createOption("Input"),
    createOption("Select"),
    createOption("Checkbox"),
  ])
  .required();
f.input("title").title("Title").required().placeholder("Title");
f.input("options")
  .title("Options")
  .description(
    "Please state the options separated by a comma  (Yellow, Green, Blue)"
  )
  .placeholder("Green, Yellow, Blue")
  .visible({ key: "type", value: "select" })
  .required();
f.checkbox("isValidation").title("Do you want to add validations?");
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
