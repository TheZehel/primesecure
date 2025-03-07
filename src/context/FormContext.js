import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const FormContext = createContext();

// Create provider component
export const FormProvider = ({ children }) => {
  // Initialize form data from localStorage if available
  const initialFormData = JSON.parse(
    localStorage.getItem('sharedFormData'),
  ) || {
    name: '',
    email: '',
    phone: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    // Add any other fields that might be needed across forms
  };

  const [sharedFormData, setSharedFormData] = useState(initialFormData);

  // Update localStorage whenever form data changes
  useEffect(() => {
    localStorage.setItem('sharedFormData', JSON.stringify(sharedFormData));
  }, [sharedFormData]);

  // Function to update form data
  const updateSharedFormData = (newData) => {
    setSharedFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  // Clear form data
  const clearSharedFormData = () => {
    setSharedFormData({
      name: '',
      email: '',
      phone: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
    });
    localStorage.removeItem('sharedFormData');
  };

  return (
    <FormContext.Provider
      value={{
        sharedFormData,
        updateSharedFormData,
        clearSharedFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
