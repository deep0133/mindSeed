import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .regex(
      /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
      "Invalid phone number"
    ),
  password: z.string().min(5),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export const sendMoneySchema = z
  .number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  })
  .int()
  .positive();

export const validateInputeData = (schema, data) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.log("----------Format Error --------:", result.error);
    const formattedErrors = result.error.flatten();
    const cleanedErrors = {
      formErrors: formattedErrors.formErrors.length
        ? formattedErrors.formErrors
        : undefined,
      fieldErrors: Object.fromEntries(
        Object.entries(formattedErrors.fieldErrors).filter(
          ([key, value]) => value.length > 0
        )
      ),
    };

    console.error("Validation Errors:", cleanedErrors);

    return { success: false, message: "Invalid inputs", error: cleanedErrors };
    // return { success: false, errors: result.error.flatten() };
  }

  return { success: true, data: result.data }; // Returns valid data
};
