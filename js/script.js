/* Portfolio JavaScript */

document.addEventListener('DOMContentLoaded', () => {
	initStickyHeader();
	initSmoothScroll();
	initActiveNavigation();
	initBackToTop();
	initMobileMenu();
});

function initStickyHeader() {
	const header = document.querySelector('header');

	if (!header) {
		return;
	}

	window.addEventListener('scroll', () => {
		header.classList.toggle('sticky', window.scrollY > 50);
	});
}

function initSmoothScroll() {
	const links = document.querySelectorAll('nav a[href^="#"]');

	links.forEach((link) => {
		link.addEventListener('click', (event) => {
			event.preventDefault();

			const target = document.querySelector(link.getAttribute('href'));

			if (!target) {
				return;
			}

			window.scrollTo({
				top: target.offsetTop - 80,
				behavior: 'smooth'
			});
		});
	});
}

function initActiveNavigation() {
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('nav ul li a');

	if (!sections.length || !navLinks.length) {
		return;
	}

	function updateActiveMenu() {
		const scrollPosition = window.scrollY + 120;

		sections.forEach((section) => {
			const top = section.offsetTop;
			const height = section.offsetHeight;
			const id = section.getAttribute('id');

			if (scrollPosition >= top && scrollPosition < top + height) {
				navLinks.forEach((link) => link.classList.remove('active'));

				const activeLink = document.querySelector(`nav a[href="#${id}"]`);

				if (activeLink) {
					activeLink.classList.add('active');
				}
			}
		});
	}

	window.addEventListener('scroll', updateActiveMenu);
	updateActiveMenu();
}

function initBackToTop() {
	const button = document.getElementById('topButton');

	if (!button) {
		return;
	}

	window.addEventListener('scroll', () => {
		button.classList.toggle('show', window.scrollY > 500);
	});

	button.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
}

function initMobileMenu() {
	const toggle = document.querySelector('.menu-toggle');
	const menu = document.querySelector('nav ul');

	if (!toggle || !menu) {
		return;
	}

	toggle.addEventListener('click', () => {
		menu.classList.toggle('open');
		toggle.classList.toggle('active');
	});

	menu.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => {
			menu.classList.remove('open');
			toggle.classList.remove('active');
		});
	});
}

window.addEventListener('resize', () => {
	const menu = document.querySelector('nav ul');

	if (window.innerWidth > 768) {
		menu?.classList.remove('open');
	}
});

window.addEventListener('scroll', () => {
	const header = document.querySelector('header');

	if (header) {
		header.style.transition = 'all 0.3s ease';
	}
});

/* Scroll animations and effects */
document.addEventListener('DOMContentLoaded', () => {
	initScrollReveal();
	initCounters();
	initTypingEffect();
	initParallax();
	initImageReveal();
});

function initScrollReveal() {
	const elements = document.querySelectorAll(
		'.about-card, .skill-card, .education-card, .training-card, '
		+ '.timeline-item, .contact-card, .language-card, .hero-content'
	);

	if (!elements.length || !('IntersectionObserver' in window)) {
		return;
	}

	elements.forEach((element) => element.classList.add('hidden'));

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('show');
				observer.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.15,
		rootMargin: '0px 0px -50px 0px'
	});

	elements.forEach((element) => observer.observe(element));
}

function initCounters() {
	const counters = document.querySelectorAll('.counter');

	if (!counters.length || !('IntersectionObserver' in window)) {
		return;
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				animateCounter(entry.target);
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.5 });

	counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(counter) {
	const target = Number(counter.dataset.target);
	const duration = 2000;
	const stepTime = 15;
	const increment = target / (duration / stepTime);
	let current = 0;

	if (!Number.isFinite(target)) {
		return;
	}

	const timer = setInterval(() => {
		current += increment;

		if (current >= target) {
			counter.textContent = target;
			clearInterval(timer);
		} else {
			counter.textContent = Math.floor(current);
		}
	}, stepTime);
}

function initTypingEffect() {
	const element = document.querySelector('.typing');

	if (!element) {
		return;
	}

	const words = [
		'Test Automation Engineer',
		'Robot Framework Expert',
		'Playwright Specialist',
		'Python Developer',
		'API Test Engineer',
		'QA Consultant'
	];

	let wordIndex = 0;
	let charIndex = 0;
	let deleting = false;

	function type() {
		const currentWord = words[wordIndex];

		if (!deleting) {
			element.textContent = currentWord.substring(0, charIndex++);

			if (charIndex > currentWord.length) {
				deleting = true;
				setTimeout(type, 1800);
				return;
			}
		} else {
			element.textContent = currentWord.substring(0, charIndex--);

			if (charIndex < 0) {
				deleting = false;
				wordIndex = (wordIndex + 1) % words.length;
			}
		}

		setTimeout(type, deleting ? 45 : 90);
	}

	type();
}

