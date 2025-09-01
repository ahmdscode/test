// Core DOM Elements
const body = document.body;
const localTimeElement = document.getElementById('local-time');

// Theme Toggle Elements
const frame = document.getElementById('frame');
const circleToggle = document.getElementById('circleToggle');

// Navigation Elements
const navGlitchWrappers = document.querySelectorAll('.nav-glitch-wrapper');
const homeNav = document.querySelector('#home-glitch .glitch-button');
const skillsNav = document.querySelector('#skills-nav-glitch .glitch-button');
const servicesNav = document.querySelector('#services-nav-glitch .glitch-button');
const projectsNav = document.querySelector('#projects-nav-glitch .glitch-button');
const reviewsNav = document.querySelector('#reviews-nav-glitch .glitch-button');
const contactNav = document.querySelector('#contact-nav-glitch .glitch-button');
const homeGlitch = document.getElementById('home-glitch');
const skillsNavGlitch = document.getElementById('skills-nav-glitch');
const servicesNavGlitch = document.getElementById('services-nav-glitch');
const projectsNavGlitch = document.getElementById('projects-nav-glitch');
const reviewsNavGlitch = document.getElementById('reviews-nav-glitch');
const contactNavGlitch = document.getElementById('contact-nav-glitch');

// Resume Elements
const resumeButton = document.getElementById('resume-section');
const resumeContainer = document.getElementById('resume-container');
const resumeCloseContainer = document.getElementById('resume-close-container');
const resumeClose = document.getElementById('resume-close');
const resumeGlitchWrapper = document.querySelector('.resume-glitch-wrapper');

// Image Viewer Elements
const imageViewer = document.getElementById('image-viewer');
const imageViewerCloseContainer = document.getElementById('image-viewer-close-container');
const imageViewerClose = document.getElementById('image-viewer-close');
const imageViewerImg = document.getElementById('image-viewer-img');

// Contact Form Elements
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const formSubmitGlitch = document.getElementById('form-submit-glitch');
const formGlitchWrapper = document.querySelector('.form-glitch-wrapper');

// Name Glitch Elements
const glitchContainer = document.getElementById('glitchcontainer');
const nameText = document.getElementById('name-text');

// Contact Glitch Elements
const telegramGlitch = document.getElementById('telegram-glitch');
const whatsappGlitch = document.getElementById('whatsapp-glitch');

// Service Order Buttons
const servicePriceGlitchWrappers = document.querySelectorAll('.service-price-glitch-wrapper');

// Project Carousel Elements
const carouselTrack = document.querySelector('.carousel-track');
const projectCards = document.querySelectorAll('.project-card');
const projectPrev = document.getElementById('project-prev');
const projectNext = document.getElementById('project-next');
const projectPrevGlitchWrapper = document.querySelector('#project-prev-glitch');
const projectNextGlitchWrapper = document.querySelector('#project-next-glitch');

// Reviews Carousel Elements
const reviewsTrack = document.querySelector('.reviews-track');
const reviewCards = document.querySelectorAll('.review-card');
const writeReviewButton = document.getElementById('write-review');
const writeReviewGlitchWrapper = document.querySelector('.write-review-glitch-wrapper');

// Weird Project Button
const weirdProjectButton = document.getElementById('weird-project');

const floatTexts = document.querySelectorAll(".float-text");

// Prevent double triggers on mobile
let lastInteraction = 0;
const interactionCooldown = 600; // Slightly longer than 500ms animation

function handleInteraction(eventType, callback) {
    return (e) => {
        const now = Date.now();
        if (now - lastInteraction < interactionCooldown) {
            e.preventDefault();
            return;
        }
        lastInteraction = now;
        callback(e);
    };
}

// Reusable glitch animation function
function triggerGlitch(button, wrapper, callback = null) {
    if (button) button.classList.add('glitch-active');
    if (wrapper) wrapper.classList.add('glitch-active');
    setTimeout(() => {
        if (button) button.classList.remove('glitch-active');
        if (wrapper) wrapper.classList.remove('glitch-active');
        if (callback) callback();
    }, 500); // Match existing 500ms duration
}

