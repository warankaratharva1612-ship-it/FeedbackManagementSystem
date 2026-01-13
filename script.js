
const form = document.getElementById('universalFeedbackForm');
const successMsg = document.getElementById('successMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Submitting...";
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("http://localhost:3000/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            successMsg.style.display = "block";
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        } else {
            alert("Failed to save feedback");
        }

    } catch (error) {
        console.error(error);
        alert("Backend not running. Run: node server.js");
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});
