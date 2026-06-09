document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const privacyCheckbox = document.getElementById('privacy');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('submit-success');

    // Validation patterns
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

    // State
    const validity = {
        name: false,
        email: false,
        message: false,
        privacy: false
    };

    /**
     * Stores the validity of a field and toggles its error/success styling,
     * then re-evaluates whether the whole form is valid.
     * @param {HTMLInputElement|HTMLTextAreaElement} field - The field to validate.
     * @param {boolean} isValid - Whether the field's current value is valid.
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

    /** Enables the submit button only when all fields (incl. privacy) are valid. */
    function checkFormValidity() {
        const isFormValid = validity.name && validity.email && validity.message && validity.privacy;
        submitBtn.disabled = !isFormValid;
    }

    // onBlur validation logic
    nameInput.addEventListener('blur', () => {
        validateField(nameInput, nameInput.value.trim().length > 0);
    });

    emailInput.addEventListener('blur', () => {
        validateField(emailInput, emailPattern.test(emailInput.value.trim()));
    });

    messageInput.addEventListener('blur', () => {
        validateField(messageInput, messageInput.value.trim().length > 0);
    });

    // Checkbox doesn't use blur, usually change is better
    privacyCheckbox.addEventListener('change', () => {
        validateField(privacyCheckbox, privacyCheckbox.checked);
    });

    // Also validate on input once error state is active to clear it quickly
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

    // Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (submitBtn.disabled) return;

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        try {
            const response = await fetch('contact.php', {
                method: 'POST',
                body: new FormData(form)
            });

            if (!response.ok) throw new Error('Request failed');

            form.reset();

            // Reset validation state after a successful send
            ['name', 'email', 'message'].forEach(id => {
                const el = document.getElementById(id);
                const group = el.closest('.form-group');
                group.classList.remove('success');
                group.classList.remove('error');
            });
            validity.name = false;
            validity.email = false;
            validity.message = false;
            validity.privacy = false;
            checkFormValidity();

            // Restore the original button content and re-apply the active language
            submitBtn.innerHTML = `<span data-i18n="btn_send">Send message</span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;

            const activeLangBtn = document.querySelector('.lang-btn.active');
            if (activeLangBtn) activeLangBtn.click();

            successMessage.classList.remove('hidden');
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);

        } catch (error) {
            console.error('Error submitting form:', error);
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Error. Try again.';
        }
    });
});
