// Admit Card Page JavaScript Functionality

// Admit card data
const admitCardData = [
    {
        id: 1,
        title: "UPSC Civil Services Main Exam 2025 Admit Card Released",
        category: "government",
        organization: "Union Public Service Commission",
        examDate: "March 15, 2026",
        candidates: "900+",
        status: "available",
        releaseDate: "Today",
        examType: "Civil Services Main Examination",
        downloadPeriod: "March 1 - March 15, 2026",
        examCenters: "All major cities across India",
        instructions: "Carry original ID proof along with admit card",
        downloadUrl: "#upsc-main-admit-2025",
        description: "UPSC has released the admit card for Civil Services Main Examination 2025. Candidates can download their admit cards using their registration details."
    },
    {
        id: 2,
        title: "SSC CGL Tier 3 Admit Card 2025 Released",
        category: "government",
        organization: "Staff Selection Commission",
        examDate: "March 15, 2026",
        candidates: "15,000+",
        status: "available",
        releaseDate: "2 days ago",
        examType: "Combined Graduate Level Tier 3 (Descriptive)",
        downloadPeriod: "February 27 - March 15, 2026",
        examCenters: "70+ cities across India",
        instructions: "Bring blue/black pen and original photo ID",
        downloadUrl: "#ssc-cgl-tier3-admit-2025",
        description: "SSC has released admit cards for CGL Tier 3 examination. Candidates should download and verify all details."
    },
    {
        id: 3,
        title: "IBPS PO Interview Call Letter 2025 Released",
        category: "competitive",
        organization: "Institute of Banking Personnel Selection",
        examDate: "March 20, 2026 Onwards",
        candidates: "12,000+",
        status: "available",
        releaseDate: "3 days ago",
        examType: "Interview for PO/MT in Public Sector Banks",
        downloadPeriod: "February 26 - March 19, 2026",
        examCenters: "50+ cities across India",
        instructions: "Carry all original documents for verification",
        downloadUrl: "#ibps-po-interview-2025",
        description: "IBPS has released interview call letters for PO recruitment. Candidates can download their call letters and check interview schedule."
    },
    {
        id: 4,
        title: "RRB Group D PET Admit Card 2025 - Expected Soon",
        category: "government",
        organization: "Railway Recruitment Board",
        examDate: "March 20, 2026 Onwards",
        candidates: "2,00,000+",
        status: "expected",
        releaseDate: "Expected: March 5, 2026",
        examType: "Physical Efficiency Test (PET)",
        downloadPeriod: "To be announced",
        examCenters: "100+ locations across India",
        instructions: "Bring sports shoes and water bottle",
        downloadUrl: "#rrb-group-d-pet-2025",
        description: "RRB Group D PET admit cards are expected to be released soon. Candidates should regularly check the official website."
    }
];

// Initialize admit card page
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmitCardFilters();
    initializeAdmitCardSearch();
    initializeNewsletter();
    initializeNotifications();
    renderAdmitCards(admitCardData);
});

// Admit card filter functionality
function initializeAdmitCardFilters() {
    const filterButtons = document.querySelectorAll('.admit-card-filters .tab-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterAdmitCards(category);
        });
    });
}

// Filter admit cards by category
function filterAdmitCards(category) {
    const filteredCards = category === 'all' 
        ? admitCardData 
        : admitCardData.filter(card => card.category === category);
    
    renderAdmitCards(filteredCards);
}

// Search functionality
function initializeAdmitCardSearch() {
    const searchInput = document.getElementById('admitSearch');
    const searchButton = searchInput.nextElementSibling;
    
    if (searchButton) {
        searchButton.addEventListener('click', performAdmitCardSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performAdmitCardSearch();
            }
        });
    }
}

function performAdmitCardSearch() {
    const searchTerm = document.getElementById('admitSearch').value.toLowerCase();
    
    if (!searchTerm) {
        renderAdmitCards(admitCardData);
        return;
    }
    
    const filteredCards = admitCardData.filter(card => 
        card.title.toLowerCase().includes(searchTerm) ||
        card.organization.toLowerCase().includes(searchTerm) ||
        card.examType.toLowerCase().includes(searchTerm)
    );
    
    renderAdmitCards(filteredCards);
    
    // Reset filters
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === 'all') {
            btn.classList.add('active');
        }
    });
}

