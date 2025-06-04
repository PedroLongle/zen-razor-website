import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Book an Appointment - Zen Razor",
  description: "Schedule your next haircut or grooming service at Zen Razor Barbershop. Easy online booking available.",
};

export default function AppointmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 