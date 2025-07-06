function toggleVisibility(inputId, iconElement) {
  const input = document.getElementById(inputId);
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  iconElement.innerHTML = isPassword
    ? '<i class="fas fa-eye-slash"></i>'
    : '<i class="fas fa-eye"></i>';
}

document.getElementById("signup-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    username: form.username.value,
    nim: form.nim.value,
    email: form.email.value,
    password: form.password.value,
  };

  try {
    const response = await fetch("http://localhost:8080/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Registrasi berhasil!");
      form.reset();
    } else {
      const message = await response.text();
      alert("Registrasi gagal: " + message);
    }
  } catch (error) {
    alert("Terjadi kesalahan: " + error.message);
  }
});