// Render admit cards
function renderAdmitCards(cards) {
    const cardsList = document.getElementById('admitCardsList');
    
    if (cards.length === 0) {
        cardsList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No admit cards found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    cardsList.innerHTML = cards.map(card => createAdmitCardItem(card)).join('');
    
    // Add event listeners to admit card items
    addAdmitCardListeners();
}

// Create admit card item HTML
function createAdmitCardItem(card) {
    const statusClass = card.status === 'available' ? 'available' : 'expected';
    const statusText = card.status === 'available' ? 'Available Now' : 'Expected Soon';
    
    return `
        <article class="admit-card-item" data-category="${card.category}" data-admit-id="${card.id}">
            <div class="admit-card-header">
                <span class="admit-card-badge ${statusClass}">${statusText}</span>
                <span class="admit-card-date">${card.releaseDate}</span>
            </div>
            <h3><a href="${card.downloadUrl}" class="admit-card-title">${card.title}</a></h3>
            <div class="admit-card-meta">
                <span><i class="fas fa-university"></i> ${card.organization}</span>
                <span><i class="fas fa-calendar"></i> Exam: ${card.examDate}</span>
                <span><i class="fas fa-users"></i> ${card.candidates} Candidates</span>
            </div>
            <div class="admit-card-details">
                <p><strong>Exam Type:</strong> ${card.examType}</p>
                <p><strong>Download Period:</strong> ${card.downloadPeriod}</p>
                <p><strong>Exam Centers:</strong> ${card.examCenters}</p>
                <p><strong>Instructions:</strong> ${card.instructions}</p>
            </div>
            <div class="admit-card-actions">
                ${card.status === 'available' ? `
                    <button class="btn-download-admit" onclick="downloadAdmitCard(${card.id})">
                        <i class="fas fa-download"></i> Download Admit Card
                    </button>
                    <button class="btn-view-details" onclick="viewAdmitDetails(${card.id})">
                        <i class="fas fa-info-circle"></i> View Details
                    </button>
                ` : `
                    <button class="btn-notify" onclick="notifyAdmitCard(${card.id})">
                        <i class="fas fa-bell"></i> Notify Me
                    </button>
                `}
                <button class="btn-share-whatsapp" onclick="shareAdmitCard(${card.id})">
                    <i class="fab fa-whatsapp"></i> Share
                </button>
            </div>
        </article>
    `;
}

// Add admit card listeners
function addAdmitCardListeners() {
    document.querySelectorAll('.admit-card-title').forEach(title => {
        title.addEventListener('click', function(e) {
            e.preventDefault();
            const admitId = this.getAttribute('href').replace('#', '');
            showAdmitCardDetail(admitId);
        });
    });
}

// Download admit card
function downloadAdmitCard(admitId) {
    const card = admitCardData.find(c => c.id === admitId);
    if (card) {
        showNotification(`Downloading admit card: ${card.title}`, 'success');
        
        // Simulate download
        setTimeout(() => {
            console.log(`Downloading admit card: ${card.title}`);
            // In a real application, this would trigger file download
            const link = document.createElement('a');
            link.href = card.downloadUrl;
            link.download = `${card.title.replace(/\s+/g, '_')}_Admit_Card.pdf`;
            link.click();
        }, 1000);
        
        // Track event
        trackEvent('Admit Card Downloaded', 'Admit Card Page');
    }
}

// View admit card details
function viewAdmitDetails(admitId) {
    const card = admitCardData.find(c => c.id === admitId);
    if (card) {
        // Create modal or expanded view
        const modalHtml = `
            <div class="modal-overlay" id="admitDetailModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${card.title}</h2>
                        <button class="modal-close" onclick="closeAdmitModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="detail-section">
                            <h3>Exam Information</h3>
                            <p><strong>Organization:</strong> ${card.organization}</p>
                            <p><strong>Exam Type:</strong> ${card.examType}</p>
                            <p><strong>Exam Date:</strong> ${card.examDate}</p>
                            <p><strong>Exam Centers:</strong> ${card.examCenters}</p>
                        </div>
                        <div class="detail-section">
                            <h3>Download Information</h3>
                            <p><strong>Status:</strong> ${card.status === 'available' ? 'Available' : 'Expected Soon'}</p>
                            <p><strong>Download Period:</strong> ${card.downloadPeriod}</p>
                            <p><strong>Expected Candidates:</strong> ${card.candidates}</p>
                        </div>
                        <div class="detail-section">
                            <h3>Important Instructions</h3>
                            <p>${card.instructions}</p>
                            <ul>
                                <li>Carry original photo ID to exam center</li>
                                <li>Verify all details on the admit card</li>
                                <li>Reach exam center 30 minutes early</li>
                                <li>Follow COVID-19 guidelines at center</li>
                            </ul>
                        </div>
                        <div class="modal-actions">
                            ${card.status === 'available' ? `
                                <button class="btn-download-admit" onclick="downloadAdmitCard(${card.id}); closeAdmitModal();">
                                    <i class="fas fa-download"></i> Download Admit Card
                                </button>
                            ` : `
                                <button class="btn-notify" onclick="notifyAdmitCard(${card.id}); closeAdmitModal();">
                                    <i class="fas fa-bell"></i> Notify Me
                                </button>
                            `}
                            <button class="btn-share-whatsapp" onclick="shareAdmitCard(${card.id}); closeAdmitModal();">
                                <i class="fab fa-whatsapp"></i> Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Track event
        trackEvent('Admit Card Details Viewed', 'Admit Card Page');
    }
}

// Close admit card modal
function closeAdmitModal() {
    const modal = document.getElementById('admitDetailModal');
    if (modal) {
        modal.remove();
    }
}

// Share admit card on WhatsApp
function shareAdmitCard(admitId) {
    const card = admitCardData.find(c => c.id === admitId);
    if (card) {
        const message = encodeURIComponent(
            `Check out this admit card: ${card.title}\n\n` +
            `Organization: ${card.organization}\n` +
            `Exam Date: ${card.examDate}\n` +
            `Status: ${card.status === 'available' ? 'Available' : 'Expected Soon'}\n\n` +
            `Download at: ${window.location.href}#admit-${card.id}`
        );
        
        const whatsappUrl = `https://wa.me/?text=${message}`;
        window.open(whatsappUrl, '_blank');
        
        // Track event
        trackEvent('Admit Card Shared', 'Admit Card Page');
    }
}

