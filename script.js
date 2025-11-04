document.addEventListener('DOMContentLoaded', () => {
    const waForm = document.getElementById('wa-form');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const resultArea = document.getElementById('result-area');

    waForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop the form from submitting normally
        
        const phoneNumber = phoneNumberInput.value.trim();
        
        // Clear previous results/errors
        resultArea.innerHTML = '';
        resultArea.style.display = 'none';

        // --- Validation ---
        if (!phoneNumber) {
            showError('Please enter a phone number.');
            return;
        }

        // Must start with '+'
        if (!phoneNumber.startsWith('+')) {
            showError("Phone number must include '+' and the country code.");
            return;
        }

        // Remove all non-digit characters except the leading '+'
        const processedNumber = phoneNumber.substring(1).replace(/\D/g, '');

        if (processedNumber.length === 0) {
            showError('Please enter a valid phone number after the "+".');
            return;
        }

        // --- Success ---
        const waLink = `https://wa.me/${processedNumber}`;
        showResult(waLink);
    });

    function showResult(link) {
        resultArea.style.display = 'block';
        resultArea.innerHTML = `
            <strong>Here's your link:</strong>
            <p id="generated-link">${link}</p>
            <div class="result-actions">
                <button id="copy-btn">Copy Link</button>
                <a href="${link}" target="_blank" id="test-btn">Test Link</a>
            </div>
        `;
        
        // Add styling to the test button (which is an <a> tag)
        document.getElementById('test-btn').style = `
            display: inline-block;
            text-decoration: none;
            flex-grow: 1;
            background-color: #f0f0f0;
            color: #333;
            border: 1px solid #ddd;
            border-radius: 6px;
            padding: 8px;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
            text-align: center;
            transition: background-color 0.3s ease;
        `;

        // Add copy-to-clipboard functionality
        const copyBtn = document.getElementById('copy-btn');
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(link).then(() => {
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy Link';
                }, 2000); // Reset text after 2 seconds
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                showError('Failed to copy link. Please copy it manually.');
            });
        });
    }

    function showError(message) {
        resultArea.style.display = 'block';
        resultArea.innerHTML = `<p style="color: #D9534F; margin: 0;">${message}</p>`;
    }
});
