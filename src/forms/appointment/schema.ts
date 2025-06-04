import * as yup from 'yup';

export type AppointmentFormData = {
  serviceId: string;
  barberId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  notes?: string;
};

export const appointmentSchema = yup.object({
  serviceId: yup
    .string()
    .required('Service is required'),
  
  barberId: yup
    .string()
    .required('Barber is required'),
  
  customerName: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  
  customerEmail: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  customerPhone: yup
    .string()
    .optional()
    .matches(
      /^(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, 
      'Please enter a valid phone number'
    ),
  
  notes: yup
    .string()
    .optional()
}); 