// Notify for admit card
function notifyAdmitCard(admitId) {
    const card = admitCardData.find(c => c.id === admitId);
    if (card) {
        const email = prompt('Enter your email address to get notified when this admit card is released:');
        
        if (email && validateEmail(email)) {
            // In a real application, this would save to database
            showNotification(`We'll notify you at ${email} when ${card.title} is released!`, 'success');
            
            // Save to localStorage
            saveAdmitCardNotification(admitId, email);
            
            // Track event
            trackEvent('Admit Card Notification Set', 'Admit Card Page');
        } else if (email) {
            showNotification('Please enter a valid email address', 'error');
        }
    }
}

// Save admit card notification to localStorage
function saveAdmitCardNotification(admitId, email) {
    const notifications = JSON.parse(localStorage.getItem('admitCardNotifications') || '[]');
    notifications.push({
        admitId: admitId,
        email: email,
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('admitCardNotifications', JSON.stringify(notifications));
}

// Initialize newsletter
function initializeNewsletter() {
    const newsletterForm = document.querySelector('.notification-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                subscribeToAdmitCardNewsletter(email);
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
}

function subscribeToAdmitCardNewsletter(email) {
    // In a real application, this would send to server
    showNotification('Successfully subscribed to admit card notifications!', 'success');
    document.querySelector('.notification-form input[type="email"]').value = '';
    
    // Track event
    trackEvent('Admit Card Newsletter Subscription', 'Admit Card Page');
}

// Initialize notifications
function initializeNotifications() {
    // Check for any pending notifications
    const notifications = JSON.parse(localStorage.getItem('admitCardNotifications') || '[]');
    
    // In a real application, this would check server for new admit cards
    notifications.forEach(notification => {
        const card = admitCardData.find(c => c.id === notification.admitId);
        if (card && card.status === 'available') {
            // Show notification for available admit cards
            showNotification(`Good news! ${card.title} is now available for download. Check it out now!`, 'success');
        }
    });
}

// Load more admit cards
function loadMoreAdmitCards() {
    const button = document.querySelector('.btn-load-more');
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    // Simulate loading more admit cards
    setTimeout(() => {
        // In a real application, this would fetch more admit cards from server
        const additionalCards = [
            {
                id: admitCardData.length + 1,
                title: "Bihar Police SI PET Admit Card 2025 Released",
                category: "government",
                organization: "Central Selection Board of Constable",
                examDate: "March 25, 2026 Onwards",
                candidates: "15,000+",
                status: "available",
                releaseDate: "1 week ago",
                examType: "Physical Efficiency Test for SI Posts",
                downloadPeriod: "March 10 - March 24, 2026",
                examCenters: "15 locations across Bihar",
                instructions: "Bring sports kit and medical certificate",
                downloadUrl: "#bihar-police-si-pet-2025",
                description: "Bihar Police SI PET admit card has been released. Candidates can download their call letters."
            }
        ];
        
        admitCardData.push(...additionalCards);
        renderAdmitCards(admitCardData);
        
        button.innerHTML = 'Load More Admit Cards <i class="fas fa-arrow-down"></i>';
        showNotification('More admit cards loaded successfully!', 'success');
    }, 1500);
}

// Show admit card detail (modal or expanded view)
function showAdmitCardDetail(admitId) {
    const card = admitCardData.find(c => c.id === parseInt(admitId));
    if (card) {
        viewAdmitDetails(card.id);
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

// Upcoming admit cards functionality
function initializeUpcomingAdmitCards() {
    const notifyButtons = document.querySelectorAll('.btn-notify-small');
    
    notifyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const examType = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            const email = prompt(`Enter your email to get notified for ${examType} admit card:`);
            
            if (email && validateEmail(email)) {
                showNotification(`We'll notify you at ${email} when ${examType} admit card is released!`, 'success');
                
                // Save notification
                saveAdmitCardNotification(examType, email);
                
                // Track event
                trackEvent('Upcoming Admit Card Notification', 'Admit Card Page');
            } else if (email) {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    });
}

// Important instructions
function initializeInstructions() {
    const instructionItems = document.querySelectorAll('.instruction-item');
    
    instructionItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-in');
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
    initializeUpcomingAdmitCards();
    initializeInstructions();
    
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
        const searchInput = document.getElementById('admitSearch');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Ctrl/Cmd + D for download (if on admit card page)
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        // Find first available admit card and download
        const availableCard = admitCardData.find(c => c.status === 'available');
        if (availableCard) {
            downloadAdmitCard(availableCard.id);
        }
    }
});

// Print admit card
function printAdmitCard(admitId) {
    const card = admitCardData.find(c => c.id === admitId);
    if (card) {
        const printWindow = window.open('', '_blank');
        const cardContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${card.title}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #2c3e50; }
                    .meta { margin: 20px 0; }
                    .meta p { margin: 5px 0; }
                    .instructions { background: #f8f9fa; padding: 15px; margin: 20px 0; }
                    @media print { body { margin: 10px; } }
                </style>
            </head>
            <body>
                <h1>${card.title}</h1>
                <div class="meta">
                    <p><strong>Organization:</strong> ${card.organization}</p>
                    <p><strong>Exam Type:</strong> ${card.examType}</p>
                    <p><strong>Exam Date:</strong> ${card.examDate}</p>
                    <p><strong>Download Period:</strong> ${card.downloadPeriod}</p>
                    <p><strong>Exam Centers:</strong> ${card.examCenters}</p>
                </div>
                <div class="instructions">
                    <h3>Important Instructions:</h3>
                    <p>${card.instructions}</p>
                    <ul>
                        <li>Carry original photo ID to exam center</li>
                        <li>Verify all details on the admit card</li>
                        <li>Reach exam center 30 minutes early</li>
                        <li>Follow all exam day guidelines</li>
                    </ul>
                </div>
                <hr>
                <p><small>Generated from KHIR.IN - ${new Date().toLocaleDateString()}</small></p>
            </body>
            </html>
        `;
        
        printWindow.document.write(cardContent);
        printWindow.document.close();
        printWindow.print();
    }
}

// Analytics tracking
function trackEvent(action, category = 'Admit Card Page') {
    console.log(`Admit Card Page Analytics: ${category} - ${action}`);
    // In a real application, this would send data to analytics service
}

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Admit card page loaded in ${loadTime.toFixed(2)}ms`);
    
    trackEvent('Page Load', 'Admit Card Page');
});

// Auto-refresh for new admit cards (optional)
function initializeAutoRefresh() {
    // Check for new admit cards every 10 minutes
    setInterval(() => {
        console.log('Checking for new admit cards...');
        // In a real application, this would fetch new admit cards from server
    }, 600000); // 10 minutes
}

// Initialize auto-refresh (commented out by default)
// initializeAutoRefresh();

// Add CSS for modal
const modalStyles = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease-out;
    }
    
    .modal-content {
        background: white;
        border-radius: 10px;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        margin: 20px;
        animation: slideIn 0.3s ease-out;
    }
    
    .modal-header {
        padding: 20px;
        border-bottom: 1px solid #e9ecef;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h2 {
        margin: 0;
        color: #2c3e50;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #6c757d;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }
    
    .modal-close:hover {
        background: #f8f9fa;
        color: #333;
    }
    
    .modal-body {
        padding: 20px;
    }
    
    .detail-section {
        margin-bottom: 25px;
    }
    
    .detail-section h3 {
        color: #2c3e50;
        margin-bottom: 10px;
    }
    
    .detail-section p {
        margin-bottom: 5px;
        color: #495057;
    }
    
    .detail-section ul {
        margin: 10px 0;
        padding-left: 20px;
    }
    
    .detail-section li {
        margin-bottom: 5px;
        color: #495057;
    }
    
    .modal-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #e9ecef;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @media (max-width: 768px) {
        .modal-content {
            margin: 10px;
            max-height: 95vh;
        }
        
        .modal-actions {
            flex-direction: column;
        }
    }
`;

// Add modal styles to head
const modalStyleSheet = document.createElement('style');
modalStyleSheet.textContent = modalStyles;
document.head.appendChild(modalStyleSheet);
