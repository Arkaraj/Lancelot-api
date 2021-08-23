export const regexStrings = {
  username: /^[a-z]{1}[a-z0-9._]+$/,
  name: /^[a-zA-z]{1}[a-zA-Z0-9,\s.'-]+$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
  phoneCode: /^(\+?\d{1,3}|\d{1,4})$/,
  phoneNumber: /^[1-9]{1}\d{9}$/,
  description: /^[a-zA-z]{1}[a-zA-z0-9.,_\s'"]+$/,
};
