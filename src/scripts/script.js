const btnMenu = document.getElementById("btnMenu");
const menuList = document.getElementById("menuList");
const btnHome = document.getElementById("btnHome");
const btnAbout = document.getElementById("btnAbout");
const btnSkills = document.getElementById("btnSkills");
const btnProjects = document.getElementById("btnProjects");
const btnContact = document.getElementById("btnContact");

function abrirFecharMenu() {
    const estaFechado = getComputedStyle(menuList).display === "none";
    
    if(estaFechado)
        menuList.style.display = "flex";
    else
        menuList.style.display = "none";
}

btnMenu.addEventListener("click", abrirFecharMenu);
btnHome.addEventListener("click", abrirFecharMenu);
btnAbout.addEventListener("click", abrirFecharMenu);
btnSkills.addEventListener("click", abrirFecharMenu);
btnContact.addEventListener("click", abrirFecharMenu);

document.addEventListener("click", (evt) => {
    const clickForaDoMenu = getComputedStyle(menuList).display === "flex" && !menuList.contains(evt.target) && evt.target !== btnMenu;

    if(clickForaDoMenu)
        abrirFecharMenu()
});