import React, { useEffect } from 'react';
import { useField } from 'formik';
export const TextInput = ({ label, setError, ...props }) => {

    const [field, meta] = useField(props);

    //Set authentication errors to blank on field value change
    useEffect(() => {
      setError({})
    }, [field.value])

    return (
      <div>
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <div className="mt-1">
            <input 
                id={props.id}
                name={props.name}
                type={props.type} 
                required 
                className={`appearance-none block w-full px-3 py-2 border 
                         rounded-md shadow-sm placeholder-gray-400 
                        focus:outline-none sm:text-sm
                        ${meta.touched && meta.error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500' }
                      `}
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? (
            <div className="text-sm text-red-500 mt-1">{meta.error}</div>
            ) : null }
        </div>
      </div>
    );
  };