// Float Text Animation
document.addEventListener("mousemove", (e) => {
    let x = (e.clientX / window.innerWidth) - 0.5;
    let y = (e.clientY / window.innerHeight) - 0.5;

    let moveX = x * 25;
    let moveY = y * 25;

    floatTexts.forEach(el => {
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Stop Review Auto-Slide
function stopReviewAutoSlide() {
    clearTimeout(reviewAutoSlideTimeout);
}

// Navigation Click Handler
if (navGlitchWrappers.length > 0) {
    navGlitchWrappers.forEach(wrapper => {
        const navButton = wrapper.querySelector('.nav-button');
        if (!navButton) {
            console.error('Nav button not found in wrapper:', wrapper);
            return;
        }
        const sectionId = navButton.id.replace('-nav', '');
        const targetSection = sectionId === 'home' ? 'introduction' : sectionId;
        const section = document.getElementById(targetSection);

        ['click', 'touchstart'].forEach(eventType => {
            wrapper.addEventListener(eventType, handleInteraction(eventType, (e) => {
                e.preventDefault();
                if (section) {
                    triggerGlitch(navButton, wrapper, () => {
                        section.scrollIntoView({ behavior: 'smooth' });
                    });
                } else {
                    console.error(`Section with ID '${targetSection}' not found.`);
                }
            }));
        });
    });
} else {
    console.error('Navigation glitch wrappers not found.');
}

// Highlight Active Navigation Item
if (homeNav && skillsNav && servicesNav && projectsNav && reviewsNav && contactNav) {
    const sections = [
        { id: 'introduction', nav: document.getElementById('home-nav'), glitchWrapper: document.querySelector('#home-glitch').parentElement },
        { id: 'skills', nav: document.getElementById('skills-nav'), glitchWrapper: document.querySelector('#skills-nav-glitch').parentElement },
        { id: 'services', nav: document.getElementById('services-nav'), glitchWrapper: document.querySelector('#services-nav-glitch').parentElement },
        { id: 'projects', nav: document.getElementById('projects-nav'), glitchWrapper: document.querySelector('#projects-nav-glitch').parentElement },
        { id: 'reviews', nav: document.getElementById('reviews-nav'), glitchWrapper: document.querySelector('#reviews-nav-glitch').parentElement },
        { id: 'contact', nav: document.getElementById('contact-nav'), glitchWrapper: document.querySelector('#contact-nav-glitch').parentElement }
    ];

    const observerOptions = {
        root: null,
        threshold: 0.5,
        rootMargin: '-50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sections.forEach(section => {
                    section.nav.classList.remove('active-nav', 'glitch-active');
                    section.nav.removeAttribute('aria-current');
                    section.glitchWrapper.classList.remove('glitch-active');
                });
                const activeSection = sections.find(section => section.id === entry.target.id);
                if (activeSection) {
                    activeSection.nav.classList.add('active-nav', 'glitch-active');
                    activeSection.nav.setAttribute('aria-current', 'page');
                    activeSection.glitchWrapper.classList.add('glitch-active');
                    setTimeout(() => {
                        activeSection.nav.classList.remove('glitch-active');
                        activeSection.glitchWrapper.classList.remove('glitch-active');
                    }, 500);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
            observer.observe(element);
        } else {
            console.error(`Section with ID '${section.id}' not found.`);
        }
    });
} else {
    console.error('Navigation elements (homeNav, skillsNav, servicesNav, projectsNav, reviewsNav, contactNav) not found.');
}

// Resume Toggle
if (resumeButton && resumeContainer && resumeCloseContainer && resumeClose && resumeGlitchWrapper) {
    const openResume = (e) => {
        e.preventDefault();
        e.stopPropagation();
        triggerGlitch(resumeButton, resumeGlitchWrapper, () => {
            resumeContainer.classList.remove('hidden');
            resumeContainer.classList.add('show');
            resumeCloseContainer.classList.remove('hidden');
            resumeCloseContainer.classList.add('show');
            body.classList.add('resume-mode');
        });
    };

    const closeResume = (e) => {
        e.stopPropagation();
        resumeContainer.classList.remove('show');
        resumeContainer.classList.add('hidden');
        resumeCloseContainer.classList.remove('show');
        resumeCloseContainer.classList.add('hidden');
        body.classList.remove('resume-mode');
    };

    ['click', 'touchstart'].forEach(eventType => {
        resumeGlitchWrapper.addEventListener(eventType, handleInteraction(eventType, openResume));
    });

    resumeClose.addEventListener('click', closeResume);

    let lastTap = 0;
    resumeContainer.addEventListener('click', (e) => {
        if (e.target.closest('#resume-close-container')) return;
        const currentTime = new Date().getTime();
        if (currentTime - lastTap < 300 && currentTime - lastTap > 0) closeResume(e);
        lastTap = currentTime;
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeContainer.classList.contains('show')) closeResume(e);
    });
} else {
    console.error('Resume elements not found.');
}

