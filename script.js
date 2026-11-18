// Burger Button
const BurgerBtn = document.getElementById("menu-toggle");
const NavMenu = document.getElementById("mobile-menu");
const Navlinks = NavMenu.querySelectorAll("a");

BurgerBtn.addEventListener("click", function() {
    NavMenu.classList.toggle("hidden");
});

Navlinks.forEach(function(link) {
    link.addEventListener("click", function() {
        NavMenu.classList.add("hidden");
    });
});

// Fade-in animation observer
const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.15
});


// Loading Screen
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hidden");
        
        setTimeout(() => {

            document.querySelectorAll(".fade-in").forEach((element) => {
                observer.observe(element);
            });
            
        }, { once: true });
    }, 3000);
});

//Contact Form
const ContactForm = document.getElementById("contactform");
ContactForm.addEventListener("submit", async function(event){
    event.preventDefault();

    const SendBtn = document.getElementById("sendbtn");
    const FormStatus = document.getElementById("formstatus");

    SendBtn.disabled = true;
    SendBtn.textContent = "Sending...";

    const formData = new FormData(ContactForm);
    formData.append("access_key", "6fba2045-5155-4274-ac4a-567efcb519de");

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if(result.success) {
            FormStatus.textContent = "Message sent successfully.";
            FormStatus.style.color = "green";
            ContactForm.reset();
        } else {
            FormStatus.textContent = "Failed to send message. Please try again."
            FormStatus.style.color = "red";
        }
    } catch(error) {
        FormStatus.textContent = "Something went wrong...";
        FormStatus.style.color = "red";
    }

    SendBtn.disabled = false;
    SendBtn.innerHTML = '<i data-lucide="send" class="w-5 h-5"></i> Send Message';

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
});