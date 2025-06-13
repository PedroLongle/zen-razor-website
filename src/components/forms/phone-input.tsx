'use client';

import { useState, useEffect } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { XCircle, ChevronDown } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  format: string;
  maxLength: number;
}

const countries: Country[] = [
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', dialCode: '+351', format: '### ### ###', maxLength: 9 },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', dialCode: '+34', format: '### ### ###', maxLength: 9 },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33', format: '## ## ## ## ##', maxLength: 10 },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49', format: '#### #######', maxLength: 11 },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', dialCode: '+39', format: '### ### ####', maxLength: 10 },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44', format: '#### ### ####', maxLength: 11 },
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1', format: '(###) ###-####', maxLength: 10 },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1', format: '(###) ###-####', maxLength: 10 },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '+55', format: '(##) #####-####', maxLength: 11 },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', dialCode: '+52', format: '### ### ####', maxLength: 10 },
];

interface PhoneInputProps {
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  defaultCountry?: string;
  onChange?: (value: string) => void;
}

export default function PhoneInput({
  label,
  placeholder,
  register,
  error,
  required = false,
  disabled = false,
  className = '',
  defaultCountry = 'PT',
  onChange,
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find(c => c.code === defaultCountry) || countries[0]
  );
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullPhoneNumber, setFullPhoneNumber] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  
  // Show error with a delay for the animation to work properly
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setShowError(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setShowError(false);
    }
  }, [error]);

  // Update form value whenever fullPhoneNumber changes
  useEffect(() => {
    // Debounce the form update to prevent excessive validation calls
    const timer = setTimeout(() => {
      const syntheticEvent = {
        target: {
          name: register.name,
          value: fullPhoneNumber,
          type: 'tel'
        },
        type: 'change'
      };
      
      register.onChange(syntheticEvent);
      
      if (onChange) {
        onChange(fullPhoneNumber);
      }
    }, 100); // 100ms debounce
    
    return () => clearTimeout(timer);
  }, [fullPhoneNumber, register, onChange]);

  // Format phone number according to country format
  const formatPhoneNumber = (value: string, format: string, maxLength: number) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to maxLength
    const limitedDigits = digits.slice(0, maxLength);
    
    // Apply formatting
    let formattedNumber = '';
    let digitIndex = 0;
    
    for (let i = 0; i < format.length && digitIndex < limitedDigits.length; i++) {
      if (format[i] === '#') {
        formattedNumber += limitedDigits[digitIndex];
        digitIndex++;
      } else {
        formattedNumber += format[i];
      }
    }
    
    return formattedNumber;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhoneNumber(value, selectedCountry.format, selectedCountry.maxLength);
    setPhoneNumber(formatted);
    
    // Create the full international number
    const digitsOnly = formatted.replace(/\D/g, '');
    const fullNumber = digitsOnly ? `${selectedCountry.dialCode}${digitsOnly}` : '';
    
    console.log('🔍 Phone Input Debug:');
    console.log('User typed:', value);
    console.log('Formatted:', formatted);
    console.log('Digits only:', digitsOnly);
    console.log('Country dial code:', selectedCountry.dialCode);
    console.log('Full number being sent:', fullNumber);
    console.log('---');
    
    setFullPhoneNumber(fullNumber);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    
    // Reformat existing number with new country format
    if (phoneNumber) {
      const digitsOnly = phoneNumber.replace(/\D/g, '');
      const formatted = formatPhoneNumber(digitsOnly, country.format, country.maxLength);
      setPhoneNumber(formatted);
      
      // Update the form value with new country code
      const fullNumber = digitsOnly ? `${country.dialCode}${digitsOnly}` : '';
      setFullPhoneNumber(fullNumber);
    }
  };

  return (
    <div className="mb-4 w-full">
      <label 
        className="block text-sm font-medium text-foreground mb-1 font-sans"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        <div className={`
          flex w-full rounded-md border font-sans text-sm
          ${error ? 'border-red-500 focus-within:ring-red-500 focus-within:border-red-500' : 'border-border focus-within:ring-primary focus-within:border-primary'}
          bg-background text-foreground
          transition-all duration-200 ease-in-out
          focus-within:outline-none focus-within:ring-2 focus-within:ring-opacity-50
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}>
          {/* Country Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
              disabled={disabled}
              className="flex items-center gap-2 px-3 py-3 border-r border-border hover:bg-accent/5 transition-colors rounded-l-md"
            >
              <span className="text-lg">{selectedCountry.flag}</span>
              <span className="text-xs text-muted-foreground">{selectedCountry.dialCode}</span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </button>
            
            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 z-50 w-64 mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-accent/10 transition-colors"
                  >
                    <span className="text-lg">{country.flag}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{country.name}</div>
                      <div className="text-xs text-muted-foreground">{country.dialCode}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Phone Number Input */}
          <input
            type="tel"
            placeholder={placeholder || selectedCountry.format.replace(/#/g, '0')}
            disabled={disabled}
            value={phoneNumber}
            onChange={handlePhoneChange}
            onBlur={register.onBlur}
            name={register.name}
            ref={register.ref}
            className="flex-1 px-3 py-3 bg-transparent border-0 outline-none rounded-r-md"
          />
        </div>
        
        {/* Dropdown backdrop */}
        {isDropdownOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
      </div>
      
      <div 
        className={`
          mt-1 text-sm text-red-500 font-sans overflow-hidden transition-all duration-300 ease-in-out
          ${showError && error ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        {error && (
          <div className="flex items-center gap-1">
            <XCircle size={14} />
            <span>{error.message}</span>
          </div>
        )}
      </div>
    </div>
  );
} 