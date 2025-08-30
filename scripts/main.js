// Intersection Observer for animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.style.opacity = '1';
			entry.target.style.transform = 'translateY(0)';
		}
	});
}, observerOptions);

// Initialize page
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Observe all feature cards and command cards
document.querySelectorAll('.feature-card, .command-card').forEach((card) => {
	card.style.opacity = '0';
	card.style.transform = 'translateY(30px)';
	card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
	observer.observe(card);
});

// Command card click effects
document.querySelectorAll('.command-card').forEach((card) => {
	card.addEventListener('click', function () {
		this.style.transform = 'scale(0.95)';
		setTimeout(() => {
			this.style.transform = 'translateX(5px)';
		}, 150);
	});
});

// Particle effect
function createParticles() {
	const particlesContainer = document.getElementById('particles');
	const particleCount = 50;

	for (let i = 0; i < particleCount; i++) {
		const particle = document.createElement('div');
		particle.className = 'particle';
		particle.style.left = Math.random() * 100 + '%';
		particle.style.animationDelay = Math.random() * 6 + 's';
		particle.style.animationDuration = Math.random() * 3 + 3 + 's';
		particlesContainer.appendChild(particle);
	}
}

// Add loading animation
window.addEventListener('load', () => {
	document.body.style.opacity = '1';
	createParticles();
});

// animate number
function animateValue(id, start, end, duration, decimalPlaces = 0, suffix = '+') {
	const obj = document.getElementById(id);
	if (!obj) {
		console.error(`Error: Element with ID "${id}" not found.`);
		return;
	}

	let startTimestamp = null;
	const step = (timestamp) => {
		if (!startTimestamp) startTimestamp = timestamp;
		const progress = Math.min((timestamp - startTimestamp) / duration, 1);
		const currentValue = progress * (end - start) + start;

		obj.textContent = currentValue.toLocaleString('en-US', {
			minimumFractionDigits: decimalPlaces,
			maximumFractionDigits: decimalPlaces,
		});

		if (progress < 1) {
			window.requestAnimationFrame(step);
		} else {
			let finalValue = end.toLocaleString('en-US', {
				minimumFractionDigits: decimalPlaces,
				maximumFractionDigits: decimalPlaces,
			});

			if (id === 'user-count' && end >= 1000000) {
				finalValue = (end / 1000000).toFixed(1).replace('.0', '') + 'M';
			}

			obj.textContent = finalValue + suffix;
		}
	};

	window.requestAnimationFrame(step);
}

// Sets up and starts the Intersection Observer to trigger animations on scroll.
function initializeStatisticAnimations() {
	const statsSection = document.getElementById('stats');
	if (!statsSection) return;

	const observerOptions = {
		root: null,
		threshold: 0.5,
	};

	const observerCallback = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				console.log('Stats section is visible, starting animations...');

				// Call all animations here
				animateValue('server-count', 0, 10, 2000, 0, '+');
				animateValue('user-count', 0, 404, 2500, 0, '+');
				animateValue('uptime-count', 0, 90.9, 2200, 1, '%');
				animateValue('commands-count', 0, 30, 1500, 0, '+');

				observer.unobserve(entry.target);
			}
		});
	};

	const observer = new IntersectionObserver(observerCallback, observerOptions);
	observer.observe(statsSection);
}

// Function to load and initialize the WidgetBot.
function initializeWidgetBot() {
	const crateScript = document.createElement('script');

	crateScript.src = 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3';
	crateScript.async = true;
	crateScript.defer = true;

	crateScript.onload = () => {
		console.log('WidgetBot Crate loaded, initializing...');
		new Crate({
			server: '759148058843283486', // Your Discord Server ID
			channel: '1410642431938003036', // Your Discord Channel ID
		});
	};

	document.body.appendChild(crateScript);
}

window.addEventListener('load', () => {
	initializeStatisticAnimations();
	initializeWidgetBot();
});
