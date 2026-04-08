// Results Page JavaScript Functionality

// Results data
const resultsData = [
    {
        id: 1,
        title: "UPSC Civil Services Final Result 2025 Released",
        category: "government",
        organization: "Union Public Service Commission",
        examDate: "September 2025",
        posts: "900+",
        status: "announced",
        resultDate: "Today",
        examType: "Civil Services Final",
        nextStep: "Document verification and medical examination",
        downloadUrl: "#upsc-final-2025",
        description: "UPSC has released the final result for Civil Services Examination 2025. Candidates can check their roll numbers and download the merit list."
    },
    {
        id: 2,
        title: "SSC CGL Tier 2 Result 2025 Released",
        category: "government",
        organization: "Staff Selection Commission",
        examDate: "November 2025",
        posts: "3500+",
        status: "announced",
        resultDate: "2 days ago",
        examType: "Combined Graduate Level Tier 2",
        nextStep: "Tier 3 (Descriptive Paper) on March 15, 2026",
        downloadUrl: "#ssc-cgl-tier2-2025",
        description: "SSC has announced the Tier 2 results for CGL 2025 examination. Qualified candidates will appear for Tier 3 exam."
    },
    {
        id: 3,
        title: "IBPS PO Main Result 2025 Released",
        category: "competitive",
        organization: "Institute of Banking Personnel Selection",
        examDate: "October 2025",
        posts: "4000+",
        status: "announced",
        resultDate: "3 days ago",
        examType: "Probationary Officer Main Exam",
        nextStep: "Interview from March 20, 2026",
        downloadUrl: "#ibps-po-main-2025",
        description: "IBPS has released the main examination results for PO recruitment in 11 public sector banks."
    },
    {
        id: 4,
        title: "RRB Group D Result 2025 - Expected Soon",
        category: "government",
        organization: "Railway Recruitment Board",
        examDate: "August-September 2025",
        posts: "1,00,000+",
        status: "expected",
        resultDate: "Expected: March 10, 2026",
        examType: "Group D Written Exam",
        nextStep: "Physical Efficiency Test (PET)",
        downloadUrl: "#rrb-group-d-2025",
        description: "RRB Group D result is under process and expected to be released soon. Candidates should prepare for PET."
    }
];

// Initialize results page
document.addEventListener('DOMContentLoaded', function() {
    initializeResultFilters();
    initializeResultSearch();
    initializeNewsletter();
    initializeNotifications();
    renderResults(resultsData);
});

// Result filter functionality
function initializeResultFilters() {
    const filterButtons = document.querySelectorAll('.admit-card-filters .tab-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterResults(category);
        });
    });
}

// Filter results by category
function filterResults(category) {
    const filteredResults = category === 'all' 
        ? resultsData 
        : resultsData.filter(result => result.category === category);
    
    renderResults(filteredResults);
}

// Search functionality
function initializeResultSearch() {
    const searchInput = document.getElementById('resultSearch');
    const searchButton = searchInput.nextElementSibling;
    
    if (searchButton) {
        searchButton.addEventListener('click', performResultSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performResultSearch();
            }
        });
    }
}

function performResultSearch() {
    const searchTerm = document.getElementById('resultSearch').value.toLowerCase();
    
    if (!searchTerm) {
        renderResults(resultsData);
        return;
    }
    
    const filteredResults = resultsData.filter(result => 
        result.title.toLowerCase().includes(searchTerm) ||
        result.organization.toLowerCase().includes(searchTerm) ||
        result.examType.toLowerCase().includes(searchTerm)
    );
    
    renderResults(filteredResults);
    
    // Reset filters
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === 'all') {
            btn.classList.add('active');
        }
    });
}

