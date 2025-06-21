document.addEventListener("DOMContentLoaded", function () {
  const scrollContent = document.getElementById("scrollContent");
  const checkbox = document.getElementById("agree");
  const continueBtn = document.getElementById("continueBtn");
  const closeBtn = document.getElementById("closePopup");
  const popup = document.getElementById("popup");

  scrollContent.addEventListener("scroll", () => {
    const bottomReached =
      scrollContent.scrollTop + scrollContent.clientHeight >= scrollContent.scrollHeight - 1;

    if (bottomReached) {
      checkbox.disabled = false;
    }
  });

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      continueBtn.disabled = false;
      continueBtn.classList.add("enabled");
    } else {
      continueBtn.disabled = true;
      continueBtn.classList.remove("enabled");
    }
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
});
