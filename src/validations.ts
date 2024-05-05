import { productFormDataSchema } from "./schema";

export function validateProductForm(formData: FormData) {
  return productFormDataSchema.parse({
    name: formData.get("name"),
    price: formData.get("price"),
  });
}
