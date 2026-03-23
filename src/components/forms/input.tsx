"use client"

import { useState, useEffect } from "react"
import { FieldError, UseFormRegisterReturn } from "react-hook-form"
import { XCircle } from "lucide-react"

interface FormInputProps {
  label: string
  type?: string
  placeholder?: string
  register: UseFormRegisterReturn
  error?: FieldError
  required?: boolean
  disabled?: boolean
  className?: string
}

export default function FormInput({
  label,
  type = "text",
  placeholder,
  register,
  error,
  required = false,
  disabled = false,
  className = ""
}: FormInputProps) {
  const [showError, setShowError] = useState(false)

  // Show error with a delay for the animation to work properly
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setShowError(true)
      }, 10)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setShowError(false)
    }, 0)
    return () => clearTimeout(timer)
  }, [error])

  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium text-foreground mb-1 font-sans">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full p-3 rounded-md border font-sans text-sm
          ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-border focus:ring-primary focus:border-primary"}
          bg-background text-foreground
          transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-opacity-50
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        {...register}
      />

      <div
        className={`
          mt-1 text-sm text-red-500 font-sans overflow-hidden transition-all duration-300 ease-in-out
          ${showError && error ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}
        `}>
        {error && (
          <div className="flex items-center gap-1">
            <XCircle size={14} />
            <span>{error.message}</span>
          </div>
        )}
      </div>
    </div>
  )
}
