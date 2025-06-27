document.getElementById('feedbackForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Mencegah reload

  // Simulasi submit (misalnya nanti ke backend / Google Form / DB)
  document.getElementById('feedbackForm').reset();
  document.getElementById('feedbackSuccess').classList.remove('hidden');
});
  