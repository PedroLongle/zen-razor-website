import * as yup from 'yup';

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}; 

export const contactSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  phone: yup
    .string()
    .optional()
    .matches(
      /^(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, 
      'Please enter a valid phone number'
    ),
  
  subject: yup
    .string()
    .required('Subject is required')
    .min(5, 'Subject must be at least 5 characters'),
  
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters'),
});