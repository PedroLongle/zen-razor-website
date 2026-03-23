import * as yup from "yup"

export type AppointmentFormData = {
  serviceId: string
  barberId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  notes?: string
}

export const appointmentSchema: yup.ObjectSchema<AppointmentFormData> = yup.object({
  serviceId: yup.string().required("Service is required"),

  barberId: yup.string().required("Barber is required"),

  customerName: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),

  customerEmail: yup.string().required("Email is required").email("Please enter a valid email address"),

  customerPhone: yup
    .string()
    .required("Phone number is required")
    .test("phone-validation", "Please enter a valid phone number", function (value) {
      if (!value) return false
      // Remove all non-digit characters except the leading +
      const cleaned = value.replace(/[^\d+]/g, "")
      // Check if it's a valid international phone number
      const phoneRegex = /^\+?\d{7,15}$/
      return phoneRegex.test(cleaned)
    }),
  notes: yup.string().optional()
})
