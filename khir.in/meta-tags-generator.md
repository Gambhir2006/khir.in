# Open Graph & Meta Tags Generator Guide

## 📋 Essential Meta Tags for KHIR.IN

### Basic Meta Tags (Required for all pages)
```html
<!-- Basic Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="robots" content="index, follow">
<meta name="googlebot" content="index, follow">
```

### SEO Meta Tags
```html
<!-- SEO Meta Tags -->
<title>KHIR.IN - Latest Government & Private Jobs 2026 | Your Career Gateway</title>
<meta name="description" content="Find latest government jobs, private jobs, internships and exam results in India. Updated daily with new job vacancies. Apply online for your dream job at KHIR.IN.">
<meta name="keywords" content="government jobs, private jobs, sarkari naukri, latest jobs, job notifications, exam results, admit cards, internships, career portal, job search, employment news">
<meta name="author" content="KHIR.IN">
<meta name="language" content="en">
<meta name="geo.region" content="IN">
<meta name="geo.placename" content="India">
<meta name="geo.position" content="20.5937;78.9629">
<meta name="ICBM" content="20.5937, 78.9629">
<meta name="rating" content="general">
<meta name="distribution" content="global">
<meta name="revisit-after" content="1 days">
```

### Open Graph Tags (Facebook & Social Media)
```html
<!-- Open Graph Meta Tags -->
<meta property="og:type" content="website">
<meta property="og:title" content="KHIR.IN - Latest Government & Private Jobs 2026">
<meta property="og:description" content="Find latest government jobs, private jobs, internships and exam results in India. Updated daily with new job vacancies.">
<meta property="og:url" content="https://khir.in/">
<meta property="og:site_name" content="KHIR.IN">
<meta property="og:image" content="https://khir.in/images/og-image-facebook.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="KHIR.IN - Job Portal India">
<meta property="og:locale" content="en_IN">
<meta property="og:locale:alternate" content="hi_IN">
```

### Twitter Card Tags
```html
<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@khirin_jobs">
<meta name="twitter:creator" content="@khirin_jobs">
<meta name="twitter:title" content="KHIR.IN - Latest Government & Private Jobs 2026">
<meta name="twitter:description" content="Find latest government jobs, private jobs, internships and exam results in India. Updated daily with new job vacancies.">
<meta name="twitter:image" content="https://khir.in/images/og-image-twitter.png">
<meta name="twitter:image:alt" content="KHIR.IN - Job Portal India">
<meta name="twitter:domain" content="khir.in">
```

### Additional Social Media Tags
```html
<!-- LinkedIn Tags -->
<meta property="og:site_name" content="KHIR.IN">
<meta property="og:type" content="website">
<meta property="og:image" content="https://khir.in/images/og-image-linkedin.png">

<!-- Pinterest Tags -->
<meta name="pinterest-rich-pin" content="true">
<meta property="og:pin" content="https://khir.in/images/pin-image.png">

<!-- Instagram Tags (for future use) -->
<meta property="og:video" content="">
<meta property="og:video:width" content="">
<meta property="og:video:height" content="">
```

### Technical Meta Tags
```html
<!-- Technical Meta Tags -->
<meta name="theme-color" content="#007bff">
<meta name="msapplication-TileColor" content="#007bff">
<meta name="msapplication-config" content="/browserconfig.xml">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="KHIR.IN">
<meta name="application-name" content="KHIR.IN">
<meta name="msapplication-tooltip" content="Your Career Gateway">
<meta name="msapplication-starturl" content="/">
<meta name="msapplication-navbutton-color" content="#007bff">
<meta name="msapplication-window" content="width=1024;height=768">
```

### Structured Data (JSON-LD)
```html
<!-- Structured Data for Job Portal -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "KHIR.IN",
  "alternateName": "KHIR Job Portal",
  "url": "https://khir.in/",
  "description": "Your trusted platform for latest government and private job opportunities in India",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://khir.in/?search={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "KHIR.IN",
    "url": "https://khir.in/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://khir.in/images/logo.png",
      "width": 512,
      "height": 512
    },
    "sameAs": [
      "https://www.facebook.com/khirin",
      "https://twitter.com/khirin_jobs",
      "https://www.instagram.com/khirin_jobs",
      "https://www.linkedin.com/company/khirin"
    ]
  }
}
</script>
```

