import React from 'react';

interface InputProps {
  id?: string;
  name: string;
  type: string;
  required: boolean;
  autoComplate?: string;
  placeholder?: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  readonly?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({ id, name, type, required, autoComplate, placeholder, value, onChange, label, error, errorMessage, readonly, className }) => {
  return (
    <div>
      {label && <label htmlFor={id} className="block text-lg leading-6 mb-2">{label}</label>}
      <div>
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplate}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`block w-full rounded-md border-0 p-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring focus:ring-inset ${className}`}
          readOnly={readonly}
        />
        {error && errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Input;