function initParallax() {
	const heroImage = document.querySelector('.hero-image img');

	if (!heroImage) {
		return;
	}

	window.addEventListener('scroll', () => {
		heroImage.style.transform = `translateY(${window.scrollY * 0.12}px)`;
	});
}

function initImageReveal() {
	const images = document.querySelectorAll('img');

	if (!images.length || !('IntersectionObserver' in window)) {
		return;
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('fade-in');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.2 });

	images.forEach((image) => observer.observe(image));
}

function staggerCards(selector) {
	document.querySelectorAll(selector).forEach((card, index) => {
		card.style.transitionDelay = `${index * 120}ms`;
	});
}

staggerCards('.about-card');
staggerCards('.skill-card');
staggerCards('.timeline-item');
staggerCards('.training-card');
staggerCards('.education-card');

/* Skills animation, progress bars, timeline animation, and dark mode */
document.addEventListener('DOMContentLoaded', () => {
	initProgressBars();
	initTimelineAnimation();
	initDarkMode();
	initSkillCards();
	initStatistics();
});

function initProgressBars() {
	const bars = document.querySelectorAll('.progress-fill');

	if (!bars.length || !('IntersectionObserver' in window)) {
		return;
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const bar = entry.target;
				const value = bar.dataset.progress || '100';

				bar.style.width = `${value}%`;
				observer.unobserve(bar);
			}
		});
	}, { threshold: 0.4 });

	bars.forEach((bar) => {
		bar.style.width = '0%';
		observer.observe(bar);
	});
}

function initTimelineAnimation() {
	const items = document.querySelectorAll('.timeline-item');

	if (!items.length || !('IntersectionObserver' in window)) {
		return;
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('show');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.2 });

	items.forEach((item, index) => {
		item.style.transitionDelay = `${index * 150}ms`;
		item.classList.add('hidden');
		observer.observe(item);
	});
}

function initSkillCards() {
	document.querySelectorAll('.skill-card').forEach((card) => {
		card.addEventListener('mouseenter', () => {
			card.style.transform = 'translateY(-12px) scale(1.03)';
		});

		card.addEventListener('mouseleave', () => {
			card.style.transform = 'translateY(0) scale(1)';
		});
	});
}

function initDarkMode() {
	const toggle = document.querySelector('#themeToggle');

	if (!toggle) {
		return;
	}

	const savedTheme = localStorage.getItem('theme');

	if (savedTheme === 'dark') {
		document.body.classList.add('dark');
		toggle.innerHTML = '<i class="fas fa-sun"></i>';
	}

	toggle.addEventListener('click', () => {
		document.body.classList.toggle('dark');
		const dark = document.body.classList.contains('dark');

		localStorage.setItem('theme', dark ? 'dark' : 'light');
		toggle.innerHTML = dark
			? '<i class="fas fa-sun"></i>'
			: '<i class="fas fa-moon"></i>';
	});
}

function initStatistics() {
	const stats = document.querySelectorAll('.stat-number');

	if (!stats.length || !('IntersectionObserver' in window)) {
		return;
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				animateStat(entry.target);
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.5 });

	stats.forEach((stat) => observer.observe(stat));
}

function animateStat(element) {
	const target = Number(element.dataset.value);
	const suffix = element.dataset.suffix || '';

	if (!Number.isFinite(target)) {
		return;
	}

	let current = 0;
	const speed = target / 80;

	const timer = setInterval(() => {
		current += speed;

		if (current >= target) {
			current = target;
			clearInterval(timer);
		}

		element.textContent = Math.floor(current) + suffix;
	}, 20);
}

function initTechnologyBadges() {
	document.querySelectorAll('.tech-badge').forEach((badge) => {
		badge.addEventListener('mouseenter', () => {
			badge.style.transform = 'translateY(-6px)';
		});

		badge.addEventListener('mouseleave', () => {
			badge.style.transform = 'translateY(0)';
		});
	});
}

function initSectionTitleAnimation() {
	const titles = document.querySelectorAll('.section-title');

	if (!titles.length || !('IntersectionObserver' in window)) {
		return;
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('fade-in');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.3 });

	titles.forEach((title) => observer.observe(title));
}

function initHeroImageTilt() {
	const heroImage = document.querySelector('.hero-image img');

	if (!heroImage) {
		return;
	}

	heroImage.addEventListener('mousemove', (event) => {
		const rect = heroImage.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const rotateY = (x / rect.width - 0.5) * 18;
		const rotateX = (0.5 - y / rect.height) * 18;

		heroImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
	});

	heroImage.addEventListener('mouseleave', () => {
		heroImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
	});
}

function initTechnologyFilters() {
	const filterButtons = document.querySelectorAll('.filter-btn');

	filterButtons.forEach((button) => {
		button.addEventListener('click', () => {
			filterButtons.forEach((item) => item.classList.remove('active'));
			button.classList.add('active');
		});
	});
}

