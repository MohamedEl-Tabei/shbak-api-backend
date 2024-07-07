const password = (password, error) => {
  if (password.length < 8)
    error.message = error.message.concat(
      "Password is too short. The minimum length is 8 characters.∞"
    );
  else if (password.length > 20)
    error.message = error.message.concat(
      "Password is too long. The maximum length is 20 characters.∞"
    );
  if (!/[0-9]/.test(password))
    error.message = error.message.concat("Password must contain numbers 0-9.∞");
  if (!/[a-z]/.test(password))
    error.message = error.message.concat(
      "Password must contain lowercase letters a-z.∞"
    );
  if (!/[A-Z]/.test(password))
    error.message = error.message.concat(
      "Password must contain uppercase letters A-Z.∞"
    );
  if (!/[!@#$%^&*]/.test(password))
    error.message = error.message.concat(
      "Password must contain special characters [!@#$%^&*].∞"
    );
};

const validator = { password };
module.exports = validator;