// Render results
function renderResults(results) {
    const resultsList = document.getElementById('resultsList');
    
    if (results.length === 0) {
        resultsList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No results found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    resultsList.innerHTML = results.map(result => createResultCard(result)).join('');
    
    // Add event listeners to result cards
    addResultCardListeners();
}

// Create result card HTML
function createResultCard(result) {
    const statusClass = result.status === 'announced' ? 'announced' : 'expected';
    const statusText = result.status === 'announced' ? 'Result Announced' : 'Expected Soon';
    
    return `
        <article class="result-item" data-category="${result.category}" data-result-id="${result.id}">
            <div class="result-header">
                <span class="result-badge ${statusClass}">${statusText}</span>
                <span class="result-date">${result.resultDate}</span>
            </div>
            <h3><a href="${result.downloadUrl}" class="result-title">${result.title}</a></h3>
            <div class="result-meta">
                <span><i class="fas fa-university"></i> ${result.organization}</span>
                <span><i class="fas fa-calendar"></i> Exam: ${result.examDate}</span>
                <span><i class="fas fa-users"></i> ${result.posts} Posts</span>
            </div>
            <div class="result-details">
                <p><strong>Exam Type:</strong> ${result.examType}</p>
                <p><strong>Result Status:</strong> ${statusText}</p>
                <p><strong>Next Step:</strong> ${result.nextStep}</p>
            </div>
            <div class="result-actions">
                ${result.status === 'announced' ? `
                    <button class="btn-view-result" onclick="viewResult(${result.id})">
                        <i class="fas fa-external-link-alt"></i> View Result
                    </button>
                    <button class="btn-download" onclick="downloadResult(${result.id})">
                        <i class="fas fa-download"></i> Download PDF
                    </button>
                ` : `
                    <button class="btn-notify" onclick="notifyResult(${result.id})">
                        <i class="fas fa-bell"></i> Notify Me
                    </button>
                `}
                <button class="btn-share-whatsapp" onclick="shareResult(${result.id})">
                    <i class="fab fa-whatsapp"></i> Share
                </button>
            </div>
        </article>
    `;
}

// Add result card listeners
function addResultCardListeners() {
    document.querySelectorAll('.result-title').forEach(title => {
        title.addEventListener('click', function(e) {
            e.preventDefault();
            const resultId = this.getAttribute('href').replace('#', '');
            showResultDetail(resultId);
        });
    });
}

// View result
function viewResult(resultId) {
    const result = resultsData.find(r => r.id === resultId);
    if (result) {
        // In a real application, this would open the official result page
        showNotification(`Opening result page for: ${result.title}`, 'info');
        
        // Simulate opening result in new tab
        setTimeout(() => {
            console.log(`Viewing result: ${result.title}`);
            window.open(result.downloadUrl, '_blank');
        }, 1000);
        
        // Track event
        trackEvent('Result Viewed', 'Results Page');
    }
}

// Download result
function downloadResult(resultId) {
    const result = resultsData.find(r => r.id === resultId);
    if (result) {
        showNotification(`Downloading result: ${result.title}`, 'success');
        
        // Simulate download
        setTimeout(() => {
            console.log(`Downloading result: ${result.title}`);
            // In a real application, this would trigger file download
            const link = document.createElement('a');
            link.href = result.downloadUrl;
            link.download = `${result.title.replace(/\s+/g, '_')}.pdf`;
            link.click();
        }, 1000);
        
        // Track event
        trackEvent('Result Downloaded', 'Results Page');
    }
}

// Share result on WhatsApp
function shareResult(resultId) {
    const result = resultsData.find(r => r.id === resultId);
    if (result) {
        const message = encodeURIComponent(
            `Check out this result: ${result.title}\n\n` +
            `Organization: ${result.organization}\n` +
            `Posts: ${result.posts}\n` +
            `Status: ${result.status === 'announced' ? 'Announced' : 'Expected Soon'}\n\n` +
            `View details at: ${window.location.href}#result-${result.id}`
        );
        
        const whatsappUrl = `https://wa.me/?text=${message}`;
        window.open(whatsappUrl, '_blank');
        
        // Track event
        trackEvent('Result Shared', 'Results Page');
    }
}

// Notify for result
function notifyResult(resultId) {
    const result = resultsData.find(r => r.id === resultId);
    if (result) {
        const email = prompt('Enter your email address to get notified when this result is released:');
        
        if (email && validateEmail(email)) {
            // In a real application, this would save to database
            showNotification(`We'll notify you at ${email} when ${result.title} is released!`, 'success');
            
            // Save to localStorage
            saveNotification(resultId, email);
            
            // Track event
            trackEvent('Result Notification Set', 'Results Page');
        } else if (email) {
            showNotification('Please enter a valid email address', 'error');
        }
    }
}

// Save notification to localStorage
function saveNotification(resultId, email) {
    const notifications = JSON.parse(localStorage.getItem('resultNotifications') || '[]');
    notifications.push({
        resultId: resultId,
        email: email,
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('resultNotifications', JSON.stringify(notifications));
}

// Initialize newsletter
function initializeNewsletter() {
    const newsletterForm = document.querySelector('.notification-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                subscribeToResultNewsletter(email);
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
}

function subscribeToResultNewsletter(email) {
    // In a real application, this would send to server
    showNotification('Successfully subscribed to result notifications!', 'success');
    document.querySelector('.notification-form input[type="email"]').value = '';
    
    // Track event
    trackEvent('Result Newsletter Subscription', 'Results Page');
}

// Initialize notifications
function initializeNotifications() {
    // Check for any pending notifications
    const notifications = JSON.parse(localStorage.getItem('resultNotifications') || '[]');
    
    // In a real application, this would check server for new results
    notifications.forEach(notification => {
        const result = resultsData.find(r => r.id === notification.resultId);
        if (result && result.status === 'announced') {
            // Show notification for announced results
            showNotification(`Good news! ${result.title} has been announced. Check it out now!`, 'success');
        }
    });
}

// Load more results
function loadMoreResults() {
    const button = document.querySelector('.btn-load-more');
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    // Simulate loading more results
    setTimeout(() => {
        // In a real application, this would fetch more results from server
        const additionalResults = [
            {
                id: resultsData.length + 1,
                title: "Bihar Police SI Result 2025 Released",
                category: "government",
                organization: "Central Selection Board of Constable",
                examDate: "December 2025",
                posts: "2000+",
                status: "announced",
                resultDate: "1 week ago",
                examType: "Sub Inspector Exam",
                nextStep: "Physical Test and Medical Examination",
                downloadUrl: "#bihar-police-si-2025",
                description: "Bihar Police SI written exam result has been released."
            }
        ];
        
        resultsData.push(...additionalResults);
        renderResults(resultsData);
        
        button.innerHTML = 'Load More Results <i class="fas fa-arrow-down"></i>';
        showNotification('More results loaded successfully!', 'success');
    }, 1500);
}

// Show result detail (modal or expanded view)
function showResultDetail(resultId) {
    const result = resultsData.find(r => r.id === parseInt(resultId));
    if (result) {
        // Create modal or navigate to detail page
        console.log('Showing result detail for:', result.title);
        showNotification(`Loading details for: ${result.title}`, 'info');
    }
}

// Quick links functionality
function initializeQuickLinks() {
    const quickLinks = document.querySelectorAll('.quick-links a');
    
    quickLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            showNotification(`Redirecting to ${target} official website...`, 'info');
            
            // In a real application, this would open the official website
            setTimeout(() => {
                window.open(this.getAttribute('href'), '_blank');
            }, 1000);
        });
    });
}

