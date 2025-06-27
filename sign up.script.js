function toggleVisibility(inputId, iconElement) {
  const input = document.getElementById(inputId);
  const isPassword = input.type === "password";

  input.type = isPassword ? "text" : "password";

  iconElement.innerHTML = isPassword ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
}