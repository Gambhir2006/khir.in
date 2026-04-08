// Blog JavaScript Functionality

// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: "SSC CGL 2026 Notification Released: Complete Details",
        category: "updates",
        excerpt: "Staff Selection Commission has officially released the SSC CGL 2026 notification for Combined Graduate Level Examination. Here's everything you need to know about eligibility, important dates, and application process...",
        content: "Full article content here...",
        author: "Admin",
        date: "2026-03-15",
        image: "https://via.placeholder.com/800x400/4CAF50/white?text=SSC+CGL+2026",
        tags: ["SSC", "CGL", "Government", "Graduate"],
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "UPSC Civil Services 2026: 6-Month Study Plan",
        category: "preparation",
        excerpt: "Preparing for UPSC Civil Services Examination? Here's a comprehensive 6-month study schedule that has helped thousands of aspirants crack this prestigious exam...",
        content: "Full article content here...",
        author: "Expert Team",
        date: "2026-03-14",
        image: "https://via.placeholder.com/800x400/2196F3/white?text=UPSC+Preparation",
        tags: ["UPSC", "Civil Services", "Study Plan", "IAS"],
        readTime: "8 min read"
    },
    {
        id: 3,
        title: "10 Common Interview Mistakes to Avoid in 2026",
        category: "career",
        excerpt: "Job interviews can be nerve-wracking, but avoiding these common mistakes can significantly increase your chances of success. Learn from industry experts...",
        content: "Full article content here...",
        author: "HR Expert",
        date: "2026-03-13",
        image: "https://via.placeholder.com/800x400/FF9800/white?text=Interview+Tips",
        tags: ["Interview", "Career", "Tips", "Jobs"],
        readTime: "6 min read"
    },
    {
        id: 4,
        title: "IBPS PO 2026: Complete Recruitment Guide",
        category: "updates",
        excerpt: "Institute of Banking Personnel Selection has announced the IBPS PO 2026 recruitment for 11 public sector banks. Complete details about eligibility, selection process, and preparation strategy...",
        content: "Full article content here...",
        author: "Banking Expert",
        date: "2026-03-12",
        image: "https://via.placeholder.com/800x400/9C27B0/white?text=Banking+Jobs",
        tags: ["IBPS", "Banking", "PO", "Government"],
        readTime: "7 min read"
    },
    {
        id: 5,
        title: "How to Build a Resume That Gets You Hired in 2026",
        category: "preparation",
        excerpt: "Your resume is your first impression on potential employers. Learn how to create a professional resume that stands out and gets you interview calls...",
        content: "Full article content here...",
        author: "Career Coach",
        date: "2026-03-11",
        image: "https://via.placeholder.com/800x400/00BCD4/white?text=Resume+Building",
        tags: ["Resume", "Career", "Jobs", "Tips"],
        readTime: "5 min read"
    }
];

// Initialize blog page
document.addEventListener('DOMContentLoaded', function() {
    initializeBlogFilters();
    initializeBlogSearch();
    initializeNewsletter();
    initializePagination();
    initializePostActions();
    initializeTagCloud();
});

// Blog filter functionality
function initializeBlogFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterBlogPosts(category);
        });
    });
}

// Filter blog posts
function filterBlogPosts(category) {
    const postsContainer = document.querySelector('.posts-container');
    const posts = document.querySelectorAll('.blog-post');
    
    if (category === 'all') {
        posts.forEach(post => {
            post.style.display = 'block';
        });
    } else {
        posts.forEach(post => {
            if (post.getAttribute('data-category') === category) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }
    
    // Update URL with filter
    const url = new URL(window.location);
    if (category === 'all') {
        url.searchParams.delete('category');
    } else {
        url.searchParams.set('category', category);
    }
    window.history.pushState({}, '', url);
}

// Blog search functionality
function initializeBlogSearch() {
    const searchInput = document.getElementById('blogSearch');
    const searchButton = document.querySelector('.blog-search button');
    
    if (searchButton) {
        searchButton.addEventListener('click', performBlogSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performBlogSearch();
            }
        });
    }
}

