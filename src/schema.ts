import { z } from "zod";

export const productFormDataSchema = z.object({
  name: z.string(),
  price: z.string().transform((val) => (isNaN(+val) ? 0 : +val)),
});
