function debounce(func, timeout = 200) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

const searchBox = document.getElementById('searchBoxLower') || document.getElementById('searchBoxUpper');
let postElements = document.getElementsByClassName('post-item');
let list = [];

(async () => {
    let response = await fetch('./api/v1/meta')
    list = await response.json()
    
    const options = {
        includeScore: true,
        threshold: 0.4,
        keys: ['title', 'author', 'text']
    }
    
    const fuse = new Fuse(list, options)
    
    const runSearch = (() => {
        let result = [];

        const searchValue = searchBox.value;
        if (searchValue.length > 0) {
            result = fuse.search(searchValue)
            for (let element of postElements) {
                element.style.display = "none"; 
            }

            for (let item of result) {
                for (let element of document.getElementsByClassName(`post-url-${item.item.url}`)) {
                    element.style.display = "";
                }
            }
        } else { //makes sure all elements are shown
            for (let element of postElements) {
                element.style.display = ""; 
            }
        }
    })

    const debouncedSearch = debounce(() => runSearch());
    
    searchBox.addEventListener("keyup",(e) => {
        debouncedSearch();
    });
})();