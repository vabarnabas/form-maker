import { SelectOption } from "@/types/form.types";

export default function createKey(title: string): string {
  return title.toLowerCase().replaceAll(" ", "-");
}
