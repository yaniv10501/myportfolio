import { testEmail, testName, testPhoneNumber, testMessage } from './regex';

export const handleEmailChange = (event, setEmail, setEmailError) => {
  const email = event.target.value;

  setEmail(email);

  if (email.length === 0) {
    setEmailError({
      isValid: false,
      inputError: 'Please fill in your Email',
    });
    return;
  }

  const emailValid = testEmail(email);

  if (emailValid.valid) {
    setEmailError({
      isValid: true,
      inputError: '',
    });

    setEmail(emailValid.match[0]);
  } else {
    setEmailError({
      isValid: false,
      inputError: 'Please fill in a valid Email.',
    });
  }
};

export const checkPhoneNumber = (phoneNumber, setPhoneNumberError) => {
  if (phoneNumber.length === 0) {
    setPhoneNumberError({
      isValid: true,
      inputError: '',
    });
    return;
  }

  const phoneNumberValid = testPhoneNumber(phoneNumber);

  if (phoneNumberValid.valid) {
    setPhoneNumberError({
      isValid: true,
      inputError: '',
    });
  } else {
    setPhoneNumberError({
      isValid: false,
      inputError: 'Please fill in a valid Phone number',
    });
  }
};

export const checkName = (name, setNameError) => {
  if (name.length === 0) {
    setNameError({
      isValid: false,
      inputError: 'Please fill in your name',
    });
    return;
  }

  const nameValid = testName(name);

  if (nameValid.valid) {
    setNameError({
      isValid: true,
      inputError: '',
    });
  } else {
    setNameError({
      isValid: false,
      inputError: 'Please fill in a valid name',
    });
  }
};

export const checkMessage = (message, setMessageError) => {
  if (message.length === 0) {
    setMessageError({
      isValid: false,
      inputError: 'Please fill in your message',
    });
    return;
  }

  const messageValid = testMessage(message);

  if (messageValid.valid) {
    setMessageError({
      isValid: true,
      inputError: '',
    });
  } else {
    setMessageError({
      isValid: false,
      inputError: 'Your message is not valid',
    });
  }
};
