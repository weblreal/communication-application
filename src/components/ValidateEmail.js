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
    console.log(1);
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
    console.log(2);
    return false;
  }

  // dot morthan 1 invalid before @
  emailArr.map((char) => {
    if (char === '.') {
      dotCounter++;
    }
  });
  if (dotCounter > 1) {
    console.log(3);
    return false;
  }

  // invalid empty value
  if (!email) {
    console.log(4);
    return false;
  }

  if (!isNaN(email)) {
    console.log(5);
    return false;
  }

  // must includes @
  if (!emailArr.includes('@')) {
    console.log(6);
    return false;
  }

  // email don't have .
  if (!emailArr.includes('.')) {
    console.log(7);
    return false;
  }
  return true;
};

export default ValidateEmail;