// Upcoming results functionality
function initializeUpcomingResults() {
    const notifyButtons = document.querySelectorAll('.btn-notify-small');
    
    notifyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const examType = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            const email = prompt(`Enter your email to get notified for ${examType} result:`);
            
            if (email && validateEmail(email)) {
                showNotification(`We'll notify you at ${email} when ${examType} result is released!`, 'success');
                
                // Save notification
                saveNotification(examType, email);
                
                // Track event
                trackEvent('Upcoming Result Notification', 'Results Page');
            } else if (email) {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    });
}

// Statistics animation
function animateStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.innerText.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number
            if (target >= 1000) {
                stat.innerText = Math.floor(current).toLocaleString() + stat.innerText.replace(/[0-9,]/g, '');
            } else {
                stat.innerText = Math.floor(current) + stat.innerText.replace(/[0-9]/g, '');
            }
        }, 16);
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    initializeQuickLinks();
    initializeUpcomingResults();
    
    // Animate statistics when in view
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStatistics();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(statsSection);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + F for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById('resultSearch');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Ctrl/Cmd + R for refresh (prevent default)
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        window.location.reload();
    }
});

// Print functionality
function printResult(resultId) {
    const result = resultsData.find(r => r.id === resultId);
    if (result) {
        const printWindow = window.open('', '_blank');
        const resultContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${result.title}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #2c3e50; }
                    .meta { margin: 20px 0; }
                    .meta p { margin: 5px 0; }
                    @media print { body { margin: 10px; } }
                </style>
            </head>
            <body>
                <h1>${result.title}</h1>
                <div class="meta">
                    <p><strong>Organization:</strong> ${result.organization}</p>
                    <p><strong>Exam Date:</strong> ${result.examDate}</p>
                    <p><strong>Posts:</strong> ${result.posts}</p>
                    <p><strong>Status:</strong> ${result.status === 'announced' ? 'Announced' : 'Expected Soon'}</p>
                    <p><strong>Next Step:</strong> ${result.nextStep}</p>
                </div>
                <p>${result.description}</p>
                <hr>
                <p><small>Generated from KHIR.IN - ${new Date().toLocaleDateString()}</small></p>
            </body>
            </html>
        `;
        
        printWindow.document.write(resultContent);
        printWindow.document.close();
        printWindow.print();
    }
}

// Analytics tracking
function trackEvent(action, category = 'Results Page') {
    console.log(`Results Page Analytics: ${category} - ${action}`);
    // In a real application, this would send data to analytics service
}

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Results page loaded in ${loadTime.toFixed(2)}ms`);
    
    trackEvent('Page Load', 'Results Page');
});

// Auto-refresh for new results (optional)
function initializeAutoRefresh() {
    // Check for new results every 5 minutes
    setInterval(() => {
        console.log('Checking for new results...');
        // In a real application, this would fetch new results from server
    }, 300000); // 5 minutes
}

// Initialize auto-refresh (commented out by default)
// initializeAutoRefresh();
