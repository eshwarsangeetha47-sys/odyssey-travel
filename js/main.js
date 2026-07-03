/**
 * Sky Explorer - Main Frontend Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Header Scroll Shrink & Background
    // ==========================================
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }
    }

    // ==========================================
    // 2. Mobile Responsive Navigation Menu
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navList.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navList.classList.remove('open');
            });
        });
    }

    // ==========================================
    // 3. Package Card Filtering (packages.html)
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.destination-card');

    if (filterButtons.length > 0 && destinationCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                destinationCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        card.style.animation = 'fadeInUp 0.4s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ==========================================
    // 4. FAQ Accordion Interactivity
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // ==========================================
    // 5. Image Lightbox Viewer (gallery.html)
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    
    if (galleryItems.length > 0 && lightbox) {
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const lightboxClose = lightbox.querySelector('.lightbox-close');

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('.gallery-overlay h3').textContent;
                const desc = item.querySelector('.gallery-overlay p').textContent;

                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxCaption.innerHTML = `<strong>${title}</strong> - ${desc}`;
                
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // ==========================================
    // 6. Form Validation & Modal Success (booking.html)
    // ==========================================
    const bookingForm = document.getElementById('bookingForm');
    const bookingModal = document.getElementById('successModal');
    
    if (bookingForm && bookingModal) {
        const modalCloseBtn = document.getElementById('modalCloseBtn');
        const travelDate = document.getElementById('travelDate');
        
        if (travelDate) {
            const today = new Date().toISOString().split('T')[0];
            travelDate.min = today;
        }

        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;
            const inputs = bookingForm.querySelectorAll('.form-control');
            
            inputs.forEach(input => {
                const formGroup = input.parentElement;
                formGroup.classList.remove('error');
                
                if (input.hasAttribute('required') && input.value.trim() === '') {
                    setErrorFor(input, `${getLabelName(input)} is required`);
                    isFormValid = false;
                }
                else if (input.type === 'email' && input.value.trim() !== '') {
                    if (!isValidEmail(input.value.trim())) {
                        setErrorFor(input, 'Enter a valid email address');
                        isFormValid = false;
                    }
                }
                else if (input.id === 'phone' && input.value.trim() !== '') {
                    if (!isValidPhone(input.value.trim())) {
                        setErrorFor(input, 'Enter a valid 10-digit phone number');
                        isFormValid = false;
                    }
                }
            });
            
            if (isFormValid) {
                const fullName = document.getElementById('fullName').value;
                const tourPackage = document.getElementById('tourPackage').value;
                const date = document.getElementById('travelDate').value;
                const groupSize = document.getElementById('groupSize').value;
                
                const refNumber = 'OD-' + Math.floor(100000 + Math.random() * 900000);
                document.getElementById('modalRefNo').textContent = refNumber;
                document.getElementById('modalPatientName').textContent = fullName;
                document.getElementById('modalDeptDoctor').textContent = capitalize(tourPackage);
                document.getElementById('modalDateTime').textContent = `${formatDate(date)} (${groupSize} Travelers)`;
                
                bookingModal.classList.add('active');
                bookingForm.reset();
            }
        });

        modalCloseBtn.addEventListener('click', () => {
            bookingModal.classList.remove('active');
        });

        function setErrorFor(input, message) {
            const formGroup = input.parentElement;
            formGroup.classList.add('error');
            const errorElement = formGroup.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = message;
            }
        }

        function getLabelName(input) {
            const label = input.parentElement.querySelector('label');
            return label ? label.textContent.replace('*', '').trim() : 'Field';
        }

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function isValidPhone(phone) {
            return /^\d{10}$/.test(phone.replace(/[- )(]/g, ''));
        }

        function capitalize(str) {
            if (!str) return '';
            return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }

        function formatDate(dateStr) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateStr).toLocaleDateString(undefined, options);
        }
    }

    // ==========================================
    // 7. Footer Newsletter Form
    // ==========================================
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('.newsletter-input');
            const email = input.value.trim();

            if (email !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert(`Thank you! ${email} has been subscribed to our travel newsletter.`);
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});
