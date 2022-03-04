const results = [];
let copyBtns;
// Getting Form Data after submitting
function getFormData(e) {
    e.preventDefault();
    const urlToShorten = shortenForm.url.value;
    shortenUrl(urlToShorten);
}


// Shorten URL API
async function shortenUrl(urlToShorten) {
    const request = await fetch(`https://api.shrtco.de/v2/shorten?url=${urlToShorten}`)
    const data = await request.json();
    const shortenUrl = data.result.short_link;

    showResult(urlToShorten,shortenUrl);
    results.push({
        'url' : urlToShorten,
        'shortenUrl' : shortenUrl
    })

    // Storing data into the local storage
    localStorage.setItem("links", JSON.stringify(results))
}

// Show result in the list
function showResult(url,shortenUrl) {
    resultsList.insertAdjacentHTML("beforeend", `
        <div class="result-box">
            <p class="submitted-url">${url}</p>
            <hr class="horizontal-line">
            <p class="shorten-result">${shortenUrl}</p>
            <a class="btn copy-btn" title="Copy to clipboard">Copy</a>
        </div>
    `);

    copyBtns = document.querySelectorAll(".result-box .copy-btn")

    // Clear the form after showing the results
    shortenForm.url.value = ''
}


// Load Data from the local storage
if(localStorage.getItem("links")) {
    const storedLinks = JSON.parse(localStorage.getItem("links"))
    storedLinks.forEach(link => {
        const url = link.url;
        const shortenUrl = link.shortenUrl;

        results.push({
            'url' : url,
            'shortenUrl' : shortenUrl
        })
        showResult(url,shortenUrl);
    });
}

function copyUrl(e) {
    const resultBox = e.target.parentElement;
    const text = resultBox.querySelector(".shorten-result").textContent;
    navigator.clipboard.writeText(text);

    // Alert the copied text
    // First return everything to the default style
    copyBtns.forEach(btn => {
        btn.classList.remove("copied");
        btn.textContent = "Copy";
    });
    // Change the color and text of the button
    resultBox.querySelector(".copy-btn").classList.add("copied");
    resultBox.querySelector(".copy-btn").textContent = "Copied!"
}

// Events
shortenForm.addEventListener("submit",getFormData);
copyBtns.forEach(btn => {
    btn.addEventListener("click", copyUrl);
});

