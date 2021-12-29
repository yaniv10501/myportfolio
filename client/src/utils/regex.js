export const testEmail = (email) => {
  const pattern =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[x01-x08x0bx0cx0e-x1fx21x23-x5bx5d-x7f]|\\[x01-x09x0bx0cx0e-x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[x01-x08x0bx0cx0e-x1fx21-x5ax53-x7f]|\\[x01-x09x0bx0cx0e-x7f])+)\])/;

  return {
    valid: pattern.test(email),
    match: email.match(pattern),
  };
};

export const testPhoneNumber = (phoneNumber) => {
  const pattern = /^(\+\d{1,3}\s?)?\(?\d{2,3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

  return {
    valid: pattern.test(phoneNumber),
    match: phoneNumber.match(pattern),
  };
};

export const testName = (name) => {
  const pattern = /^[a-zA-Z]+$/;

  return {
    valid: pattern.test(name),
    match: name.match(pattern),
  };
};

export const testMessage = (message) => {
  const pattern = /[<>]/;

  return {
    valid: !pattern.test(message),
    match: message.match(pattern),
  };
};
