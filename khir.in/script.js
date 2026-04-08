// Job Portal JavaScript Functionality

// Sample job data
const jobData = [
    {
        id: 1,
        title: "Bihar Police Vacancy 2026 Apply Online",
        category: "govt",
        organization: "Bihar Police Department",
        location: "Bihar",
        vacancies: "2000+",
        qualification: "10th/12th Pass",
        ageLimit: "18-28 years",
        salary: "₹21,700 - ₹69,100/month",
        lastDate: "15 March 2026",
        postedDate: "2 hours ago",
        description: "Bihar Police Department has announced a massive recruitment drive for constable positions. Interested candidates can apply online through the official website."
    },
    {
        id: 2,
        title: "TCS Hiring Freshers 2026 - Multiple Positions",
        category: "private",
        organization: "Tata Consultancy Services",
        location: "Multiple Cities",
        vacancies: "5000+",
        qualification: "BE/BTech/MCA/MSc",
        ageLimit: "18-35 years",
        salary: "₹3.5 - 8 LPA",
        lastDate: "30 March 2026",
        postedDate: "5 hours ago",
        description: "TCS is hiring fresh graduates for various technical and non-technical positions across multiple locations in India."
    },
    {
        id: 3,
        title: "Google Summer Internship 2026 - Engineering",
        category: "internship",
        organization: "Google India",
        location: "Bangalore/Hyderabad",
        vacancies: "100+",
        qualification: "BE/BTech (CS/IT/ECE)",
        ageLimit: "N/A",
        salary: "₹50,000/month",
        lastDate: "25 March 2026",
        postedDate: "1 day ago",
        description: "Google is offering summer internship opportunities for engineering students in Bangalore and Hyderabad offices."
    },
    {
        id: 4,
        title: "UPSC Civil Services Exam 2026 Notification",
        category: "govt",
        organization: "Union Public Service Commission",
        location: "All India",
        vacancies: "900+",
        qualification: "Graduate",
        ageLimit: "21-32 years",
        salary: "₹56,100 - ₹2,50,000/month",
        lastDate: "1 April 2026",
        postedDate: "2 days ago",
        description: "UPSC has released the notification for Civil Services Examination 2026 for various administrative positions."
    },
    {
        id: 5,
        title: "SSC CGL 2026 Tier 1 Notification Out",
        category: "govt",
        organization: "Staff Selection Commission",
        location: "All India",
        vacancies: "3000+",
        qualification: "Graduate",
        ageLimit: "18-30 years",
        salary: "₹25,500 - ₹1,42,400/month",
        lastDate: "20 March 2026",
        postedDate: "3 days ago",
        description: "SSC has announced Combined Graduate Level Examination 2026 for various Group B and C positions."
    },
    {
        id: 6,
        title: "Amazon India Hiring 2026 - Software Development",
        category: "private",
        organization: "Amazon India",
        location: "Bangalore/Hyderabad/Delhi",
        vacancies: "500+",
        qualification: "BE/BTech/ME/MTech (CS/IT)",
        ageLimit: "21-35 years",
        salary: "₹8 - 25 LPA",
        lastDate: "15 April 2026",
        postedDate: "4 days ago",
        description: "Amazon is hiring software developers for various positions across Indian development centers."
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    initializeSearch();
    initializeNewsletter();
    initializeLoadMore();
    renderJobs(jobData);
});

// Filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.tab-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterJobs(category);
        });
    });
}

// Filter jobs by category
function filterJobs(category) {
    const filteredJobs = category === 'all' 
        ? jobData 
        : jobData.filter(job => job.category === category);
    
    renderJobs(filteredJobs);
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.search-box button');
    
    searchButton.addEventListener('click', searchJobs);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchJobs();
        }
    });
}

function searchJobs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (!searchTerm) {
        renderJobs(jobData);
        return;
    }
    
    const filteredJobs = jobData.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.organization.toLowerCase().includes(searchTerm) ||
        job.location.toLowerCase().includes(searchTerm) ||
        job.qualification.toLowerCase().includes(searchTerm)
    );
    
    renderJobs(filteredJobs);
    
    // Update active filter to "all"
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === 'all') {
            btn.classList.add('active');
        }
    });
}

