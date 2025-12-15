document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

    // 2. Typing Effect
    const typingText = document.getElementById('typing-text');
    const role = USER_DETAILS.role; // e.g. "Creative Full Stack Developer"
    let charIndex = 0;

    function typeRole() {
        if (charIndex < role.length) {
            typingText.textContent += role.charAt(charIndex);
            charIndex++;
            setTimeout(typeRole, 100);
        }
    }
    // Start typing after loader finishes (approx 2s)
    setTimeout(typeRole, 2000);

    // Populate Hero Data
    document.getElementById('hero-name').textContent = USER_DETAILS.name;
    document.getElementById('hero-desc').textContent = USER_DETAILS.description;

    const resumeBtn = document.getElementById('resume-btn');
    resumeBtn.href = USER_DETAILS.resumeLink;
    if (USER_DETAILS.resumeLink === "#") {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Resume download link is a placeholder. Please update constants.js!");
        });
    }

    // 3. Render Projects
    const projectsGrid = document.getElementById('projects-grid');
    PROJECTS.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('project-card');

        // Generate tags HTML
        const tagsHtml = project.tech.map(t => `<span class="tag">${t}</span>`).join('');

        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-img">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.description}</p>
            <div class="project-tags">${tagsHtml}</div>
            <a href="${project.link}" class="project-link">View Project <i class="fas fa-arrow-right"></i></a>
        `;
        projectsGrid.appendChild(card);
    });

    // 4. Render Experience
    const timeline = document.getElementById('experience-timeline');
    EXPERIENCE.forEach(exp => {
        const item = document.createElement('div');
        item.classList.add('timeline-item');
        item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-date">${exp.duration}</div>
            <h3 class="timeline-role">${exp.role}</h3>
            <div class="timeline-company">${exp.company}</div>
            <p>${exp.description}</p>
        `;
        timeline.appendChild(item);
    });

    // 5. Render Skills
    const skillsGrid = document.getElementById('skills-grid');
    SKILLS.forEach(skill => {
        const item = document.createElement('div');
        item.classList.add('skill-item');
        item.innerHTML = `
            <i class="${skill.icon} skill-icon"></i>
            <p>${skill.name}</p>
        `;
        skillsGrid.appendChild(item);
    });

    // 6. Contact Info
    const contactDetails = document.getElementById('contact-details');
    contactDetails.innerHTML = `
        <p><i class="fas fa-envelope"></i> <a href="mailto:${CONTACT.email}">${CONTACT.email}</a></p>
        <p><i class="fas fa-phone"></i> ${CONTACT.phone}</p>
        <div class="social-links">
            ${CONTACT.socials.map(social => `
                <a href="${social.link}" class="social-btn" target="_blank" title="${social.platform}">
                    <i class="${social.icon}"></i>
                </a>
            `).join('')}
        </div>
    `;

    document.getElementById('footer-name').textContent = USER_DETAILS.name;

    // 7. Scroll Animations & Navbar Highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Intersection Observer for rendering animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Highlight Nav
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(sec => {
        // Add fade-in logic
        sec.style.opacity = '0';
        sec.style.transition = 'opacity 1s, transform 1s';
        sec.style.transform = 'translateY(50px)';
        observer.observe(sec);
    });

    // Enhance Observer to trigger the fade-in
    const appearObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(sec => appearObserver.observe(sec));

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        // Toggle mobile menu logic here (simple version)
        if (navUl.style.display === 'flex') {
            navUl.style.display = 'none';
        } else {
            navUl.style.display = 'flex';
            navUl.style.flexDirection = 'column';
            navUl.style.position = 'absolute';
            navUl.style.top = '70px';
            navUl.style.right = '20px';
            navUl.style.background = 'rgba(26, 15, 63, 0.95)';
            navUl.style.padding = '20px';
            navUl.style.borderRadius = '10px';
            navUl.style.border = '1px solid rgba(255,255,255,0.1)';
        }
    });
});
