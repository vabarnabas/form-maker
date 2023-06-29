import { FormHandler } from "@/services/FormHandler"

const f = new FormHandler()

f.title("Form Info Form")
f.text("heading").textType("heading-1").title("New Form")
f.input("title").title("Form Title").placeholder("Form Title").required()
f.input("description")
  .title("Description")
  .placeholder("Short Description about your form")

export const formInfoForm = f.form