// Image Viewer Toggle with Swipe and Click Navigation
if (imageViewer && imageViewerCloseContainer && imageViewerClose && imageViewerImg) {
    let currentImageIndex = 0;
    let currentProjectImages = [];

    const updateImage = (index) => {
        imageViewerImg.classList.remove('fade-in');
        imageViewerImg.classList.add('fade-out');
        setTimeout(() => {
            imageViewerImg.src = currentProjectImages[index].src;
            imageViewerImg.alt = currentProjectImages[index].alt;
            imageViewerImg.classList.remove('fade-out');
            imageViewerImg.classList.add('fade-in');
            currentImageIndex = index;
        }, 200);
    };

    const openImageViewer = (e) => {
        e.stopPropagation();
        const projectCard = e.target.closest('.project-card');
        if (!projectCard) return;

        currentProjectImages = Array.from(projectCard.querySelectorAll('.project-image'));
        currentImageIndex = currentProjectImages.findIndex(img => img.src === e.target.src);
        if (currentImageIndex === -1) return;

        imageViewerImg.src = e.target.src;
        imageViewerImg.alt = e.target.alt;
        imageViewer.classList.remove('hidden');
        imageViewer.classList.add('show', 'fade-in');
        imageViewerCloseContainer.classList.remove('hidden');
        imageViewerCloseContainer.classList.add('show');
        body.classList.add('image-viewer-mode');
    };

    const closeImageViewer = (e) => {
        e.stopPropagation();
        imageViewer.classList.remove('show', 'fade-in');
        imageViewer.classList.add('hidden', 'fade-out');
        imageViewerCloseContainer.classList.remove('show');
        imageViewerCloseContainer.classList.add('hidden');
        body.classList.remove('image-viewer-mode');
        setTimeout(() => {
            imageViewer.classList.remove('fade-out');
        }, 200);
    };

    const navigateImage = (direction) => {
        let newIndex = currentImageIndex + direction;
        if (newIndex < 0) newIndex = currentProjectImages.length - 1;
        if (newIndex >= currentProjectImages.length) newIndex = 0;
        updateImage(newIndex);
    };

    imageViewer.addEventListener('click', (e) => {
        if (e.target.closest('#image-viewer-close-container')) return;
        const rect = imageViewer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const third = rect.width / 3;

        if (clickX < third) {
            navigateImage(-1);
        } else if (clickX > 2 * third) {
            navigateImage(1);
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    imageViewer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    imageViewer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) navigateImage(-1);
            else navigateImage(1);
        }
    });

    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach(img => img.addEventListener('click', openImageViewer));
    imageViewerClose.addEventListener('click', closeImageViewer);

    let lastTap = 0;
    imageViewer.addEventListener('click', (e) => {
        if (e.target.closest('#image-viewer-close-container')) return;
        const currentTime = new Date().getTime();
        if (currentTime - lastTap < 300 && currentTime - lastTap > 0) closeImageViewer(e);
        lastTap = currentTime;
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageViewer.classList.contains('show')) closeImageViewer(e);
        else if (e.key === 'ArrowLeft') navigateImage(-1);
        else if (e.key === 'ArrowRight') navigateImage(1);
    });
} else {
    console.error('Image viewer elements not found.');
}

