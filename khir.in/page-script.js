// Common JavaScript for About and other static pages

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeScrollEffects();
    initializeNewsletter();
    initializeSocialLinks();
});

// Scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section-card, .value-item, .team-member, .service-item, .testimonial-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Scroll effects
function initializeScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('.header');
        
        // Header scroll effect
        if (header) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Newsletter subscription
function initializeNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                subscribeToNewsletter(email, this);
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    });
}

function subscribeToNewsletter(email, form) {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In a real application, this would send data to a server
        console.log('Newsletter subscription:', email);
        
        // Reset form
        form.reset();
        
        // Restore button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Successfully subscribed to our newsletter!', 'success');
        
        // Track event
        trackEvent('Newsletter Subscription', 'About Page');
    }, 1500);
}

// Social links
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-links a, .member-social a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('href').substring(1);
            trackEvent(`Social Link Click: ${platform}`, 'Social Media');
        });
    });
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const animate = () => {
            const target = +counter.innerText.replace(/\D/g, '');
            const count = +counter.innerText.replace(/\D/g, '');
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment) + counter.innerText.replace(/\d/g, '').replace(/\+/g, '');
                setTimeout(animate, 1);
            } else {
                counter.innerText = target + counter.innerText.replace(/\d/g, '').replace(/\+/g, '');
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Smooth scroll for anchor links
function initializeSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
}

// Tab functionality (if needed)
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.querySelector(`[data-tab-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Image lazy loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Print functionality
function initializePrint() {
    const printButtons = document.querySelectorAll('.btn-print');
    
    printButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.print();
            trackEvent('Page Print', 'About Page');
        });
    });
}

// Share functionality
function initializeShare() {
    const shareButtons = document.querySelectorAll('.btn-share');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const url = window.location.href;
            const title = document.title;
            
            if (navigator.share) {
                navigator.share({
                    title: title,
                    url: url
                });
            } else {
                // Fallback for browsers that don't support Web Share API
                copyToClipboard(url);
                showNotification('Link copied to clipboard!', 'success');
            }
            
            trackEvent('Page Share', 'About Page');
        });
    });
}

// Copy to clipboard
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Search functionality (if needed)
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.search-btn');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm.length < 3) {
        showNotification('Please enter at least 3 characters to search', 'warning');
        return;
    }
    
    // In a real application, this would perform actual search
    console.log('Searching for:', searchTerm);
    showNotification(`Searching for "${searchTerm}"...`, 'info');
    
    trackEvent('Search Performed', 'About Page');
}

// Theme toggle (if implemented)
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            trackEvent(`Theme Changed to ${isDark ? 'Dark' : 'Light'}`, 'UI');
        });
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Cookie consent (if needed)
function initializeCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    
    if (!consent) {
        showCookieConsent();
    }
}

function showCookieConsent() {
    const consentHtml = `
        <div class="cookie-consent">
            <div class="cookie-content">
                <p>We use cookies to improve your experience on our site. By continuing to browse, you agree to our <a href="#privacy">Privacy Policy</a>.</p>
                <div class="cookie-buttons">
                    <button class="btn-accept">Accept</button>
                    <button class="btn-decline">Decline</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', consentHtml);
    
    // Add event listeners
    document.querySelector('.btn-accept').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        document.querySelector('.cookie-consent').remove();
        trackEvent('Cookie Consent Accepted', 'Privacy');
    });
    
    document.querySelector('.btn-decline').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'declined');
        document.querySelector('.cookie-consent').remove();
        trackEvent('Cookie Consent Declined', 'Privacy');
    });
}

