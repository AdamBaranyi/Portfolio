document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const privacyCheckbox = document.getElementById('privacy');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('submit-success');

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

    const validity = {
        name: false,
        email: false,
        message: false,
        privacy: false
    };

    /**
     * Updates the validation state of a specific field and applies corresponding CSS classes.
     * Triggers the global form validity check afterwards.
     * 
     * @param {HTMLElement} field - The input element to validate (input, textarea, or checkbox).
     * @param {boolean} isValid - Boolean indicating if the current field value is valid.
     * @returns {void}
     */
    function validateField(field, isValid) {
        const formGroup = field.closest('.form-group');
        validity[field.name] = isValid;

        if (isValid) {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
        } else {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
        }

        checkFormValidity();
    }

    /**
     * Checks if all required fields are valid and updates the submit button state.
     * 
     * @returns {void}
     */
    function checkFormValidity() {
        const isFormValid = validity.name && validity.email && validity.message && validity.privacy;
        submitBtn.disabled = !isFormValid;
    }

    nameInput.addEventListener('blur', () => {
        validateField(nameInput, nameInput.value.trim().length > 0);
    });

    emailInput.addEventListener('blur', () => {
        validateField(emailInput, emailPattern.test(emailInput.value.trim()));
    });

    messageInput.addEventListener('blur', () => {
        validateField(messageInput, messageInput.value.trim().length > 0);
    });

    privacyCheckbox.addEventListener('change', () => {
        validateField(privacyCheckbox, privacyCheckbox.checked);
    });

    // clear error state instantly while typing
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup.classList.contains('error')) {
                if (input === emailInput) {
                    validateField(emailInput, emailPattern.test(emailInput.value.trim()));
                } else {
                    validateField(input, input.value.trim().length > 0);
                }
            }
        });
    });

    /**
     * Resets form validation state and UI classes.
     * @returns {void}
     */
    function resetFormState() {
        form.reset();
        ['name', 'email', 'message'].forEach(id => {
            const el = document.getElementById(id);
            const group = el.closest('.form-group');
            group.classList.remove('success', 'error');
        });
        validity.name = validity.email = validity.message = validity.privacy = false;
        checkFormValidity();
    }

    /**
     * Shows success message and resets submit button.
     * @returns {void}
     */
    function handleSuccess() {
        resetFormState();
        submitBtn.innerHTML = `<span data-i18n="btn_send">Send message</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
        const activeLangBtn = document.querySelector('.lang-btn.active');
        if (activeLangBtn) activeLangBtn.click();
        successMessage.classList.remove('hidden');
        setTimeout(() => successMessage.classList.add('hidden'), 5000);
    }

    /**
     * Handles the form submission via fetch.
     * @param {Event} e - Submit event.
     * @returns {Promise<void>}
     */
    async function submitForm(e) {
        e.preventDefault();
        if (submitBtn.disabled) return;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
        try {
            const res = await fetch('contact.php', { method: 'POST', body: new FormData(form) });
            if (!res.ok) throw new Error('Request failed');
            handleSuccess();
        } catch (error) {
            console.error('Submission error:', error);
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Error. Try again.';
        }
    }

    form.addEventListener('submit', submitForm);
});
