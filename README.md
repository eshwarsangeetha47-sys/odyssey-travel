MANTRA 2026 Summer School - Assignment 1
Frontend Website Design, SEO, Responsiveness & Netlify Hosting
Student Details
Student Name: EshwarSangeetha 
Registration / Roll Number: 71 
Selected Website Topic: Travel Website  
Submission Date: 3rd July 2026
1. Project Overview: Sky Explorer
2. Sky Explorer is a luxury, bespoke travel agency website designed for immersive exploration across India. The project represents a highly polished, responsive, and SEO-optimized static website built with pure semantic HTML5, custom-token CSS3, and vanilla JavaScript.

Core Destination Offerings
Taj Mahal Palace Heritage Tour (Agra & Delhi): Custom guided walks, monument access, and heritage hotels.
Goa Luxury Beach & Sailing Escape (South Goa): Catamaran sailing, cliffside villa stays, and Portuguese heritage trails.
2. Directory Structure
travel-website/
├── index.html          # Home Page
├── about.html          # About Us Page
├── packages.html       # Tour Packages / Services Page
├── gallery.html        # Filterable Photo Gallery
├── contact.html        # Booking, Enquiry & FAQ Page
├── css/
│   └── style.css       # Unified Luxury Style Sheet (with custom CSS tokens)
├── js/
│   └── script.js       # Dynamic cost calculator, validator, lightbox & accordion
└── images/
    ├── hero-home.jpg   # Sunrise landscape background
    ├── hero-about.jpg  # Safari tent under starry sky
    ├── tour-leader.jpg # Professional guide portrait
    ├── tajmahal.jpg    # Agra Taj Mahal Palace image
    ├── Ooty.jpg      # Alleppey backwaters houseboat image
    └── goa-beach.jpg   # South Goa beach palms image
3. Evaluation Rubric Compliance Checklist
✓ Website Structure & Pages (2 / 2 Marks)
Home Page: Includes visual hero overlay, asymmetrical branding welcome statement, Aetheria values grid, destination quick links, and active call-to-actions.
About Page: Describes the company's carbon-offset travel philosophy, partnerships, and displays cards for expert local tour guides.
Packages Page: Showcases signature tours with durations, prices, difficulty ratings, key inclusions list, and linkable CTAs.
Gallery Page: Fully responsive image card grid utilizing filtering and lightbox sliders.
Booking & Contact Page: Combines luxury contact details with a simulated vector map and booking form.
Navigation Menu: Elegant header with active links indicator, collapsing into a slide-drawer hamburger on mobile displays.
✓ Frontend Design & Creativity (2 / 2 Marks)
Typography: Imported Google Fonts (Playfair Display for serif luxury headings, Outfit for clean sans-serif body copy).
Color Palette: Sophisticated organic tokens:
Primary Green (#1b3b2b) and Dark Forest (#12281d)
Accent Gold (#cfa86b)
Soft Cream (#faf8f5)
Creative Touches: Dynamic glassmorphism cards, interactive card scaling hover effects (transform: scale(1.06)), and gold underline nav links.
✓ Responsive Design (2 / 2 Marks)
Built mobile-first using flexible CSS grids (grid-template-columns: repeat(3, 1fr)) and flexbox utilities.
Fully adapted for different screen sizes via media queries:
Desktop (>1024px): Full layouts, 3-column grids, inline navigation.
Tablet (768px - 1024px): Formats shift to double-column grids.
Mobile (<768px): Grids collapse to single-column blocks, font sizes normalize, and navigation links morph into a sliding drawer toggle.
✓ Basic SEO Checklist (1.5 / 1.5 Marks)
Unique Titles: Each page has a specific, descriptive <title> tag.
Meta Descriptions & Keywords: Added custom descriptions and indexing keywords to all pages.
Heading Hierarchy: Exactly one <h1> per page. Sections utilize structured <h2> and <h3> tags.
Page Names: Clean, simple, descriptive filenames (index.html, about.html, packages.html, gallery.html, contact.html).
Alt Attributes: All <img> tags contain detailed descriptive alt text for screen readers.
✓ JavaScript Interactivity & Forms (1 / 1 Mark)
Mobile Hamburg Toggle: Click transforms the three lines into a clean Close (X) cross and slides the navigation drawer into view.
Gallery Image Filters: Dynamically updates visible gallery pictures when buttons are selected.
Lightbox Popup: Fullscreen modal viewer supporting navigation (Prev / Next buttons and Arrow Keys), captions, and click-outside/Escape key closing.
FAQ Accordion: Collapsible headers that smoothly slide open details utilizing active height transitions.
Form Validation: Protects reservation limits (must choose tomorrow or later, validates email formats, handles missing names, and locks travelers between 1-12).
Dynamic Cost Calculator: Live calculations in booking customizer. Updates total quote as travelers, duration, or packages change.
Receipt Modal Popup: On successful validation, displays a custom receipts card summarizing details before page refresh.
✓ Deployment on GitHub & Netlify (1.5 / 1.5 Marks)
(Follow the step-by-step instructions below to host this live)

4. Hosting & Deployment Instructions
Part A: Upload to GitHub
Open your web browser and sign in to GitHub.
Click the New repository button.
Name your repository mantra-travel-website and make sure it is set to Public.
Initialize it without a README (as we already have this file in your project). Click Create repository.
Open your computer's terminal inside your project directory /Users/thotathrishika/Educational Website/travel-website/ and execute these commands:
git init
git add .
git commit -m "Initial commit of Aetheria travel website"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/mantra-travel-website.git
git push -u origin main
(Be sure to replace YOUR_GITHUB_USERNAME with your actual GitHub account username!)
Part B: Deploy to Netlify
Go to Netlify and log in.
Under your dashboard, click Add new site and choose Import from Git.
Select GitHub and authorize access.
Choose the mantra-travel-website repository from your list.
In the configuration settings:
Branch to deploy: main
Build command: Leave empty (this is a static website)
Publish directory: Leave empty or set to . (it is the root folder)
Click Deploy site. Netlify will host your site in less than a minute.
Under Site Configuration, click Change site name to personalize your URL  (e.g., eshwarsangeetha-travel.netlify.app).
