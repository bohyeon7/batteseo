import React from 'react';

interface InputProps {
  id?: string;
  name: string;
  type: string;
  required: boolean;
  autoComplate?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({ id, name, type, required, autoComplate, placeholder, value, onChange, label, error, errorMessage }) => {
  return (
    <div>
      {label && <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>}
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
          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {error && errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Input;
