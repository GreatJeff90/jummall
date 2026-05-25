import * as z from "zod";

// --- AUTH SCHEMA CONTROLS ---
export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email address is required").email("Invalid email address format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters long"),
  email: z.string().trim().min(1, "Email address is required").email("Invalid email address format"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// --- ECOSYSTEM CHECKOUT SCHEMA ---
export const checkoutSchema = z.object({
  firstName: z.string().trim().min(2, "First name is required"),
  lastName: z.string().trim().min(2, "Last name is required"),
  email: z.string().trim().min(1, "Email is required").email("Invalid email format"),
  phone: z.string().trim().min(10, "Provide a valid Nigerian contact phone number"),
  address: z.string().trim().min(5, "Detailed shipping address is required"),
  city: z.string().trim().min(2, "City location is required"),
  state: z.string().trim().min(2, "State location is required"),
  paymentMethod: z.enum(["Paystack", "POD"], { 
    error: "Please choose a verified payment settlement method" 
  }),
});

// --- VENDOR PRODUCT WIZARD SCHEMA ---
export const productWizardSchema = z.object({
  name: z.string().trim().min(3, "Product name must be at least 3 characters long"),
  price: z.coerce.number().positive("Price must be a positive number threshold"),
  stock: z.coerce.number().int().nonnegative("Inventory count cannot be negative values"),
  category: z.string().min(1, "Please assign a valid catalog classification category"),
  description: z.string().trim().min(10, "Provide a product description of at least 10 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type ProductWizardInput = z.infer<typeof productWizardSchema>;