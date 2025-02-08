 /*----**********GESTION DU MENU BURGER************************------*/
var sidenav = document.getElementById("mySidenav");
var openBtn = document.getElementById("openBtn");
var closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;

function openNav() {  
  sidenav.classList.add("active");
}

function closeNav() {   
  sidenav.classList.remove("active");
}


/*----*********************GESTION DE LA METEO************************--------*/
const apiKey = '7b69f8df42046728f5a5214a1f96f8ae'; 
    const ville = 'Strasbourg'; 

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric&lang=fr`;

    function afficherMeteo(data) {
        const location = document.getElementById("localisation");
        const temperature = document.getElementById("temperature");
        const description = document.getElementById("description");
        const humidity = document.getElementById("humidity");

        location.textContent = `Ville : ${data.name}`;
        temperature.textContent = `Température : ${data.main.temp}°C`;
        description.textContent = `Description : ${data.weather[0].description}`;
        humidity.textContent = `Humidité : ${data.main.humidity}%`;
    }

    function obtenirMeteo() {
        fetch(apiURL)
            .then(response => response.json())
            .then(data => afficherMeteo(data))
            .catch(error => {
                console.error('Erreur:', error);
                document.getElementById("meteo").innerHTML = "<p>Impossible de récupérer les données météo.</p>";
            });
    }


    window.addEventListener('load', function() {
      obtenirMeteo();
      showCookieBanner();
    });
   

  
    function getCookieConsent() {
      return JSON.parse(localStorage.getItem('cookieConsent'));
    }

  
    function setCookieConsent(consent) {
      localStorage.setItem('cookieConsent', JSON.stringify(consent));
    }

    
    function showCookieBanner() {
      if (!getCookieConsent()) {
        document.getElementById('cookie').style.display = 'block';
      }
    }

let cookie = document.getElementById('cookie-personnaliser')
    if(cookie){

cookie.addEventListener('click', function() {
      document.getElementById('reglage-cookie').style.display = 'block';
    });

 
    document.getElementById('save-settings').addEventListener('click', function() {
      const consent = {
        accepted: document.getElementById('analytics-cookies').checked,
        advertising: document.getElementById('advertising-cookies').checked,
        functional: document.getElementById('functional-cookies').checked
      };
      setCookieConsent(consent);
      document.getElementById('cookie').style.display = 'none';
      document.getElementById('reglage-cookie').style.display = 'none';
    });

    document.getElementById('close-settings').addEventListener('click', function() {
      document.getElementById('reglage-cookie').style.display = 'none';
    });

    document.getElementById('cookie-accepter').addEventListener('click', function() {
      setCookieConsent({ accepted: true, advertising: true, functional: true });
      document.getElementById('cookie').style.display = 'none';
    });

   
    document.getElementById('cookie-refuser').addEventListener('click', function() {
      setCookieConsent({ accepted: false, advertising: false, functional: false });
      document.getElementById('cookie').style.display = 'none';
    });
    }


    // Appel de la fonction au chargement de la page
    //window.onload = showCookieBanner;
    
/*---------*************fonctionnalité AJAX******************----------------*/

const container = document.querySelector(".container-comment");

fetch("db.json")
.then(function(response){
    return response.json()
})
.then(function(data){

    let html = "";

    data.forEach(function(user){
        html += `
        <div class="card">
            <p><em>Nom</em> : ${user.nom}</p>
            <p> <em>Commentaire</em> : ${user.commentaire}</p>
             <p><em>Service</em> : ${user.categorie}</p>
            <p><em>Date</em> : ${user.date}</p>
        </div> `
    })
    //console.log(html)
    container.innerHTML = html;
})

/*-----------************CARROUSEL************************------------------*/
document.querySelectorAll('.carousel').forEach(carousel => {
  const prevButton = carousel.querySelector('.prev');
  const nextButton = carousel.querySelector('.next');
  const slides = carousel.querySelectorAll('.slide');
  const carouselInner = carousel.querySelector('.carousel-inner');  
  let currentIndex = 0;

  function updateCarousel() { 
    const offset = -currentIndex * 100;  
    carouselInner.style.transform = `translateX(${offset}%)`;
  }

  
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    updateCarousel();
  });

  
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  });
});

/*------**************gestion du formulaire de contact*********-------------*/
const contactForm = document.getElementById("contactForm");

if(contactForm != null){
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const reason = document.getElementById("reason").value;
  
    if (reason === "") {
      alert("Veuillez sélectionner une raison pour votre prise de contact !");
    } else {
      alert("Votre message a été envoyé avec succès !");
      
    }
  });
}