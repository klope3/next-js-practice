import { z } from "zod";

//from Zod docs
export const numberInString = z.string().transform((val, ctx) => {
  const parsed = parseInt(val);
  if (isNaN(parsed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Not a number",
    });

    // This is a special symbol you can use to
    // return early from the transform function.
    // It has type `never` so it does not affect the
    // inferred return type.
    return z.NEVER;
  }
  return parsed;
});

export const productFormDataSchema = z.object({
  name: z.string(),
  price: z.string().transform((val) => (isNaN(+val) ? 0 : +val)),
});

export const userFormDataSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  roleId: numberInString,
  existingUserId: z.string().optional(),
});
