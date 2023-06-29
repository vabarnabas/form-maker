import { FormObject } from "@/types/form.types"

export const newForm: FormObject = {
  elements: [
    {
      type: "text",
      key: "welcome-to-test-form,-please-help-me-fill-this-out",
      textType: "body",
      title: "Welcome to test form, please help me fill this out",
    },
    {
      type: "input",
      inputType: "text",
      key: "full-name",
      title: "Full Name",
      placeholder: "Full Name",
      validations: {
        required: true,
      },
    },
    {
      type: "input",
      inputType: "text",
      key: "e-mail-address",
      title: "E-mail Address",
      placeholder: "E-mail Address",
      validations: {
        required: true,
      },
    },
    {
      type: "select",
      key: "select-your-favorite-color",
      view: "list",
      title: "Select your favorite color",
      options: [
        {
          title: "Green",
          value: "green",
        },
        {
          title: "Yellow",
          value: "yellow",
        },
        {
          title: "Orange",
          value: "orange",
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
      key: "i-agree-to-have-my-personal-information",
      defaultValue: false,
      title: "I agree to have my personal information",
      validations: {
        required: true,
      },
    },
  ],
  title: "Test Form",
}
