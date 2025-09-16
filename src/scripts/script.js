const btnMenu = document.getElementById("btnMenu");
const menuList = document.getElementById("menuList");
const btnHome = document.getElementById("btnHome");
const btnAbout = document.getElementById("btnAbout");
const btnSkills = document.getElementById("btnSkills");
const btnProjects = document.getElementById("btnProjects");

function abrirFecharMenu() {
    menuList.classList.toggle("aberto");
}

btnMenu.addEventListener("click", abrirFecharMenu);
btnHome.addEventListener("click", abrirFecharMenu);
btnAbout.addEventListener("click", abrirFecharMenu);
btnSkills.addEventListener("click", abrirFecharMenu);

document.addEventListener("click", (evt) => {
    const clickForaDoMenu = getComputedStyle(menuList).display === "flex" && !menuList.contains(evt.target) && evt.target !== btnMenu;

    if(clickForaDoMenu)
        abrirFecharMenu()
});

const btnPrev = document.querySelector('.btnPrev');
const btnNext = document.querySelector('.btnNext');
const container = document.querySelector('.container-projects');
const track = document.querySelector('.projects-board');
let currentProject = 0;

function updateLimit() {
    const containerWidth = container.offsetWidth;
    const cardWidth = track.children[0].offsetWidth + 32;

    const visibleCards = Math.floor(containerWidth / cardWidth);
    return track.children.length - visibleCards;
}

btnPrev.addEventListener('click', () => {
    if(currentProject === 0) return

    currentProject--;
    updateCarousel();
});

btnNext.addEventListener('click', () => {
    const limitCard = updateLimit();
    if(currentProject === limitCard) return
    
    currentProject++;
    updateCarousel();
});

function updateCarousel() {
    const limitCard = updateLimit();

    if(currentProject > limitCard) currentProject = limitCard;

    track.style.transform = `translateX(-${currentProject * 20}rem)`;

    btnPrev.disabled = currentProject === 0;
    btnPrev.classList.toggle('disable', btnPrev.disabled);

    btnNext.disabled = currentProject === limitCard;
    btnNext.classList.toggle('disable', btnNext.disabled);
}

updateCarousel();

window.addEventListener('resize', updateCarousel);