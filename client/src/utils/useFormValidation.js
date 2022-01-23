import { useState, useCallback } from 'react';
import { testEmail, testMessage, testPhoneNumber } from './regex';

const useFormValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    let costumIsValid;
    const { name, value } = event.target;
    if (name === 'name') {
      const nameInput = event.target;
      const nameValue = nameInput.value;
      if (nameValue.length >= 1 && nameValue.length <= 30) {
        const isInputValid = testMessage(nameValue);
        if (isInputValid) {
          nameInput.customMessage = '';
          costumIsValid = true;
        } else {
          nameInput.customMessage = 'Name is invalid';
          costumIsValid = false;
        }
      } else {
        nameInput.customMessage = '';
        costumIsValid = true;
      }
    }
    if (name === 'email') {
      const emailInput = event.target;
      const emailValue = emailInput.value;
      const isInputValid = testEmail(emailValue);
      if (isInputValid) {
        emailInput.customMessage = '';
        costumIsValid = true;
      } else {
        emailInput.customMessage = 'Please fill in a valid Email';
        costumIsValid = false;
      }
    }
    if (name === 'phoneNumber') {
      const phoneNumberInput = event.target;
      const phoneNumberValue = phoneNumberInput.value;
      const isInputValid = testPhoneNumber(phoneNumberValue);
      if (isInputValid) {
        phoneNumberInput.customMessage = '';
        costumIsValid = true;
      }
      if (!isInputValid) {
        if (phoneNumberValue.length === 0) {
          phoneNumberInput.customMessage = '';
          costumIsValid = true;
        } else {
          phoneNumberInput.customMessage = 'Please fill in a valid Phone number';
          costumIsValid = false;
        }
      }
    }
    if (name === 'message') {
      const messageInput = event.target;
      const messageValue = messageInput.value;
      const isInputValid = testMessage(messageValue);
      if (isInputValid) {
        messageInput.customMessage = '';
        costumIsValid = true;
      } else {
        messageInput.customMessage = 'Your message is not valid';
        costumIsValid = false;
      }
    }
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.customMessage || event.target.validationMessage });
    setIsValid(costumIsValid ? event.target.closest('form').checkValidity() : false);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
};

export default useFormValidation;
