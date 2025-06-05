'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Clock, EuroIcon, User, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import FormTextarea from '@/components/forms/textarea';
import { Timestamp } from 'firebase/firestore';
import { AppointmentFormData, appointmentSchema } from './schema';
import FormInput from '@/components/forms/input';
import { useFunctions } from '@/hooks/use-functions';
import { ServiceItem } from '@/model/service';
import { BarberItem } from '@/model/barber';

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  monthIndex: number;
  year: number;
  isPast: boolean;
}

interface SelectedDateInfo {
  day: number;
  month: number;
  year: number;
  formattedString: string;
}

export default function AppointmentForm({ 
  services, 
  barbers, 
  preselectedServiceId 
}: { 
  services: ServiceItem[], 
  barbers: BarberItem[], 
  preselectedServiceId?: string | null 
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Selected values state
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<BarberItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<SelectedDateInfo | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);

  const { createAppointment } = useFunctions();
  
  // Current date info
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
  
  // Available time slots based on working hours: 10AM-1PM, 2PM-7PM
  const morningTimeSlots = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30"];
  const afternoonTimeSlots = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"];
  
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<AppointmentFormData>({
    resolver: yupResolver(appointmentSchema),
    mode: 'onBlur'
  });
  
  // Form submission handler
  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Validate date and time selections
      if (!selectedService || !selectedBarber || !selectedDate || !selectedTime) {
        setIsSubmitting(false);
        return; // Stop submission and let the form validation display errors
      }
      
      // Parse date components
      const { day, month, year } = selectedDate;
      const [hours, minutes] = selectedTime.split(':').map(Number);
      
      // Create JavaScript Date object (months are 0-indexed in JavaScript Date)
      const scheduledJsDate = new Date(year, month, day, hours, minutes);
      
      // Convert to Firestore Timestamp
      const scheduledTimestamp = Timestamp.fromDate(scheduledJsDate);

      // Call the Firebase service to create the appointment
      await createAppointment({
        serviceId: data.serviceId,
        barberId: data.barberId,
        scheduledDate: scheduledTimestamp,
        customer: {
          name: data.customerName,
          email: data.customerEmail,
          phone: data.customerPhone,
        },
        ...(data.notes && { notes: data.notes })
      });
      
      // Handle success
      setSubmitSuccess(true);
      reset();
      
      // Reset selection states
      setSelectedService(null);
      setSelectedBarber(null);
      setSelectedDate(null);
      setSelectedTime(null);

      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);

    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Check if a date is in the past
  const isPastDate = useCallback((year: number, month: number, day: number) => {
    if (year < todayYear) return true;
    if (year === todayYear && month < todayMonth) return true;
    if (year === todayYear && month === todayMonth && day < todayDate) return true;
    return false;
  }, [todayYear, todayMonth, todayDate]);
  
  // Generate calendar days
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    // Last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // European calendar starts with Monday (1) instead of Sunday (0)
    // Convert Sunday from 0 to 7 to align with European calendars
    let firstDay = firstDayOfMonth.getDay() || 7; 
    firstDay = firstDay === 0 ? 7 : firstDay; // Sunday is 7 in European calendars
    
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Get days from previous month if needed
    const prevMonthDays = firstDay - 1;
    const prevMonth = new Date(year, month, 0);
    const prevMonthLastDay = prevMonth.getDate();
    const prevMonthIndex = month - 1 < 0 ? 11 : month - 1;
    const prevMonthYear = month - 1 < 0 ? year - 1 : year;
    
    const calendarDaysArray: CalendarDay[] = [];
    
    // Add days from previous month
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const isPast = isPastDate(prevMonthYear, prevMonthIndex, day);
      
      calendarDaysArray.push({
        date: day,
        isCurrentMonth: false,
        monthIndex: prevMonthIndex,
        year: prevMonthYear,
        isPast
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const isPast = isPastDate(year, month, i);
      
      calendarDaysArray.push({
        date: i,
        isCurrentMonth: true,
        monthIndex: month,
        year: year,
        isPast
      });
    }
    
    // Add days from next month if needed to fill the grid
    const nextMonthIndex = month + 1 > 11 ? 0 : month + 1;
    const nextMonthYear = month + 1 > 11 ? year + 1 : year;
    
    const remainingDays = 42 - calendarDaysArray.length; // 6 rows x 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const isPast = isPastDate(nextMonthYear, nextMonthIndex, i);
      
      calendarDaysArray.push({
        date: i,
        isCurrentMonth: false,
        monthIndex: nextMonthIndex,
        year: nextMonthYear,
        isPast
      });
    }
    
    setCalendarDays(calendarDaysArray);
  }, [currentMonth, todayYear, todayMonth, todayDate, isPastDate]);
  
  // Effect to handle preselected service
  useEffect(() => {
    if (preselectedServiceId && services.length > 0) {
      const preselectedService = services.find(service => service.id === preselectedServiceId);
      if (preselectedService) {
        setSelectedService(preselectedService);
        setValue('serviceId', preselectedService.id);
      }
    }
  }, [preselectedServiceId, services, setValue]);
  
  // Handler for service selection change
  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const serviceId = e.target.value;
    const service = services.find(s => s.id === serviceId) || null;
    setSelectedService(service);
    
    // Update form value
    setValue('serviceId', serviceId);
  };
  
  // Handlers for calendar navigation
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Format the month and year for display
  const formattedMonth = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  // Function to determine if a date is selected
  const isDateSelected = (day: CalendarDay) => {
    if (!selectedDate) return false;
    return (
      selectedDate.day === day.date && 
      selectedDate.month === day.monthIndex && 
      selectedDate.year === day.year
    );
  };
  
  // Handle date selection
  const handleDateSelect = (day: CalendarDay) => {
    if (day.isPast) return; // Don't allow selecting past dates
    
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const formattedString = `${day.date} ${months[day.monthIndex]} ${day.year}`;
    
    setSelectedDate({
      day: day.date,
      month: day.monthIndex,
      year: day.year,
      formattedString
    });
    
    // Reset time when date changes
    setSelectedTime(null);
  };
  
  // Handle barber selection
  const handleBarberSelect = (barber: BarberItem) => {
    if (!selectedService) return;
    
    setSelectedBarber(barber);
    
    // Update form value
    setValue('barberId', barber.id);
  };
  
  // Handle time selection
  const handleTimeSelect = (time: string) => {
    if (!selectedService || !selectedBarber || !selectedDate) return;
    
    setSelectedTime(time);
  };

  if (submitSuccess) {
    return (
      <div className="flex flex-col items-center py-22 gap-6">
        <Image src="/images/illustrations/mail-sent.svg" alt="Appointment Created" width={130} height={130} />
        <h2 className="text-3xl font-semibold mb-1 font-heading">Appointment Created!</h2>
        <p className="text-muted-foreground mb-4 text-sm font-sans">Your appointment has been created successfully. <br /> We will contact you shortly to confirm the details.</p>
      </div>
    );
  }
    
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First row: Service and Barber */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Service Selection */}
          <div className="flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-1 font-heading">Select a Service</h2>
            <p className="text-muted-foreground mb-4 text-sm font-sans">Select a service to begin</p>
            <div className="relative">
              <select 
                className={`w-full appearance-none rounded-lg border ${errors.serviceId ? 'border-red-500' : 'border-border'} bg-background p-4 pr-10 text-foreground font-sans focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer`}
                value={selectedService?.id || ""}
                {...register('serviceId')}
                onChange={(e) => {
                  handleServiceChange(e);
                }}
              >
                <option value="" disabled>Choose a service...</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} ({service.duration}min - {service.price}€)
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                <svg className="h-5 w-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              {errors.serviceId && (
                <p className="mt-1 text-red-500 text-sm">{errors.serviceId.message}</p>
              )}
            </div>
            
            <div className="mt-6 p-6 bg-accent/10 rounded-lg border border-border font-sans flex-grow">
              <h3 className="font-medium mb-2">Service Details {selectedService ? `for ${selectedService.name}` : ''}</h3>
              <p className="text-md text-muted-foreground mb-4">{selectedService ? selectedService.description : 'Select a service to see details'}.</p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock size={16} className="text-primary" />
                  <span>Duration:</span>
                </div>
                <span className="font-medium font-sans">{selectedService?.duration || '-'} min</span>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <EuroIcon size={16} className="text-primary" />
                  <span>Price:</span>
                </div>
                <span className="font-medium">{selectedService?.price || '-'} €</span>
              </div>
              
              {selectedBarber && (
                <div className="flex justify-between items-center mt-3 border-t border-border pt-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User size={16} className="text-primary" />
                    <span>Barber:</span>
                  </div>
                  <span className="font-medium font-sans">{selectedBarber.name}</span>
                </div>
              )}
              
              {selectedDate && (
                <div className="flex justify-between items-center mt-3 border-t border-border pt-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar size={16} className="text-primary" />
                    <span>Date:</span>
                  </div>
                  <span className="font-medium">{selectedDate.formattedString}{selectedTime && ` at ${selectedTime}h`}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Barber Selection */}
          <div className={`flex flex-col h-full ${!selectedService ? 'opacity-50' : ''}`}>
            <h2 className="text-2xl font-semibold mb-1 font-heading">Choose a Barber</h2>
            <p className="text-muted-foreground mb-4 text-sm font-sans">
              {selectedService ? 'Select a barber for your appointment' : 'Please select a service first'}
            </p>
            <input type="hidden" {...register('barberId')} />
            {errors.barberId && (
              <p className="mb-2 text-red-500 text-sm">{errors.barberId.message}</p>
            )}
            <div className="grid grid-cols-2 gap-4 flex-grow">
              {barbers.map((barber, index) => (
                <div 
                  key={index}
                  onClick={() => handleBarberSelect(barber)}
                  className={`
                    relative rounded-lg overflow-hidden cursor-pointer border border-border text-center p-4
                    ${!selectedService ? 'cursor-not-allowed' : 'hover:border-primary'}
                    ${selectedBarber?.id === barber.id ? 'border-primary ring-2 ring-primary ring-opacity-50' : ''}
                  `}
                >
                  <div className="mb-3 aspect-square bg-accent rounded-full max-w-[120px] mx-auto relative overflow-hidden">
                    <Image src={barber.image} alt={barber.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-medium font-sans text-md">{barber.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Second row: Calendar and Time Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Calendar */}
          <div className={`${(!selectedService || !selectedBarber) ? 'opacity-50' : ''}`}>
            <h2 className="text-2xl font-semibold mb-1 font-heading">Select a Date</h2>
            <p className="text-muted-foreground mb-4 text-sm font-sans">
              {(selectedService && selectedBarber) ? 'Choose a date for your appointment' : 'Please select a service and barber first'}
            </p>
            {!selectedDate && (selectedService && selectedBarber) && isSubmitting && (
              <p className="mb-2 text-red-500 text-sm">Date is required</p>
            )}
            
            <div className="calendar bg-background border border-border rounded-lg overflow-hidden">
              {/* Calendar header */}
              <div className="flex justify-between items-center p-4 border-b border-border">
                <button 
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-2 hover:bg-accent/20 rounded"
                  disabled={!selectedService || !selectedBarber}
                >
                  <ChevronLeft size={20} />
                </button>
                <h3 className="font-medium font-sans">{formattedMonth}</h3>
                <button 
                  type="button"
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-accent/20 rounded"
                  disabled={!selectedService || !selectedBarber}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              {/* Calendar grid */}
              <div className="grid grid-cols-7 text-center">
                {/* Day headers */}
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={index} className="py-2 border-b border-border font-medium text-sm">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {calendarDays.map((day, index) => (
                  <div 
                    key={index}
                    onClick={() => {
                      if (!selectedService || !selectedBarber || day.isPast) return;
                      handleDateSelect(day);
                    }}
                    className={`
                      py-3 relative cursor-pointer border-b border-r border-border last:border-r-0
                      ${day.isCurrentMonth ? 'bg-background' : 'bg-accent/5 text-muted-foreground'}
                      ${day.isPast ? 'text-muted-foreground/50 cursor-not-allowed' : ''}
                      ${isDateSelected(day) ? 'bg-primary/10' : ''}
                      ${(selectedService && selectedBarber && !day.isPast) ? 'hover:bg-accent/10' : ''}
                      ${index % 7 === 6 ? 'border-r-0' : ''}
                      ${index >= calendarDays.length - 7 ? 'border-b-0' : ''}
                    `}
                  >
                    <span className={`
                      text-sm
                      ${isDateSelected(day) ? 'font-bold' : ''}
                    `}>
                      {day.date}
                    </span>
                    
                    {isDateSelected(day) && (
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-primary"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Time Selection */}
          <div className={`${(!selectedService || !selectedBarber || !selectedDate) ? 'opacity-50' : ''}`}>
            <h2 className="text-2xl font-semibold mb-1 font-heading">Select a Time</h2>
            <p className="text-muted-foreground mb-4 text-sm font-sans">
              {(selectedService && selectedBarber && selectedDate) ? 'Choose a time for your appointment' : 'Please select a date first'}
            </p>
            {!selectedTime && (selectedService && selectedBarber && selectedDate) && isSubmitting && (
              <p className="mb-2 text-red-500 text-sm">Time is required</p>
            )}
            
            <div className="time-slots space-y-6">
              {/* Morning slots */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-accent/10 p-3 border-b border-border">
                  <h3 className="font-medium font-sans">Morning</h3>
                </div>
                <div className="grid grid-cols-3 gap-2 p-4">
                  {morningTimeSlots.map(time => (
                    <button
                      key={time}
                      type="button"
                      disabled={!selectedService || !selectedBarber || !selectedDate}
                      onClick={() => handleTimeSelect(time)}
                      className={`
                        py-2 rounded border font-medium text-sm  hover:cursor-pointer
                        ${(!selectedService || !selectedBarber || !selectedDate) 
                          ? 'cursor-not-allowed border-border text-muted-foreground/50' 
                          : selectedTime === time
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border hover:border-primary'
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Afternoon slots */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-accent/10 p-3 border-b border-border">
                  <h3 className="font-medium font-sans">Afternoon</h3>
                </div>
                <div className="grid grid-cols-3 gap-2 p-4">
                  {afternoonTimeSlots.map(time => (
                    <button
                      key={time}
                      type="button"
                      disabled={!selectedService || !selectedBarber || !selectedDate}
                      onClick={() => handleTimeSelect(time)}
                      className={`
                        py-2 rounded border font-medium text-sm hover:cursor-pointer
                        ${(!selectedService || !selectedBarber || !selectedDate) 
                          ? 'cursor-not-allowed border-border text-muted-foreground/50' 
                          : selectedTime === time
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border hover:border-primary '
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Customer Information */}
        <div className={`mb-8 ${(!selectedService || !selectedBarber || !selectedDate || !selectedTime) ? 'opacity-50' : ''}`}>
          <h2 className="text-2xl font-semibold mb-1 font-heading">Your Information</h2>
          <p className="text-muted-foreground mb-4 text-sm font-sans">
            {(selectedService && selectedBarber && selectedDate && selectedTime) 
              ? 'Please provide your contact details' 
              : 'Complete your selection first'
            }
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 p-6 border border-border rounded-lg">
            <FormInput
              label="Full Name"
              placeholder="Your name"
              register={register('customerName')}
              error={errors.customerName}
              required
              disabled={!selectedService || !selectedBarber || !selectedDate || !selectedTime || isSubmitting}
            />
            
            <FormInput
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              register={register('customerEmail')}
              error={errors.customerEmail}
              required
              disabled={!selectedService || !selectedBarber || !selectedDate || !selectedTime || isSubmitting}
            />
            
            <FormInput
              label="Phone Number"
              type="tel"
              placeholder="(+351) 123-456-789"
              register={register('customerPhone')}
              error={errors.customerPhone}
              disabled={!selectedService || !selectedBarber || !selectedDate || !selectedTime || isSubmitting}
            />
            
            <div className="md:col-span-2">
              <FormTextarea
                label="Additional Notes"
                placeholder="Any specific requests or information you'd like us to know..."
                rows={3}
                register={register('notes')}
                error={errors.notes}
                disabled={!selectedService || !selectedBarber || !selectedDate || !selectedTime || isSubmitting}
              />
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="text-center py-6">
          <button
            type="submit"
            disabled={!selectedService || !selectedBarber || !selectedDate || !selectedTime || isSubmitting}
            className="inline-flex items-center justify-center px-12 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-sans font-medium"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : 'Confirm Appointment'}
          </button>
        </div>
      </form>
    </div>
  );
} 