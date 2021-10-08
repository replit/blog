//gives us a big ol' stylesheet of all styling. will be used to re-inject any css wiped by the water.css bookmarklet
const allCSS = [...document.styleSheets]
.map(styleSheet => {
	try {
	return [...styleSheet.cssRules]
		.map(rule => rule.cssText)
		.join('');
	} catch (e) {
	console.log('Access to stylesheet %s is denied. Ignoring...', styleSheet.href);
	}
})
.filter(Boolean)
.join('\n');

console.log(allCSS);

self.addEventListener('fetch', function(event) {

	if (event.request.url.includes('https://cdn.jsdelivr.net/npm/water.css')) {
		event.respondWith();
	} else {
		event.respondWith(
			fetch(event.request)
		);
	}
});