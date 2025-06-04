'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '@/components/forms/input';
import FormTextarea from '@/components/forms/textarea';
import { contactSchema, ContactFormData } from './schema';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(contactSchema),
    mode: 'onBlur'
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Simulate API call
      console.log('Form data submitted:', data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Handle success
      setSubmitSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      // Handle error
      setSubmitError('There was an error submitting the form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-accent/10 p-6 rounded-lg border border-border">      
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded">
          Thank you for your message! We&apos;ll get back to you as soon as possible.
        </div>
      )}
      
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Full Name"
            placeholder="Your name"
            register={register('name')}
            error={errors.name}
            required
          />
          
          <FormInput
            label="Email Address"
            type="email"
            placeholder="your.email@example.com"
            register={register('email')}
            error={errors.email}
            required
          />
        </div>
        
        <FormInput
          label="Phone Number"
          type="tel"
          placeholder="(+351) 123-456-789"
          register={register('phone')}
          error={errors.phone}
        />
        
        <FormInput
          label="Subject"
          placeholder="What is your message about?"
          register={register('subject')}
          error={errors.subject}
          required
        />
        
        <FormTextarea
          label="Message"
          placeholder="Your message..."
          rows={5}
          register={register('message')}
          error={errors.message}
          required
          disabled={isSubmitting}
        />
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex justify-center items-center h-12 px-6 rounded-md bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:cursor-pointer font-sans"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 