### Organization Schema
```html
<!-- Organization Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "KHIR.IN",
  "alternateName": "KHIR Job Portal",
  "url": "https://khir.in/",
  "logo": "https://khir.in/images/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-98765-43210",
    "contactType": "customer service",
    "availableLanguage": ["English", "Hindi"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressRegion": "DL",
    "addressLocality": "New Delhi",
    "postalCode": "110001"
  },
  "sameAs": [
    "https://www.facebook.com/khirin",
    "https://twitter.com/khirin_jobs",
    "https://www.instagram.com/khirin_jobs",
    "https://www.linkedin.com/company/khirin",
    "https://t.me/khirin_jobs"
  ]
}
</script>
```

### Breadcrumb Schema
```html
<!-- Breadcrumb Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://khir.in/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Latest Jobs",
      "item": "https://khir.in/#latest-jobs"
    }
  ]
}
</script>
```

## 📄 Page-Specific Meta Tags

### Homepage Meta Tags
```html
<title>KHIR.IN - Latest Government & Private Jobs 2026 | Your Career Gateway</title>
<meta name="description" content="Find latest government jobs, private jobs, internships and exam results in India. Updated daily with new job vacancies. Apply online for your dream job at KHIR.IN.">
<meta property="og:title" content="KHIR.IN - Latest Government & Private Jobs 2026">
<meta property="og:description" content="Find latest government jobs, private jobs, internships and exam results in India. Updated daily with new job vacancies.">
```

### Blog Page Meta Tags
```html
<title>Blog - KHIR.IN | Career Tips, Exam Preparation & Job Updates</title>
<meta name="description" content="Read latest job updates, exam preparation tips, career advice and employment news on KHIR.IN blog. Get expert guidance for your career growth.">
<meta property="og:title" content="Blog - KHIR.IN | Career Tips & Job Updates">
<meta property="og:description" content="Read latest job updates, exam preparation tips, career advice and employment news on KHIR.IN blog.">
```

### Results Page Meta Tags
```html
<title>Exam Results - KHIR.IN | Latest Government & Private Exam Results</title>
<meta name="description" content="Check latest exam results for government jobs, competitive exams, and private sector recruitment. Get instant notifications for result announcements.">
<meta property="og:title" content="Exam Results - KHIR.IN | Latest Exam Results">
<meta property="og:description" content="Check latest exam results for government jobs, competitive exams, and private sector recruitment.">
```

### Admit Card Page Meta Tags
```html
<title>Admit Cards - KHIR.IN | Download Exam Admit Cards</title>
<meta name="description" content="Download admit cards for government exams, competitive tests, and private sector recruitment. Get instant notifications for admit card releases.">
<meta property="og:title" content="Admit Cards - KHIR.IN | Download Admit Cards">
<meta property="og:description" content="Download admit cards for government exams, competitive tests, and private sector recruitment.">
```

### Contact Page Meta Tags
```html
<title>Contact Us - KHIR.IN | Get in Touch</title>
<meta name="description" content="Contact KHIR.IN for job updates, partnerships, advertising inquiries, or support. We're here to help you with your career journey.">
<meta property="og:title" content="Contact Us - KHIR.IN | Get in Touch">
<meta property="og:description" content="Contact KHIR.IN for job updates, partnerships, advertising inquiries, or support.">
```

### About Page Meta Tags
```html
<title>About Us - KHIR.IN | Your Career Gateway</title>
<meta name="description" content="Learn about KHIR.IN - India's trusted job portal for government and private sector opportunities. Our mission is to help job seekers find their dream careers.">
<meta property="og:title" content="About Us - KHIR.IN | Your Career Gateway">
<meta property="og:description" content="Learn about KHIR.IN - India's trusted job portal for government and private sector opportunities.">
```

## 🖼️ Social Media Image Requirements