function performBlogSearch() {
    const searchTerm = document.getElementById('blogSearch').value.toLowerCase();
    const posts = document.querySelectorAll('.blog-post');
    
    if (!searchTerm) {
        posts.forEach(post => {
            post.style.display = 'block';
        });
        return;
    }
    
    posts.forEach(post => {
        const title = post.querySelector('h2 a').textContent.toLowerCase();
        const excerpt = post.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
    
    // Reset filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === 'all') {
            btn.classList.add('active');
        }
    });
}

// Pagination functionality
function initializePagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.disabled) return;
            
            const pageNumber = this.textContent;
            
            // Remove active class from all buttons
            pageButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            if (!isNaN(pageNumber)) {
                this.classList.add('active');
            }
            
            // Load posts for the selected page
            loadBlogPage(pageNumber);
        });
    });
}

function loadBlogPage(pageNumber) {
    const postsContainer = document.querySelector('.posts-container');
    
    // Show loading state
    postsContainer.classList.add('loading');
    
    // Simulate loading delay
    setTimeout(() => {
        // In a real application, this would fetch posts from a server
        console.log(`Loading page ${pageNumber}`);
        
        // Remove loading state
        postsContainer.classList.remove('loading');
        
        // Scroll to top of posts
        postsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Show notification
        showNotification(`Loaded page ${pageNumber}`, 'info');
    }, 800);
}

// Post actions (share, bookmark)
function initializePostActions() {
    // Share buttons
    document.querySelectorAll('.btn-share').forEach(button => {
        button.addEventListener('click', function() {
            const post = this.closest('.blog-post');
            const postTitle = post.querySelector('h2 a').textContent;
            const postUrl = window.location.href + '#' + post.getAttribute('data-post-id');
            
            shareOnWhatsApp(postTitle, postUrl);
        });
    });
    
    // Bookmark buttons
    document.querySelectorAll('.btn-bookmark').forEach(button => {
        button.addEventListener('click', function() {
            const post = this.closest('.blog-post');
            const postTitle = post.querySelector('h2 a').textContent;
            const postId = post.getAttribute('data-post-id');
            
            toggleBookmark(this, postId, postTitle);
        });
    });
}

// Share on WhatsApp
function shareOnWhatsApp(title, url) {
    const message = encodeURIComponent(
        `Check out this article: ${title}\n\n${url}`
    );
    
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // Track share event
    trackEvent('Blog Post Shared', 'Social Sharing');
}

// Toggle bookmark
function toggleBookmark(button, postId, postTitle) {
    const isBookmarked = button.classList.contains('bookmarked');
    
    if (isBookmarked) {
        // Remove bookmark
        button.classList.remove('bookmarked');
        button.innerHTML = '<i class="fas fa-bookmark"></i> Save';
        showNotification(`Removed "${postTitle}" from bookmarks`, 'info');
    } else {
        // Add bookmark
        button.classList.add('bookmarked');
        button.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
        showNotification(`Added "${postTitle}" to bookmarks`, 'success');
    }
    
    // Save to localStorage
    saveBookmark(postId, postTitle, !isBookmarked);
}

// Save bookmark to localStorage
function saveBookmark(postId, postTitle, isBookmarked) {
    let bookmarks = JSON.parse(localStorage.getItem('blogBookmarks') || '[]');
    
    if (isBookmarked) {
        bookmarks.push({
            id: postId,
            title: postTitle,
            savedAt: new Date().toISOString()
        });
    } else {
        bookmarks = bookmarks.filter(bookmark => bookmark.id !== postId);
    }
    
    localStorage.setItem('blogBookmarks', JSON.stringify(bookmarks));
}

// Tag cloud functionality
function initializeTagCloud() {
    const tagLinks = document.querySelectorAll('.tag-cloud a');
    
    tagLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tag = this.textContent;
            
            // Search for posts with this tag
            searchByTag(tag);
        });
    });
}

