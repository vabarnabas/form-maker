import { SelectOption } from "@/types/form.types";

export default function createOption(
  title: string,
  customValue?: string
): SelectOption {
  return {
    title,
    value: customValue || title.toLowerCase().replaceAll(" ", "-"),
  };
}