### Facebook Open Graph Images
- **Size:** 1200x630 pixels (1.91:1 ratio)
- **Format:** PNG or JPG
- **Max Size:** 8MB
- **File Name:** og-image-facebook.png

### Twitter Card Images
- **Size:** 1200x600 pixels (2:1 ratio)
- **Format:** PNG or JPG
- **Max Size:** 5MB
- **File Name:** og-image-twitter.png

### LinkedIn Images
- **Size:** 1200x627 pixels (1.91:1 ratio)
-- **Format:** PNG or JPG
- **Max Size:** 5MB
- **File Name:** og-image-linkedin.png

### Instagram Images
- **Size:** 1080x1080 pixels (1:1 ratio)
- **Format:** PNG or JPG
- **Max Size:** 30MB
- **File Name:** og-image-instagram.png

## 📱 Mobile-Specific Meta Tags

### Viewport and Mobile Optimization
```html
<!-- Mobile Optimization -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
<meta name="format-detection" content="telephone=no">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="KHIR.IN">
```

### PWA Meta Tags
```html
<!-- PWA Meta Tags -->
<meta name="theme-color" content="#007bff">
<meta name="background-color" content="#ffffff">
<meta name="display" content="standalone">
<meta name="orientation" content="portrait">
<meta name="scope" content="/">
<meta name="start_url" content="/">
```

## 🔍 SEO Best Practices

### Title Tag Guidelines
- **Length:** 50-60 characters
- **Format:** Primary Keyword - Secondary Keyword | Brand Name
- **Example:** "Government Jobs 2026 - Latest Sarkari Naukri | KHIR.IN"

### Meta Description Guidelines
- **Length:** 150-160 characters
- **Content:** Compelling description with keywords
- **Call to Action:** Include action verbs
- **Example:** "Find latest government jobs, private jobs, and internships in India. Apply online for your dream job today!"

### Keyword Strategy
- **Primary Keywords:** government jobs, private jobs, sarkari naukri
- **Secondary Keywords:** job notifications, exam results, admit cards
- **Long-tail Keywords:** latest government jobs 2026, private sector jobs in India
- **Local Keywords:** jobs in Delhi, Mumbai, Bangalore, etc.

## 📊 Meta Tag Validation Tools

### Recommended Tools
1. **Facebook Debugger** - https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator** - https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector** - https://www.linkedin.com/post-inspector/
4. **Rich Results Test** - https://search.google.com/test/rich-results
5. **Schema Markup Validator** - https://validator.schema.org/

### Testing Checklist
- [ ] Test Facebook Open Graph tags
- [ ] Test Twitter Card tags
- [ ] Test LinkedIn tags
- [ ] Validate structured data
- [ ] Check mobile rendering
- [ ] Verify page titles and descriptions

## 🚀 Implementation Guide

### Step 1: Create Social Media Images
1. Design 1200x630px image for Facebook
2. Design 1200x600px image for Twitter
3. Design 1200x627px image for LinkedIn
4. Save all images in /images/ folder

### Step 2: Add Meta Tags to HTML
1. Copy the appropriate meta tags
2. Paste in `<head>` section of each HTML file
3. Customize for each page type
4. Test with validation tools

### Step 3: Test and Verify
1. Use Facebook Debugger to test OG tags
2. Use Twitter Card Validator to test Twitter tags
3. Use Rich Results Test to validate structured data
4. Test on mobile devices

### Step 4: Monitor Performance
1. Track social media share performance
2. Monitor click-through rates
3. Analyze organic search traffic
4. Adjust meta tags as needed

## 📈 Performance Impact

### Page Load Speed
- Keep meta tags concise
- Optimize social media images
- Use async loading for structured data
- Minimize HTTP requests

### SEO Benefits
- Improved search engine rankings
- Better click-through rates
- Enhanced social media presence
- Increased organic traffic

---

## 🎯 Quick Implementation

1. **Copy the meta tag templates**
2. **Customize for each page**
3. **Create social media images**
4. **Test with validation tools**
5. **Monitor performance**

Your KHIR.IN job portal will have optimized meta tags for maximum visibility and engagement! 🚀
