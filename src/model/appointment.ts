import { Timestamp } from "firebase/firestore"

export interface AppointmentRequestData {
  serviceId: string
  barberId: string
  scheduledDate: Timestamp // Firestore Timestamp for the appointment date and time
  customer: { name: string; email: string; phone?: string }
  notes?: string
}