function searchByTag(tag) {
    const searchInput = document.getElementById('blogSearch');
    if (searchInput) {
        searchInput.value = tag;
        performBlogSearch();
    }
    
    // Scroll to search area
    const searchWidget = document.querySelector('.blog-search');
    if (searchWidget) {
        searchWidget.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Newsletter subscription (blog specific)
function initializeNewsletter() {
    const newsletterForm = document.querySelector('.blog-sidebar .newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (validateEmail(email)) {
                subscribeToBlogNewsletter(email);
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
}

function subscribeToBlogNewsletter(email) {
    // In a real application, this would send the email to a server
    showNotification('Successfully subscribed to blog newsletter!', 'success');
    document.querySelector('.blog-sidebar .newsletter-form input[type="email"]').value = '';
    
    // Track subscription
    trackEvent('Blog Newsletter Subscription', 'Newsletter');
}

// Load more posts (if implemented)
function loadMorePosts() {
    const postsContainer = document.querySelector('.posts-container');
    
    // Show loading state
    postsContainer.classList.add('loading');
    
    // Simulate loading more posts
    setTimeout(() => {
        // In a real application, this would fetch more posts from a server
        console.log('Loading more blog posts...');
        
        // Remove loading state
        postsContainer.classList.remove('loading');
        
        showNotification('More posts loaded successfully!', 'success');
    }, 1500);
}

// Popular posts widget
function updatePopularPosts() {
    // In a real application, this would be based on actual view counts
    const popularPosts = blogPosts.slice(0, 3);
    
    const popularPostsList = document.querySelector('.popular-posts');
    if (popularPostsList) {
        // Update popular posts based on real data
        console.log('Popular posts updated:', popularPosts);
    }
}

// Related posts (for single post view)
function getRelatedPosts(currentPostId, category) {
    return blogPosts.filter(post => 
        post.id !== parseInt(currentPostId) && post.category === category
    ).slice(0, 3);
}

// Reading time estimator
function estimateReadingTime(content) {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}

// Social sharing functions
function shareOnFacebook(title, url) {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareOnTwitter(title, url) {
    const tweet = `${title} ${url}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
}

function shareOnLinkedIn(title, url) {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
}

// Print article
function printArticle(postId) {
    const post = document.querySelector(`[data-post-id="${postId}"]`);
    if (post) {
        const printWindow = window.open('', '_blank');
        const postContent = post.innerHTML;
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Print Article</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
                    img { max-width: 100%; height: auto; }
                    .post-actions, .btn-share, .btn-bookmark { display: none; }
                </style>
            </head>
            <body>
                ${postContent}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.print();
    }
}

// Copy link to clipboard
function copyLinkToClipboard(url) {
    navigator.clipboard.writeText(url).then(() => {
        showNotification('Link copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy link', 'error');
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
        // Apply filter from URL
        const filterButton = document.querySelector(`.filter-btn[data-category="${categoryParam}"]`);
        if (filterButton) {
            filterButton.click();
        }
    }
    
    // Update popular posts
    updatePopularPosts();
    
    // Track page view
    trackEvent('Blog Page View', 'Page View');
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('blogSearch');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Infinite scroll (optional implementation)
function initializeInfiniteScroll() {
    const postsContainer = document.querySelector('.posts-container');
    let loading = false;
    
    window.addEventListener('scroll', function() {
        if (loading) return;
        
        const scrollPosition = window.innerHeight + window.scrollY;
        const threshold = postsContainer.offsetTop + postsContainer.offsetHeight - 200;
        
        if (scrollPosition >= threshold) {
            loading = true;
            loadMorePosts();
            setTimeout(() => {
                loading = false;
            }, 2000);
        }
    });
}

// Comment system (placeholder)
function initializeComments() {
    // This would integrate with a comment system like Disqus or custom implementation
    console.log('Comments system initialized');
}

// Analytics tracking
function trackEvent(action, category = 'Blog Interaction') {
    console.log(`Blog Analytics Event: ${category} - ${action}`);
    // In a real application, this would send data to analytics service
}