// Local Time Display
if (localTimeElement) {
    function formatLocalDateTime() {
        const time = new Date();
        const year = time.getFullYear();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = monthNames[time.getMonth()];
        const day = time.getDate().toString().padStart(2, '0');
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const seconds = time.getSeconds().toString().padStart(2, '0');
        return `${year} ${month} ${day} / ${hours}:${minutes}:${seconds}`;
    }

    localTimeElement.textContent = formatLocalDateTime();
    setInterval(() => localTimeElement.textContent = formatLocalDateTime(), 1000);
} else {
    console.error('Local time element not found.');
}

// Name Glitch Effect
if (glitchContainer && nameText) {
    function triggerNameGlitch() {
        nameText.classList.add('hidden');
        glitchContainer.classList.remove('hidden');
        glitchContainer.classList.add('show');
        setTimeout(() => {
            glitchContainer.classList.remove('show');
            glitchContainer.classList.add('hidden');
            nameText.classList.remove('hidden');
        }, 500);
    }

    setInterval(triggerNameGlitch, 3000);
    setTimeout(triggerNameGlitch, 1000);
} else {
    console.error('Name glitch elements not found.');
}

// Contact Glitch Verification
if (!telegramGlitch || !whatsappGlitch) {
    console.error('Contact glitch elements (telegram or whatsapp) not found.');
}

// Navigation Glitch Verification
if (!homeGlitch || !skillsNavGlitch || !servicesNavGlitch || !projectsNavGlitch || !reviewsNavGlitch || !contactNavGlitch) {
    console.error('Navigation glitch elements not found.');
}

// Service Order Buttons
if (servicePriceGlitchWrappers.length > 0) {
    servicePriceGlitchWrappers.forEach(wrapper => {
        const serviceButton = wrapper.querySelector('.service-price');
        if (!serviceButton) {
            console.error('Service button not found in wrapper:', wrapper);
            return;
        }
        const serviceName = serviceButton.getAttribute('data-service');
        const contactSection = document.getElementById('contact');
        const nameInput = document.getElementById('name');
        const messageInput = document.getElementById('message');

        ['click', 'touchstart'].forEach(eventType => {
            wrapper.addEventListener(eventType, handleInteraction(eventType, (e) => {
                e.preventDefault();
                if (contactSection && nameInput && messageInput) {
                    triggerGlitch(serviceButton, wrapper, () => {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                        nameInput.focus();
                        const article = ['a', 'e', 'i', 'o', 'u'].includes(serviceName[0].toLowerCase()) ? 'an' : 'a';
                        messageInput.value = `Hi, I’m interested in ${article} ${serviceName}. Here’s what I need —`;
                    });
                } else {
                    console.error('Contact section, name input, or message input not found.');
                }
            }));
        });
    });
} else {
    console.error('Service price glitch wrappers not found.');
}

// Weird Project Button
if (weirdProjectButton) {
    ['click', 'touchstart'].forEach(eventType => {
        weirdProjectButton.addEventListener(eventType, handleInteraction(eventType, (e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            const nameInput = document.getElementById('name');
            const messageInput = document.getElementById('message');
            if (contactSection && nameInput && messageInput) {
                triggerGlitch(weirdProjectButton, null, () => {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    nameInput.focus();
                    messageInput.value = 'Hey, I got some weird project idea — ';
                });
            } else {
                console.error('Contact section, name input, or message input not found.');
            }
        }));
    });
} else {
    console.error('Weird project button not found.');
}

