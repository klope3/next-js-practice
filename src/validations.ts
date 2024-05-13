import { userFormDataSchema, productFormDataSchema } from "./schema";

export function validateProductForm(formData: FormData) {
  return productFormDataSchema.parse({
    name: formData.get("name"),
    price: formData.get("price"),
  });
}

export function validateUserForm(formData: FormData) {
  return userFormDataSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    roleId: formData.get("roleId"),
    existingUserId: formData.get("existingUserId"),
  });
}
