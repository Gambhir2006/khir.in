// Contact Page JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeFAQ();
    initializeNewsletter();
});

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateContactForm(data)) {
                submitContactForm(data);
            }
        });
    }
}

function validateContactForm(data) {
    const errors = [];
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    // Email validation
    if (!validateEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Phone validation (optional)
    if (data.phone && !validatePhone(data.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    // Subject validation
    if (!data.subject) {
        errors.push('Please select a subject');
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    // Show errors if any
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }
    
    return true;
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function showFormErrors(errors) {
    const errorHtml = errors.map(error => `<li>${error}</li>`).join('');
    
    showNotification(`
        <div style="text-align: left;">
            <strong>Please fix the following errors:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
                ${errorHtml}
            </ul>
        </div>
    `, 'error');
}

function submitContactForm(data) {
    // Show loading state
    const submitButton = document.querySelector('.btn-submit');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In a real application, this would send data to a server
        console.log('Contact form submitted:', data);
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Restore button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Thank you for contacting us! We will get back to you within 24 hours.', 'success');
        
        // Track event
        trackEvent('Contact Form Submitted', 'Contact');
        
        // If newsletter subscription was checked
        if (data.newsletter) {
            subscribeToNewsletter(data.email);
        }
    }, 2000);
}

// FAQ Functionality
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Newsletter Subscription
function initializeNewsletter() {
    const newsletterForm = document.querySelector('.contact-form .newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                subscribeToNewsletter(email);
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
}

function subscribeToNewsletter(email) {
    // In a real application, this would send the email to a server
    showNotification('Successfully subscribed to newsletter!', 'success');
    
    // Clear form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.querySelector('input[type="email"]').value = '';
    }
    
    // Track event
    trackEvent('Newsletter Subscription', 'Contact');
}

// Social Media Functions
function openWhatsApp() {
    const phoneNumber = '+919876543210';
    const message = encodeURIComponent('Hi! I found your contact on KHIR.IN and would like to know more about your services.');
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // Track event
    trackEvent('WhatsApp Contact Click', 'Social Media');
}

function openTelegram() {
    const telegramUrl = 'https://t.me/khirin_jobs';
    window.open(telegramUrl, '_blank');
    
    // Track event
    trackEvent('Telegram Channel Click', 'Social Media');
}

// Form Field Validation
function initializeFieldValidation() {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (fieldValue.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
            break;
            
        case 'email':
            if (!validateEmail(fieldValue)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
            
        case 'phone':
            if (fieldValue && !validatePhone(fieldValue)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
            break;
            
        case 'subject':
            if (!fieldValue) {
                isValid = false;
                errorMessage = 'Please select a subject';
            }
            break;
            
        case 'message':
            if (fieldValue.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Auto-save form data
function initializeAutoSave() {
    const form = document.getElementById('contactForm');
    const formFields = form.querySelectorAll('input, select, textarea');
    
    // Load saved data
    formFields.forEach(field => {
        const savedValue = localStorage.getItem(`contact_${field.name}`);
        if (savedValue) {
            field.value = savedValue;
        }
    });
    
    // Save data on input
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            localStorage.setItem(`contact_${field.name}`, this.value);
        });
    });
    
    // Clear saved data on successful submission
    form.addEventListener('submit', function() {
        formFields.forEach(field => {
            localStorage.removeItem(`contact_${field.name}`);
        });
    });
}

// Character counter for message field
function initializeCharacterCounter() {
    const messageField = document.getElementById('message');
    const maxLength = 1000;
    
    if (messageField) {
        // Create counter element
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.textContent = `0 / ${maxLength}`;
        
        messageField.parentNode.appendChild(counter);
        
        // Update counter on input
        messageField.addEventListener('input', function() {
            const currentLength = this.value.length;
            counter.textContent = `${currentLength} / ${maxLength}`;
            
            if (currentLength > maxLength) {
                counter.classList.add('error');
                this.value = this.value.substring(0, maxLength);
            } else {
                counter.classList.remove('error');
            }
        });
    }
}

// File upload (if needed)
function initializeFileUpload() {
    const fileInput = document.querySelector('input[type="file"]');
    
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            const maxSize = 5 * 1024 * 1024; // 5MB
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            
            if (file) {
                if (file.size > maxSize) {
                    showNotification('File size must be less than 5MB', 'error');
                    this.value = '';
                    return;
                }
                
                if (!allowedTypes.includes(file.type)) {
                    showNotification('Only PDF and Word documents are allowed', 'error');
                    this.value = '';
                    return;
                }
                
                showNotification(`File "${file.name}" uploaded successfully`, 'success');
            }
        });
    }
}

// Add CSS for form validation
const formStyles = `
    .contact-form input.error,
    .contact-form select.error,
    .contact-form textarea.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
    
    .field-error {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 5px;
    }
    
    .character-counter {
        font-size: 0.875rem;
        color: #6c757d;
        text-align: right;
        margin-top: 5px;
    }
    
    .character-counter.error {
        color: #dc3545;
    }
    
    .btn-submit:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    .btn-submit.loading {
        background: #6c757d;
    }
`;

// Add styles to head
const formStyleSheet = document.createElement('style');
formStyleSheet.textContent = formStyles;
document.head.appendChild(formStyleSheet);

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    initializeFieldValidation();
    initializeAutoSave();
    initializeCharacterCounter();
    initializeFileUpload();
});

// Analytics tracking
function trackEvent(action, category = 'Contact Page') {
    console.log(`Contact Page Analytics: ${category} - ${action}`);
    // In a real application, this would send data to analytics service
}

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const contactForm = document.getElementById('contactForm');
        if (contactForm && document.activeElement.form === contactForm) {
            contactForm.dispatchEvent(new Event('submit'));
        }
    }
});

// Escape key to close notifications
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.remove();
        });
    }
});

// Page visibility tracking
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        trackEvent('Page Visible', 'Contact Page');
    }
});

// Initialize on page load
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Contact page loaded in ${loadTime.toFixed(2)}ms`);
    
    trackEvent('Page Load', 'Contact Page');
});