// Project Carousel
let currentCardIndex = 0;

function updateProjectCarousel() {
    projectCards.forEach((card, index) => {
        card.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
        card.classList.remove('active', 'exiting');
        if (index === currentCardIndex) {
            card.classList.add('active');
            card.style.transform = 'translateX(0)';
            card.style.opacity = '1';
        } else if (index === (currentCardIndex - 1 + projectCards.length) % projectCards.length) {
            card.classList.add('exiting');
            card.style.transform = 'translateX(-150%)';
            card.style.opacity = '0';
        } else {
            card.style.transform = 'translateX(150%)';
            card.style.opacity = '0';
        }
    });
}

if (carouselTrack && projectCards.length > 0 && projectPrev && projectNext && projectPrevGlitchWrapper && projectNextGlitchWrapper) {
    updateProjectCarousel();

    ['click', 'touchstart'].forEach(eventType => {
        projectNextGlitchWrapper.addEventListener(eventType, handleInteraction(eventType, () => {
            triggerGlitch(projectNext, projectNextGlitchWrapper, () => {
                currentCardIndex = (currentCardIndex + 1) % projectCards.length;
                updateProjectCarousel();
            });
        }));

        projectPrevGlitchWrapper.addEventListener(eventType, handleInteraction(eventType, () => {
            triggerGlitch(projectPrev, projectPrevGlitchWrapper, () => {
                currentCardIndex = (currentCardIndex - 1 + projectCards.length) % projectCards.length;
                updateProjectCarousel();
            });
        }));
    });
} else {
    console.error('Project carousel elements not found.');
}

// Project Image Sub-Carousel
const projectImageCarousels = document.querySelectorAll('.project-image-carousel');

projectImageCarousels.forEach((carousel, carouselIndex) => {
    const images = carousel.querySelectorAll('.project-image');
    let currentImageIndex = 0;
    let imageAutoSlideTimeout = null;

    function updateImageCarousel() {
        const prevIndex = currentImageIndex;
        currentImageIndex = (currentImageIndex + 1) % images.length;

        images.forEach((img, index) => {
            img.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out, filter 0.3s ease-in-out';
            img.classList.remove('active', 'exiting');
            if (index === currentImageIndex) {
                img.classList.add('active');
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
                img.style.zIndex = '1';
            } else if (index === prevIndex) {
                img.classList.add('exiting');
                img.style.opacity = '0';
                img.style.transform = 'scale(1)';
                img.style.zIndex = '0';
            } else {
                img.style.opacity = '0';
                img.style.transform = 'scale(1)';
                img.style.zIndex = '0';
            }
        });
    }

    function startImageAutoSlide() {
        imageAutoSlideTimeout = setTimeout(() => {
            updateImageCarousel();
            startImageAutoSlide();
        }, 3000);
    }

    function stopImageAutoSlide() {
        clearTimeout(imageAutoSlideTimeout);
    }

    updateImageCarousel();
    startImageAutoSlide();

    images.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            if (imageViewerImg && imageViewer && imageViewerCloseContainer && body) {
                imageViewerImg.src = e.target.src;
                imageViewerImg.alt = e.target.alt;
                imageViewer.classList.remove('hidden');
                imageViewer.classList.add('show');
                imageViewerCloseContainer.classList.remove('hidden');
                imageViewerCloseContainer.classList.add('show');
                body.classList.add('image-viewer-mode');
            } else {
                console.error('Image viewer elements are not defined');
            }
        });
    });
});

// Reviews Carousel Auto-Animation
let currentReviewIndex = 0;
let reviewAutoSlideTimeout = null;
let isReviewCarouselHovered = false;
let slideStartTime = Date.now();
let slideDuration = 3000;

