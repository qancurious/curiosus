// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	});
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
	const nav = document.querySelector('nav');
	if (window.scrollY > 100) {
		nav.style.background = 'rgba(47, 49, 54, 0.75)';
	} else {
		nav.style.background = 'rgba(47, 49, 54, 0.95)';
	}
});

// Invite bot
function inviteBot() {
	// Replace with your actual Discord bot invite link
	const inviteUrl =
		'https://discord.com/oauth2/authorize?client_id=584333812922843176&permissions=1375198375110&integration_type=0&scope=bot+applications.commands';
	window.open(inviteUrl, '_blank');
}
