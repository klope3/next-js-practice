import { createUserFormDataSchema, productFormDataSchema } from "./schema";

export function validateProductForm(formData: FormData) {
  return productFormDataSchema.parse({
    name: formData.get("name"),
    price: formData.get("price"),
  });
}

export function validateCreateUserForm(formData: FormData) {
  return createUserFormDataSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    roleId: formData.get("roleId"),
  });
}
