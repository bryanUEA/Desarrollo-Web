const form = document.getElementById("form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const ageInput = document.getElementById("age");

const submitBtn = document.getElementById("submitBtn");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const ageError = document.getElementById("ageError");

// Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]).{8,}$/;

function setValid(input, errorEl) {
  input.classList.remove("invalid");
  input.classList.add("valid");
  errorEl.textContent = "";
}

function setInvalid(input, errorEl, message) {
  input.classList.remove("valid");
  input.classList.add("invalid");
  errorEl.textContent = message;
}

function setNeutral(input, errorEl) {
  input.classList.remove("valid", "invalid");
  errorEl.textContent = "";
}

function validateName() {
  const value = nameInput.value.trim();
  if (value.length === 0) {
    setInvalid(nameInput, nameError, "El nombre es obligatorio.");
    return false;
  }
  if (value.length < 3) {
    setInvalid(nameInput, nameError, "El nombre debe tener al menos 3 caracteres.");
    return false;
  }
  setValid(nameInput, nameError);
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  if (value.length === 0) {
    setInvalid(emailInput, emailError, "El correo es obligatorio.");
    return false;
  }
  if (!emailRegex.test(value)) {
    setInvalid(emailInput, emailError, "Ingresa un correo válido (ej: usuario@dominio.com).");
    return false;
  }
  setValid(emailInput, emailError);
  return true;
}

function validatePassword() {
  const value = passwordInput.value;
  if (value.length === 0) {
    setInvalid(passwordInput, passwordError, "La contraseña es obligatoria.");
    return false;
  }
  if (!passwordRegex.test(value)) {
    setInvalid(
      passwordInput,
      passwordError,
      "Debe tener 8+ caracteres, al menos 1 número y 1 carácter especial."
    );
    return false;
  }
  setValid(passwordInput, passwordError);
  return true;
}

function validateConfirmPassword() {
  const pass = passwordInput.value;
  const confirm = confirmPasswordInput.value;

  if (confirm.length === 0) {
    setInvalid(confirmPasswordInput, confirmPasswordError, "Confirma tu contraseña.");
    return false;
  }
  if (confirm !== pass) {
    setInvalid(confirmPasswordInput, confirmPasswordError, "Las contraseñas no coinciden.");
    return false;
  }
  setValid(confirmPasswordInput, confirmPasswordError);
  return true;
}

function validateAge() {
  const value = ageInput.value.trim();
  if (value.length === 0) {
    setInvalid(ageInput, ageError, "La edad es obligatoria.");
    return false;
  }
  const age = Number(value);
  if (Number.isNaN(age) || !Number.isInteger(age)) {
    setInvalid(ageInput, ageError, "Ingresa una edad válida (número entero).");
    return false;
  }
  if (age < 18) {
    setInvalid(ageInput, ageError, "Debes ser mayor o igual a 18 años.");
    return false;
  }
  setValid(ageInput, ageError);
  return true;
}

function validateAll() {
  const isNameOk = validateName();
  const isEmailOk = validateEmail();
  const isPasswordOk = validatePassword();

  // Si la contraseña cambia, revalidar confirmación
  const isConfirmOk = validateConfirmPassword();
  const isAgeOk = validateAge();

  const allOk = isNameOk && isEmailOk && isPasswordOk && isConfirmOk && isAgeOk;
  submitBtn.disabled = !allOk;
  return allOk;
}

// Validaciones en tiempo real
nameInput.addEventListener("input", () => { validateName(); validateAll(); });
emailInput.addEventListener("input", () => { validateEmail(); validateAll(); });

passwordInput.addEventListener("input", () => {
  validatePassword();
  // Revalidar confirmación si ya escribieron algo
  if (confirmPasswordInput.value.length > 0) validateConfirmPassword();
  validateAll();
});

confirmPasswordInput.addEventListener("input", () => { validateConfirmPassword(); validateAll(); });
ageInput.addEventListener("input", () => { validateAge(); validateAll(); });

// Envío
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateAll()) {
    alert("✅ Formulario validado correctamente. ¡Enviado con éxito!");
    form.reset();
    // Limpiar estilos y re-desactivar
    [nameInput, emailInput, passwordInput, confirmPasswordInput, ageInput].forEach((inp) => {
      inp.classList.remove("valid", "invalid");
    });
    [nameError, emailError, passwordError, confirmPasswordError, ageError].forEach((err) => (err.textContent = ""));
    submitBtn.disabled = true;
  }
});

// Reset
form.addEventListener("reset", () => {
  // Espera a que el navegador limpie valores
  setTimeout(() => {
    [nameInput, emailInput, passwordInput, confirmPasswordInput, ageInput].forEach((inp) => {
      inp.classList.remove("valid", "invalid");
    });
    [nameError, emailError, passwordError, confirmPasswordError, ageError].forEach((err) => (err.textContent = ""));
    submitBtn.disabled = true;
  }, 0);
});
