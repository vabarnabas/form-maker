import { FormHandler } from "@/services/FormHandler";
import createOption from "@/services/createOption";

const f = new FormHandler();

f.title("Test Form");
f.input("firstName").title("First Name").required().placeholder("First Name");
f.input("lastName").title("Last Name").required().placeholder("Last Name");
f.input("email").title("E-mail").required().placeholder("E-mail");

f.select("ticketType")
  .title("Type of Ticket")
  .options([
    createOption("Basic - 5000 HUF", "basic"),
    createOption("Early Bird - 4500 HUF", "early-bird"),
  ])
  .description("Please select which type of ticket you would like to have");
f.checkbox("acceptTerms").required().title("I accept the terms and conditions");

export const testForm = f.form;
