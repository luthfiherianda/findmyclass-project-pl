// Fungsi toggle password
function toggleVisibility(inputId, iconElement) {
  const input = document.getElementById(inputId);
  const isPassword = input.type === "password";

  input.type = isPassword ? "text" : "password";
  iconElement.innerHTML = isPassword
    ? '<i class="fas fa-eye-slash"></i>'
    : '<i class="fas fa-eye"></i>';
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = form.querySelector('input[name="username"]').value;
    const password = form.querySelector('input[name="password"]').value;

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Simpan username ke sessionStorage
        sessionStorage.setItem("username", username);

        // Redirect ke dashboard
        window.location.href = "index.html";
      } else {
        const data = await response.text();
        showError(data || "Login gagal. Periksa username dan password.");
      }
    } catch (error) {
      showError("Terjadi kesalahan jaringan. Silakan coba lagi.");
      console.error("Login error:", error);
    }
  });
});

function showError(message) {
  let errorBox = document.getElementById("error-message");
  if (!errorBox) {
    errorBox = document.createElement("div");
    errorBox.id = "error-message";
    errorBox.style.color = "red";
    errorBox.style.marginTop = "10px";
    document.querySelector("form").prepend(errorBox);
  }
  errorBox.textContent = message;
}