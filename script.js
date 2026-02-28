document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar & Active Links
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Navbar effect
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        // Active Link Switching
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if(navLinksContainer.classList.contains('show')) {
                    navLinksContainer.classList.remove('show');
                }
            }
        });
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('show');
            if (navLinksContainer.classList.contains('show')) {
                navLinksContainer.style.display = 'flex';
                navLinksContainer.style.flexDirection = 'column';
                navLinksContainer.style.position = 'absolute';
                navLinksContainer.style.top = '100%';
                navLinksContainer.style.left = '0';
                navLinksContainer.style.width = '100%';
                navLinksContainer.style.background = 'rgba(5, 5, 5, 0.95)';
                navLinksContainer.style.padding = '20px';
                navLinksContainer.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
            } else {
                navLinksContainer.style.display = 'none';
            }
        });
    }

    // Handle resize to fix nav links display issue
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.position = 'static';
            navLinksContainer.style.flexDirection = 'row';
            navLinksContainer.style.padding = '0';
            navLinksContainer.style.background = 'transparent';
        } else {
            navLinksContainer.style.display = 'none';
            navLinksContainer.classList.remove('show');
        }
    });

    // 3. Simple Intersection Observer for scroll animations
    // To make cards pop up when scrolling down
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add classes for CSS animation
    const animateElements = document.querySelectorAll('.project-card, .academic-card, .achievement-card, .tech-card, .about-img-container, .section-title');
    
    // Default styles for these elements to enable transition
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Style dynamically appended class
    const style = document.createElement('style');
    style.innerHTML = `
        .in-view {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
