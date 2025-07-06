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

    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Simpan username ke sessionStorage
        sessionStorage.setItem("username", data.username);

        // Redirect ke dashboard
        window.location.href = "index.html";
      } else {
        const errorText = await response.text();
        showError(errorText || "Login gagal. Periksa email dan password.");
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
