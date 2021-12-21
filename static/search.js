function debounce(func, timeout = 200) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

let boxUpper = document.getElementById('searchBoxUpper');
let boxLower = document.getElementById('searchBoxLower');
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
        
        console.log("new")
        if (boxUpper.value.length > 0) {
            result = fuse.search(boxUpper.value)
            for (let element of postElements) {
                element.style.display = "none"; 
            }

            for (let item of result) {
                for (let element of document.getElementsByClassName(`post-url-${item.item.url}`)) {
                    element.style.display = "";
                }
            }
        } else if (boxLower != null && boxLower.value.length > 0) {
            result = fuse.search(boxLower.value)
            for (let element of postElements) {
                element.style.display = "none"; 
            }

            for (let item of result) {
                for (let element of document.getElementsByClassName(`post-url-${item.item.url}`)) {
                    element.style.display = "";
                }
            }
        } else {
            for (let element of postElements) {
                element.style.display = ""; 
            }
        }
    })

    const trySearch = debounce(() => runSearch());
    
    boxUpper.addEventListener("keyup",(e) => {
        trySearch();
    });

    if (boxLower != null) {
        boxLower.addEventListener("keyup",(e) => {
            trySearch();
        });   
    }
})();