function updateReviewsCarousel(direction = 'next') {
    const prevIndex = currentReviewIndex;
    currentReviewIndex = direction === 'next' 
        ? (currentReviewIndex + 1) % reviewCards.length 
        : (currentReviewIndex - 1 + reviewCards.length) % reviewCards.length;

    reviewCards.forEach((card, index) => {
        card.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
        card.classList.remove('active', 'exiting');
        if (index === currentReviewIndex) {
            card.classList.add('active');
            card.style.transform = 'translateX(0)';
            card.style.opacity = '1';
        } else if (index === prevIndex) {
            card.classList.add('exiting');
            card.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
            card.style.opacity = '0';
        } else {
            card.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
            card.style.opacity = '0';
        }
    });

    slideStartTime = Date.now();
}

function startReviewAutoSlide(remainingTime = slideDuration) {
    if (!isReviewCarouselHovered) {
        reviewAutoSlideTimeout = setTimeout(() => {
            updateReviewsCarousel('next');
            startReviewAutoSlide();
        }, remainingTime);
    }
}

if (reviewCards.length > 0) {
    updateReviewsCarousel();

    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            isReviewCarouselHovered = true;
            const elapsedTime = Date.now() - slideStartTime;
            const remainingTime = Math.max(0, slideDuration - elapsedTime);
            stopReviewAutoSlide();
            card.dataset.remainingTime = remainingTime;
        });
        card.addEventListener('mouseleave', () => {
            isReviewCarouselHovered = false;
            const remainingTime = parseInt(card.dataset.remainingTime) || slideDuration;
            startReviewAutoSlide(remainingTime);
        });
    });

    startReviewAutoSlide();
} else {
    console.error('Review cards not found.');
}

// Write Review Button
if (writeReviewButton && writeReviewGlitchWrapper) {
    ['click', 'touchstart'].forEach(eventType => {
        writeReviewGlitchWrapper.addEventListener(eventType, handleInteraction(eventType, (e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            const nameInput = document.getElementById('name');
            const messageInput = document.getElementById('message');
            if (contactSection && nameInput && messageInput) {
                triggerGlitch(writeReviewButton, writeReviewGlitchWrapper, () => {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    nameInput.focus();
                    messageInput.value = 'Rreview — ';
                });
            } else {
                console.error('Contact section, name input, or message input not found.');
            }
        }));
    });
} else {
    console.error('Write review button elements not found.');
}

// Contact Form Submission
if (contactForm && formStatus && formSubmitGlitch && formGlitchWrapper) {
    const submitButton = document.querySelector('.form-submit');

    const submitForm = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        submitButton.disabled = true;
        submitButton.classList.add('hidden');
        triggerGlitch(formSubmitGlitch, formGlitchWrapper, async () => {
            formStatus.textContent = 'Sending...';
            const formData = new FormData(contactForm);

            try {
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                });

                if (response.ok) {
                    formStatus.textContent = 'Message sent successfully!';
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message.');
                }
            } catch (error) {
                formStatus.textContent = 'Error sending message. Please try again.';
                console.error('Form submission error:', error);
            } finally {
                formSubmitGlitch.classList.remove('show');
                formSubmitGlitch.classList.add('hidden');
                submitButton.classList.remove('hidden');
                submitButton.disabled = false;
            }
        });
    };

    ['click', 'touchstart'].forEach(eventType => {
        formGlitchWrapper.addEventListener(eventType, handleInteraction(eventType, submitForm));
    });
} else {
    console.error('Contact form elements not found.');
}

