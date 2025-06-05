'use client';

import AppointmentForm from '../../forms/appointment';
import { useFunctions } from '@/hooks/use-functions';
import { useSearchParams } from 'next/navigation';

export default function AppointmentsPage() {
  const { data, error } = useFunctions();
  const searchParams = useSearchParams();
  const preselectedServiceId = searchParams.get('service');

  if(error?.data) {
    return <div className="text-red-500">Error: {error.data}</div>;
  }

  if(!data) {
    return <div>No data found</div>;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-4 text-center font-heading">Book an Appointment</h1>
      <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12 font-sans">
        Select a service, choose your preferred barber, and pick a date and time that works for you.
      </p>

      <AppointmentForm 
        services={data?.services} 
        barbers={data?.barbers} 
        preselectedServiceId={preselectedServiceId}
      />
    </div>
  );
} 