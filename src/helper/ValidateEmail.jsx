const ValidateEmail = (email) => {
  const dotPosition = email.indexOf('.');
  const dotLastPosition = email.lastIndexOf('.');
  const atLastSlice = email.slice(email.lastIndexOf('@'));
  const atSlice = email.slice(email.indexOf('@'));
  const emailArr = atLastSlice.split('');
  let dotCounter = 0;
  let atCounter = 0;

  // start dot and end dot not valid
  if (dotPosition === 0 || dotLastPosition + 1 === email.length) {
    return false;
  }

  // @ morethan 1 invalid
  const atSliceArray = atSlice.split('');
  atSliceArray.map((char) => {
    if (char === '@') {
      atCounter++;
    }
  });
  if (atCounter > 1) {
    return false;
  }

  // dot morthan 1 invalid before @
  emailArr.map((char) => {
    if (char === '.') {
      dotCounter++;
    }
  });
  if (dotCounter > 1) {
    return false;
  }

  // invalid empty value
  if (!email) {
    return false;
  }

  if (!isNaN(email)) {
    return false;
  }

  // must includes @
  if (!emailArr.includes('@')) {
    return false;
  }

  // email don't have .
  if (!emailArr.includes('.')) {
    return false;
  }
  return true;
};

export default ValidateEmail;
