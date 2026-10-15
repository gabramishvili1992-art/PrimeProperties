// Smooth Scrolling navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Card button click handler
function openDetails(villaName) {
    alert(`გმადლობთ დაინტერესებისთვის! "${villaName}"-ის დეტალები მალე დაემატება.`);
}

// Contact Form Handler (მხოლოდ თუ ფორმა გვერდზე არსებობს)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('გმადლობთ! თქვენი შეტყობინება წარმატებით გაიგზავნა.');
        this.reset();
    });
}

// თარგმანების ბაზა
const translations = {
    ka: {
        nav_villas: "ვილები",
        nav_services: "სერვისები",
        nav_about: "ჩვენ შესახებ",
        nav_contact: "კონტაქტი",
        hero_title: "აღმოაჩინე შენი იდეალური დასასვენებელი ადგილი",
        hero_subtitle: "ექსკლუზიური ვილები, პრემიუმ სერვისი და დაუვიწყარი შთაბეჭდილებები",
        btn_buy: "ყიდვა",
        btn_rent: "გაქირავება",
        footer_rights: "© 2026 PRIME PROPERTIES. ყველა უფლება დაცულია."
    },
    en: {
        nav_villas: "Villas",
        nav_services: "Services",
        nav_about: "About Us",
        nav_contact: "Contact",
        hero_title: "Discover Your Perfect Vacation Getaway",
        hero_subtitle: "Exclusive villas, premium service, and unforgettable experiences",
        btn_buy: "Buy",
        btn_rent: "Rent",
        footer_rights: "© 2026 PRIME PROPERTIES. All rights reserved."
    }
};

// ენის შეცვლის ფუნქცია
function changeLanguage(lang) {
    // 1. ტექსტების განახლება
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // 2. აქტიური ღილაკის ვიზუალის შეცვლა
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.trim().toLowerCase() === (lang === 'ka' ? 'geo' : 'eng')) {
            btn.classList.add('active');
        }
    });

    // 3. გვერდის ენის ატრიბუტის განახლება
    document.documentElement.lang = lang;

    // 4. არჩეული ენის დამახსოვრება ბრაუზერში
    try {
        localStorage.setItem('lang', lang);
    } catch (e) {
        // localStorage მიუწვდომელია - არაუშავს
    }
}

// გვერდის ჩატვირთვისას შენახული ენის აღდგენა
document.addEventListener('DOMContentLoaded', () => {
    let savedLang = 'ka';
    try {
        savedLang = localStorage.getItem('lang') || 'ka';
    } catch (e) {}
    changeLanguage(savedLang);
});

// სხვა ჩანართში/გვერდზე ენის შეცვლისას ეს გვერდიც ავტომატურად განახლდეს
window.addEventListener('storage', (e) => {
    if (e.key === 'lang' && (e.newValue === 'ka' || e.newValue === 'en')) {
        changeLanguage(e.newValue);
    }
});

// უკან დაბრუნებისას (Back ღილაკი) ბრაუზერის ქეშიდან გახსნილი გვერდიც განახლდეს
window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        let l = 'ka';
        try { l = localStorage.getItem('lang') || 'ka'; } catch (err) {}
        changeLanguage(l);
    }
});
