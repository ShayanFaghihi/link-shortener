// Selecting variables
const mobileNavIcon = document.querySelector(".nav-icon");
const mobileNav = document.querySelector(".mobile-nav__nav");
const connectors = document.querySelectorAll(".features .features-boxes svg");
const header = document.querySelector("header");

// App constants
const shortenForm = document.querySelector(".shorten-box form");
const resultsList = document.querySelector(".shorten-results")

// Toggling Mobile Navigation window
function toggleMobileNav() {
    mobileNav.classList.toggle("show-nav")
}

// Check window size
function checkWindowSize() {
    // Change svg connectors in features section 
    // In Mobile View
    if(window.innerWidth < 768) {
        connectors.forEach(connector => {
            connector.setAttribute("height", "100")
            connector.querySelector("line").setAttribute("y1","0")
            connector.querySelector("line").setAttribute("x2","0")
            connector.querySelector("line").setAttribute("stroke-width","14")
            
        });
    } else {
        // In Desktop View
        connectors.forEach(connector => {
            connector.setAttribute("height", "500")
            connector.querySelector("line").setAttribute("y1","100")
            connector.querySelector("line").setAttribute("x2","100")
            connector.querySelector("line").setAttribute("stroke-width","7")
        });
    }
}
checkWindowSize();


// Change Navigation height when we scroll with the offset of 80px
function chengeNavHeight() {
    if(window.scrollY > 80) {
        header.classList.add("small-header")
    } else {
        header.classList.remove("small-header")
    }
}

// Events
mobileNavIcon.addEventListener("click",toggleMobileNav);
window.addEventListener("resize", checkWindowSize);
window.addEventListener("scroll", chengeNavHeight)