function initButtonRipples() {
	document.querySelectorAll('.btn').forEach((button) => {
		button.addEventListener('click', (event) => {
			const ripple = document.createElement('span');
			ripple.className = 'ripple';
			ripple.style.left = `${event.offsetX}px`;
			ripple.style.top = `${event.offsetY}px`;
			button.appendChild(ripple);

			setTimeout(() => ripple.remove(), 600);
		});
	});
}

document.addEventListener('DOMContentLoaded', () => {
	initTechnologyBadges();
	initSectionTitleAnimation();
	initHeroImageTilt();
	initTechnologyFilters();
	initButtonRipples();
});

/* Contact form, loading screen, persistence, and utilities */
document.addEventListener('DOMContentLoaded', () => {
	initLoadingScreen();
	initContactForm();
	initThemePersistence();
	initLazyLoading();
	initCurrentYear();
	initCopyEmail();
	initDebounceResize();
});

function initLoadingScreen() {
	const loader = document.querySelector('#loader');

	if (!loader) {
		return;
	}

	window.addEventListener('load', () => {
		loader.classList.add('fade-out');
		setTimeout(() => loader.remove(), 700);
	});
}

function initContactForm() {
	const form = document.querySelector('#contactForm');

	if (!form) {
		return;
	}

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		const name = document.querySelector('#name');
		const email = document.querySelector('#email');
		const subject = document.querySelector('#subject');
		const message = document.querySelector('#message');

		if (!name || !email || !subject || !message) {
			return;
		}

		if (![name, email, subject, message].every((field) => field.value.trim())) {
			showNotification('Please complete all fields.', 'error');
			return;
		}

		if (!validateEmail(email.value)) {
			showNotification('Invalid email address.', 'error');
			return;
		}

		showNotification('Message validated successfully.', 'success');
		form.reset();
	});
}

function validateEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type) {
	const notification = document.createElement('div');
	notification.className = `notification ${type}`;
	notification.textContent = message;
	document.body.appendChild(notification);

	setTimeout(() => notification.classList.add('show'), 100);
	setTimeout(() => {
		notification.classList.remove('show');
		setTimeout(() => notification.remove(), 300);
	}, 3000);
}

function initThemePersistence() {
	if (localStorage.getItem('theme') === 'dark') {
		document.body.classList.add('dark');
	}
}

function initLazyLoading() {
	const images = document.querySelectorAll('img[data-src]');

	if (!images.length) {
		return;
	}

	if (!('IntersectionObserver' in window)) {
		images.forEach((image) => {
			image.src = image.dataset.src;
			image.removeAttribute('data-src');
		});
		return;
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const image = entry.target;
				image.src = image.dataset.src;
				image.removeAttribute('data-src');
				observer.unobserve(image);
			}
		});
	});

	images.forEach((image) => observer.observe(image));
}

function initCopyEmail() {
	const button = document.querySelector('#copyEmail');

	if (!button) {
		return;
	}

	button.addEventListener('click', async () => {
		const email = button.dataset.email;

		if (!email || !navigator.clipboard) {
			showNotification('Copying email is not available.', 'error');
			return;
		}

		try {
			await navigator.clipboard.writeText(email);
			showNotification('Email copied.', 'success');
		} catch {
			showNotification('Unable to copy email.', 'error');
		}
	});
}

function initCurrentYear() {
	const year = document.querySelector('#year');

	if (year) {
		year.textContent = new Date().getFullYear();
	}
}

function debounce(func, delay) {
	let timeout;

	return function debounced(...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), delay);
	};
}

function initDebounceResize() {
	window.addEventListener('resize', debounce(() => {
		console.log('Window resized.');
	}, 300));
}

function scrollToSection(id) {
	const section = document.querySelector(id);

	if (section) {
		section.scrollIntoView({ behavior: 'smooth' });
	}
}

function initContactSubmitState() {
	const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
	const submit = document.querySelector('#submitBtn');

	if (!inputs.length || !submit) {
		return;
	}

	const updateSubmitState = () => {
		submit.disabled = [...inputs].some((field) => !field.value.trim());
	};

	submit.disabled = true;
	inputs.forEach((input) => input.addEventListener('input', updateSubmitState));
}

window.addEventListener('error', (event) => {
	console.error('Application Error:', event.message);
});

window.addEventListener('load', () => {
	console.log(`Portfolio loaded in ${Math.round(performance.now())} ms`);
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'Home') {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
});

function $(selector) {
	return document.querySelector(selector);
}

function $$(selector) {
	return document.querySelectorAll(selector);
}

document.addEventListener('DOMContentLoaded', () => {
	initContactSubmitState();
});

console.log('Portfolio initialized successfully.');
