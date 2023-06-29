import createOption from "@/services/createOption"
import { e } from "@/services/ElementBuilder"
import { FormHandler } from "@/services/FormHandler"

const f = new FormHandler()

f.title("New Element")
f.select("type")
  .title("Input Type")
  .options([
    createOption("Text"),
    createOption("Input"),
    createOption("Select"),
    createOption("Checkbox"),
  ])
  .required()
f.input("title").title("Title").required().placeholder("Title")
f.input("placeholder")
  .title("Placeholder")
  .placeholder("Placeholder")
  .visible({ key: "type", value: "input" })
f.input("options")
  .title("Options")
  .description(
    "Please state the options separated by a comma  (Yellow, Green, Blue)"
  )
  .placeholder("Green, Yellow, Blue")
  .visible({ key: "type", value: "select" })
  .required()
f.select("textStyle")
  .title("Text Style")
  .options([
    createOption("Paragraph Small"),
    createOption("Paragraph"),
    createOption("Body"),
    createOption("Heading 3"),
    createOption("Heading 2"),
  ])
  .visible({ key: "type", value: "text" })
f.checkbox("isValidation")
  .title("Do you want to add validations?")
  .visible({ key: "type", value: "text", notEqual: true })
f.text("validations")
  .title("Validation Options")
  .textType("heading-3")
  .visible({ key: "isValidation", value: true })
f
  .group("minMaxValidation")
  .title("Min Max Validation")
  .elements([
    e
      .input("min")
      .title("Minimum length")
      .number()
      .placeholder("Minimum Length")
      .build(),
    e
      .input("min")
      .title("Minimum length")
      .number()
      .placeholder("Minimum Length")
      .build(),
  ])
  .visible([
    { key: "isValidation", value: true },
    { key: "type", value: "input" },
  ]),
  f
    .checkbox("isRequired")
    .title("Required")
    .visible({ key: "isValidation", value: true })

export const fieldForm = f.form
