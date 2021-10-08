// Select the node that will be observed for mutations
	const targetNode = document;

	// Options for the observer (which mutations to observe)
	const config = { attributes: true, childList: true, subtree: true };

	// Callback function to execute when mutations are observed
	const callback = function(mutationsList, observer) {
		// Use traditional 'for loops' for IE 11
		for(const mutation of mutationsList) {
			if (mutation.removedNodes.length != 0) {
				for (const element of mutation.removedNodes) {
					if (element.nodeName == 'STYLE' || (element.nodeName == 'LINK') && !element.href.includes('water.css')) {
						document.head.appendChild(element);
						console.log("added back");
					}
				}
			} else if (mutation.addedNodes.length != 0) {
				mutation.addedNodes.forEach(async (element) => {
					if (element.href && element.href.includes('water.css')) {
						console.log("found the imposter");
						element.remove();
					} else if (element.nodeName == 'BUTTON' && element.ariaLabel == 'Switch theme' && element.firstChild.nodeName == 'svg') {
						element.remove();
					}
				})
			}
			console.log("mutation")
		}
	};

	// Create an observer instance linked to the callback function
	const observer = new MutationObserver(callback);

	// Start observing the target node for configured mutations
	console.log("Starting observation");
	observer.observe(targetNode, config);