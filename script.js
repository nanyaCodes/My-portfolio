// Initialize AOS Animation
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
        mirror: false
        
    });

    const text = document.getElementById('animated-text');
    const content = text.textContent;
    text.innerHTML = '';

    content.split('').forEach((char, index) => {
        const span = document.createElement('span');
        
        if (char === ' ') {
            span.className = 'space';
            span.innerHTML = '&nbsp;';
        } else {
            span.textContent = char;
            span.className = 'letter';
            span.style.animationDelay = `${index * 0.06}s`;
        }
        
        text.appendChild(span);
    });


    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Add Project Form
    const projectForm = document.getElementById('project-form');
    
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('project-title').value;
            const description = document.getElementById('project-description').value;
            const imageUrl = document.getElementById('project-image').value;
            const category = document.getElementById('project-category').value;
            const tags = document.getElementById('project-tags').value.split(',').map(tag => tag.trim());
            const demoUrl = document.getElementById('project-demo').value;
            const codeUrl = document.getElementById('project-code').value;
            
            // Create new project card
            const projectsContainer = document.querySelector('.projects-container');
            
            const newProject = document.createElement('div');
            newProject.className = 'project-card';
            newProject.setAttribute('data-category', category);
            newProject.setAttribute('data-aos', 'fade-up');
            
            newProject.innerHTML = `
                <div class="project-img">
                    <img src="${imageUrl}" alt="${title}">
                </div>
                <div class="project-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <div class="project-tags">
                        ${tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${demoUrl}" class="btn small-btn" target="_blank">View Demo</a>
                        <a href="${codeUrl}" class="btn small-btn secondary-btn" target="_blank">View Code</a>
                    </div>
                </div>
            `;
            
            projectsContainer.appendChild(newProject);
            
            // Reset form
            projectForm.reset();
            
            // Show success message
            alert('Project added successfully!');
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demonstration purposes, we'll just log it and show a success message
            console.log({
                name,
                email,
                subject,
                message
            });
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            alert('Message sent successfully! I will get back to you soon.');
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Skill animation on scroll
    const skillCards = document.querySelectorAll('.skill-card');
    
    const animateSkills = () => {
        skillCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateSkills);

   
});

// Add active class to current section in navigation
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

