'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { AppointmentRequestData } from "@/model/appointment";
import { ServiceItem } from "@/model/service";
import { BarberItem } from "@/model/barber";
import { LocationSettings } from "@/model/settings";

interface UseFunctionsReturn {
    loading: {
        data: boolean;
        slots: boolean;
        appointment: boolean;
    },
    data?: PublicInformation,
    createAppointment: (payload: AppointmentRequestData) => Promise<boolean>;
    getTimeSlots: () => void;
    error?: {
        data: string | null;
        slots: string | null;
        appointment: string | null;
    }
}

export interface PublicInformation {
    services: ServiceItem[]
    barbers: BarberItem[],
    location: LocationSettings
}

const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
}

const app = initializeApp(config);
const functions = getFunctions(app, 'europe-west3');

export const FunctionsContext = createContext<UseFunctionsReturn>({ 
  loading: {
    data: true,
    slots: false,
    appointment: false,
  },
  error: {
    data: null,
    slots: null,
    appointment: null,
  },
  createAppointment: async () => false,
  getTimeSlots: () => {}
});

export const FunctionsProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDataLoading, setIsDataLoading ] = useState<boolean>(true);
    const [isSlotsLoading, setIsSlotsLoading] = useState<boolean>(true);
    const [isAppointmentLoading, setIsAppointmentLoading] = useState<boolean>(true);

    const [dataError, setDataError] = useState<string | null>(null);
    const [slotsError, setSlotsError] = useState<string | null>(null);
    const [appointmentError, setAppointmentError] = useState<string | null>(null);

    const [data, setData] = useState<PublicInformation>();

    const createAppointment = async (payload: AppointmentRequestData): Promise<boolean> => {
        try {
            setIsAppointmentLoading(true);
            const result = await httpsCallable(functions, "createPublicAppointment")(payload);
            console.log("[use-functions] Create appointment result: ", result);
            return result.data as boolean;
        } catch (error) {
            console.error('Error creating appointment request:', error);
            setAppointmentError(error instanceof Error ? error.message : 'Failed to create appointment');
            return false;
        } finally {
            setIsAppointmentLoading(false);
        }
    }

    const getTimeSlots = async () => {
        try {
            setIsSlotsLoading(true);
            const result = await httpsCallable(functions, "getTimeSlots")();
            console.log("[use-functions] Get time slots result: ", result);
            return result.data as PublicInformation;
        } catch (error) {
            console.log("[use-functions] Error getting time slots: ", error);
            setSlotsError(error instanceof Error ? error.message : 'Failed to fetch time slots');
        } finally {
            setIsSlotsLoading(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await httpsCallable(functions, "getPublicInfo")();
                setData(data as PublicInformation);
            } catch (error) {
                console.log("[use-functions] Error getting public information", error);
                setDataError(error instanceof Error ? error.message : 'Failed to fetch data');
            } finally {
                setIsDataLoading(false);
            }
        };
        
        fetchData();
    }, []);

    const result: UseFunctionsReturn = {
        loading: {
            data: isDataLoading,
            slots: isSlotsLoading,
            appointment: isAppointmentLoading,
        },
        data,
        createAppointment,
        getTimeSlots,
        error: {
            data: dataError,
            slots: slotsError,
            appointment: appointmentError,
        }
    }

    return <FunctionsContext.Provider value={result}>{children}</FunctionsContext.Provider>;
};

export const useFunctions = () => useContext(FunctionsContext);
