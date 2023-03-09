import ValidateEmail from './ValidateEmail';
// validate fields in edit inputs
const validation = (fullNameInput, emailInput, users, user) => {
  if (!fullNameInput.trim()) {
    alert('Please enter full name');
    return false;
  }

  if (!emailInput) {
    alert('Please enter email');
    return false;
  }

  // check if email already exist
  if (!ValidateEmail(emailInput)) {
    alert('Invalid email');
    return false;
  }

  // store all emails in the userObj
  const emails = [];
  users.map((user) => {
    emails.push(user.email);
  });

  emails.splice(users.indexOf(user), 1);
  // loop emails except current user
  for (let email of emails) {
    if (email === emailInput) {
      alert('Email already exist');
      return false;
    }
  }
  return true;
};

export default validation;