// Add CSS for animations and other features
const pageStyles = `
    .section-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .section-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .value-item,
    .team-member,
    .service-item,
    .testimonial-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }
    
    .value-item.animate-in,
    .team-member.animate-in,
    .service-item.animate-in,
    .testimonial-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .value-item.animate-in:nth-child(1) { transition-delay: 0.1s; }
    .value-item.animate-in:nth-child(2) { transition-delay: 0.2s; }
    .value-item.animate-in:nth-child(3) { transition-delay: 0.3s; }
    .value-item.animate-in:nth-child(4) { transition-delay: 0.4s; }
    
    .team-member.animate-in:nth-child(1) { transition-delay: 0.1s; }
    .team-member.animate-in:nth-child(2) { transition-delay: 0.2s; }
    .team-member.animate-in:nth-child(3) { transition-delay: 0.3s; }
    .team-member.animate-in:nth-child(4) { transition-delay: 0.4s; }
    
    .service-item.animate-in:nth-child(1) { transition-delay: 0.1s; }
    .service-item.animate-in:nth-child(2) { transition-delay: 0.2s; }
    .service-item.animate-in:nth-child(3) { transition-delay: 0.3s; }
    .service-item.animate-in:nth-child(4) { transition-delay: 0.4s; }
    .service-item.animate-in:nth-child(5) { transition-delay: 0.5s; }
    .service-item.animate-in:nth-child(6) { transition-delay: 0.6s; }
    
    .header {
        transition: transform 0.3s ease;
    }
    
    .cookie-consent {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #2c3e50;
        color: white;
        padding: 20px;
        z-index: 9999;
        transform: translateY(100%);
        transition: transform 0.3s ease;
    }
    
    .cookie-consent.show {
        transform: translateY(0);
    }
    
    .cookie-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
    }
    
    .cookie-content p {
        margin: 0;
        flex: 1;
        min-width: 300px;
    }
    
    .cookie-content a {
        color: #3498db;
        text-decoration: underline;
    }
    
    .cookie-buttons {
        display: flex;
        gap: 10px;
    }
    
    .btn-accept, .btn-decline {
        padding: 8px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
    }
    
    .btn-accept {
        background: #27ae60;
        color: white;
    }
    
    .btn-accept:hover {
        background: #219a52;
    }
    
    .btn-decline {
        background: #95a5a6;
        color: white;
    }
    
    .btn-decline:hover {
        background: #7f8c8d;
    }
    
    @media (max-width: 768px) {
        .cookie-content {
            flex-direction: column;
            text-align: center;
        }
        
        .cookie-buttons {
            justify-content: center;
        }
    }
    
    /* Dark theme styles */
    body.dark-theme {
        background-color: #1a1a1a;
        color: #e0e0e0;
    }
    
    body.dark-theme .section-card {
        background-color: #2d2d2d;
        color: #e0e0e0;
    }
    
    body.dark-theme .header {
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    }
    
    body.dark-theme .footer {
        background-color: #1a1a1a;
    }
    
    body.dark-theme .value-item,
    body.dark-theme .team-member,
    body.dark-theme .service-item,
    body.dark-theme .testimonial-item {
        background-color: #2d2d2d;
    }
`;

// Add styles to head
const pageStyleSheet = document.createElement('style');
pageStyleSheet.textContent = pageStyles;
document.head.appendChild(pageStyleSheet);

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    animateCounters();
    initializeSmoothScroll();
    initializeTabs();
    initializeLazyLoading();
    initializePrint();
    initializeShare();
    initializeSearch();
    initializeThemeToggle();
    initializeCookieConsent();
});

// Show cookie consent after page load
setTimeout(() => {
    const cookieConsent = document.querySelector('.cookie-consent');
    if (cookieConsent) {
        cookieConsent.classList.add('show');
    }
}, 2000);

// Analytics tracking
function trackEvent(action, category = 'About Page') {
    console.log(`About Page Analytics: ${category} - ${action}`);
    // In a real application, this would send data to analytics service
}

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`About page loaded in ${loadTime.toFixed(2)}ms`);
    
    trackEvent('Page Load', 'About Page');
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
    
    // Ctrl/Cmd + F for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
    }
    
    // Home key to scroll to top
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // End key to scroll to bottom
    if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// Accessibility improvements
function initializeAccessibility() {
    // Add ARIA labels to social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        const platform = link.querySelector('i').className.match(/fa-(\w+)/)[1];
        link.setAttribute('aria-label', `Follow us on ${platform}`);
    });
    
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #007bff;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility
document.addEventListener('DOMContentLoaded', initializeAccessibility);