// Contact Buttons (Telegram and WhatsApp)
if (telegramGlitch && whatsappGlitch) {
    const telegramGlitchWrapper = telegramGlitch.closest('.contact-glitch-wrapper') || telegramGlitch.parentElement;
    const whatsappGlitchWrapper = whatsappGlitch.closest('.contact-glitch-wrapper') || whatsappGlitch.parentElement;

    ['click', 'touchstart'].forEach(eventType => {
        if (telegramGlitchWrapper) {
            const telegramLink = telegramGlitch.querySelector('a') || telegramGlitch;
            telegramGlitchWrapper.addEventListener(eventType, handleInteraction(eventType, (e) => {
                e.preventDefault();
                triggerGlitch(telegramGlitch, telegramGlitchWrapper, () => {
                    if (telegramLink && telegramLink.href) {
                        window.location.href = telegramLink.href;
                    }
                });
            }));
        } else {
            console.error('Telegram glitch wrapper not found.');
        }

        if (whatsappGlitchWrapper) {
            const whatsappLink = whatsappGlitch.querySelector('a') || whatsappGlitch;
            whatsappGlitchWrapper.addEventListener(eventType, handleInteraction(eventType, (e) => {
                e.preventDefault();
                triggerGlitch(whatsappGlitch, whatsappGlitchWrapper, () => {
                    if (whatsappLink && whatsappLink.href) {
                        window.location.href = whatsappLink.href;
                    }
                });
            }));
        } else {
            console.error('WhatsApp glitch wrapper not found.');
        }
    });
} else {
    console.error('Contact glitch elements (telegram or whatsapp) not found.');
}

// Combined Theme and Language Switcher
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const select = document.querySelector(".custom-select");
    const selected = select.querySelector(".selected");
    const optionsContainer = select.querySelector(".options");
    const optionsList = optionsContainer.querySelectorAll("div");

    let currentLanguage = localStorage.getItem('language') || 'en';
    let currentTheme = localStorage.getItem('theme') || 'black';

    async function loadTranslations(lang) {
        try {
            const response = await fetch(`./${lang}.json`);
            if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
            return await response.json();
        } catch (error) {
            console.error('Error loading translations:', error);
            return {};
        }
    }

    function getNestedProperty(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj) || '';
    }

    function updateTextContent(translations) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const text = getNestedProperty(translations, key);
            if (text) {
                if (
                    element.tagName.toLowerCase() === 'p' ||
                    element.tagName.toLowerCase() === 'span' ||
                    element.tagName.toLowerCase() === 'h2' ||
                    element.classList.contains('contact-item') ||
                    element.classList.contains('workflow')
                ) {
                    element.innerHTML = text;
                } else {
                    element.textContent = text;
                }
                if (
                    element.classList.contains('glitch-button') ||
                    element.classList.contains('glitch-text') ||
                    element.classList.contains('glitch-link')
                ) {
                    element.setAttribute('data-text', text);
                }
            }
        });
        document.documentElement.lang = currentLanguage;
    }

    async function setLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        const translations = await loadTranslations(lang);
        updateTextContent(translations);
        selected.textContent = getNestedProperty(translations, 'language.current') || optionsContainer.querySelector(`[data-value="${lang}"]`).textContent;
    }

    function initializeTheme() {
        body.classList.toggle('white-theme', currentTheme === 'white');
        themeToggle.setAttribute('data-i18n', currentTheme === 'white' ? 'theme.dark' : 'theme.white');
    }

    function handleThemeToggle(e) {
        e.preventDefault();
        body.classList.toggle('white-theme');
        currentTheme = body.classList.contains('white-theme') ? 'white' : 'black';
        localStorage.setItem('theme', currentTheme);
        themeToggle.setAttribute('data-i18n', currentTheme === 'white' ? 'theme.dark' : 'theme.white');
        setLanguage(currentLanguage);
    }

    if (themeToggle && body && select) {
        initializeTheme();
        setLanguage(currentLanguage);

        ['click', 'touchstart'].forEach(eventType => {
            themeToggle.addEventListener(eventType, handleInteraction(eventType, handleThemeToggle));
        });

        selected.addEventListener('click', () => {
            select.classList.toggle('active');
        });

        optionsList.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.getAttribute('data-value');
                setLanguage(lang);
                select.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!select.contains(e.target)) {
                select.classList.remove('active');
            }
        });
    } else {
        console.error('Required elements (themeToggle, body, or select) not found.');
    }
});