// Render jobs
function renderJobs(jobs) {
    const jobList = document.getElementById('jobList');
    
    if (jobs.length === 0) {
        jobList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No jobs found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    jobList.innerHTML = jobs.map(job => createJobCard(job)).join('');
    
    // Add event listeners to job cards
    addJobCardListeners();
}

// Create job card HTML
function createJobCard(job) {
    const categoryClass = job.category;
    const categoryLabel = getCategoryLabel(job.category);
    
    return `
        <article class="job-card" data-category="${categoryClass}" data-job-id="${job.id}">
            <div class="job-header">
                <span class="job-type ${categoryClass}">${categoryLabel}</span>
                <span class="job-date">${job.postedDate}</span>
            </div>
            <h4><a href="#job-${job.id}" class="job-title">${job.title}</a></h4>
            <div class="job-meta">
                <span><i class="fas fa-building"></i> ${job.organization}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                <span><i class="fas fa-users"></i> ${job.vacancies} Posts</span>
            </div>
            <div class="job-details">
                <p><strong>Qualification:</strong> ${job.qualification}</p>
                <p><strong>Age Limit:</strong> ${job.ageLimit}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
                <p><strong>Last Date:</strong> ${job.lastDate}</p>
            </div>
            <div class="job-actions">
                <button class="btn-apply" onclick="applyForJob(${job.id})">
                    <i class="fas fa-external-link-alt"></i> Apply Now
                </button>
                <button class="btn-whatsapp-small" onclick="shareOnWhatsApp(${job.id})">
                    <i class="fab fa-whatsapp"></i> Share
                </button>
            </div>
        </article>
    `;
}

// Get category label
function getCategoryLabel(category) {
    const labels = {
        'govt': 'Government',
        'private': 'Private',
        'internship': 'Internship'
    };
    return labels[category] || 'Other';
}

// Add job card listeners
function addJobCardListeners() {
    document.querySelectorAll('.job-title').forEach(title => {
        title.addEventListener('click', function(e) {
            e.preventDefault();
            const jobId = this.getAttribute('href').replace('#job-', '');
            showJobDetail(jobId);
        });
    });
}

// Apply for job
function applyForJob(jobId) {
    const job = jobData.find(j => j.id === parseInt(jobId));
    if (job) {
        // In a real application, this would redirect to the actual application page
        showNotification(`Opening application page for: ${job.title}`, 'success');
        
        // Simulate opening application in new tab
        setTimeout(() => {
            console.log(`Applying for job: ${job.title}`);
        }, 1000);
    }
}

// Share on WhatsApp
function shareOnWhatsApp(jobId) {
    const job = jobData.find(j => j.id === parseInt(jobId));
    if (job) {
        const message = encodeURIComponent(
            `Check out this job opportunity: ${job.title}\n\n` +
            `Organization: ${job.organization}\n` +
            `Location: ${job.location}\n` +
            `Last Date: ${job.lastDate}\n\n` +
            `Apply now at: ${window.location.href}#job-${job.id}`
        );
        
        const whatsappUrl = `https://wa.me/?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }
}

// Show job detail
function showJobDetail(jobId) {
    const job = jobData.find(j => j.id === parseInt(jobId));
    if (job) {
        // Create modal or navigate to detail page
        console.log('Showing job detail for:', job.title);
        showNotification(`Loading details for: ${job.title}`, 'info');
    }
}

// Newsletter functionality
function initializeNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                subscribeNewsletter(email);
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Subscribe to newsletter
function subscribeNewsletter(email) {
    // In a real application, this would send the email to a server
    showNotification('Successfully subscribed to newsletter!', 'success');
    document.querySelector('.newsletter-form input[type="email"]').value = '';
}

// Load more functionality
function initializeLoadMore() {
    const loadMoreButton = document.querySelector('.btn-load-more');
    
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            loadMoreJobs();
        });
    }
}

// Load more jobs
function loadMoreJobs() {
    const button = document.querySelector('.btn-load-more');
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    // Simulate loading more jobs
    setTimeout(() => {
        // In a real application, this would fetch more jobs from a server
        const additionalJobs = [
            {
                id: jobData.length + 1,
                title: "IBPS PO 2026 Recruitment Drive",
                category: "govt",
                organization: "Institute of Banking Personnel Selection",
                location: "All India",
                vacancies: "4000+",
                qualification: "Graduate",
                ageLimit: "20-30 years",
                salary: "₹23,700 - ₹42,020/month",
                lastDate: "10 April 2026",
                postedDate: "5 days ago",
                description: "IBPS has announced PO recruitment for various public sector banks."
            }
        ];
        
        jobData.push(...additionalJobs);
        renderJobs(jobData);
        
        button.innerHTML = 'Load More Jobs <i class="fas fa-arrow-down"></i>';
        showNotification('More jobs loaded successfully!', 'success');
    }, 1500);
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Get notification icon
function getNotificationIcon(type) {
    const icons = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'info': 'fa-info-circle',
        'warning': 'fa-exclamation-triangle'
    };
    return icons[type] || 'fa-info-circle';
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

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav ul');
    nav.classList.toggle('mobile-menu-open');
}

// Sticky header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Add CSS for notifications
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease-out;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
    }
    
    .notification-success {
        border-left: 4px solid #28a745;
    }
    
    .notification-error {
        border-left: 4px solid #dc3545;
    }
    
    .notification-info {
        border-left: 4px solid #007bff;
    }
    
    .notification-warning {
        border-left: 4px solid #ffc107;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        margin-left: auto;
        color: #6c757d;
    }
    
    .notification-close:hover {
        color: #333;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .no-results {
        text-align: center;
        padding: 60px 20px;
        color: #6c757d;
    }
    
    .no-results i {
        font-size: 3rem;
        margin-bottom: 20px;
        opacity: 0.5;
    }
    
    .no-results h3 {
        font-size: 1.5rem;
        margin-bottom: 10px;
    }
    
    .header.scrolled {
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;

// Add notification styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Analytics tracking (mock)
function trackEvent(action, category = 'User Interaction') {
    console.log(`Analytics Event: ${category} - ${action}`);
    // In a real application, this would send data to analytics service
}

// Track page views
trackEvent('Page Load', 'Page View');

// Track job clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-apply')) {
        trackEvent('Job Apply Click', 'Job Interaction');
    }
    if (e.target.classList.contains('btn-whatsapp-small')) {
        trackEvent('WhatsApp Share Click', 'Social Sharing');
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    console.log('Service Worker support detected');
    // In a real application, you would register a service worker here
}
