const btnMenu = document.getElementById("btnMenu");
const menuList = document.getElementById("menuList");
const btnHome = document.getElementById("btnHome");
const btnAbout = document.getElementById("btnAbout");
const btnSkills = document.getElementById("btnSkills");
const btnProjects = document.getElementById("btnProjects");
const projecsBoard = document.querySelector('.projects-board');
const btnPrev = document.querySelector('.btnPrev');
const btnNext = document.querySelector('.btnNext');
const container = document.querySelector('.container-projects');
const track = document.querySelector('.projects-board');
let currentProject = 0;

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

async function loadProjects() {
    const response = await fetch('./src/data/projects.json');
    const data = await response.json();

    return data;
}

function createCardProject(coverPath, altImg, title, description, linkPage, linkRepository) {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project');

    const containerImgProject = document.createElement('div');
    containerImgProject.classList.add('img-project');

    const imgProject = document.createElement('img');
    imgProject.src = coverPath;
    imgProject.alt = altImg;

    containerImgProject.appendChild(imgProject);

    const containerInfo = document.createElement('div');
    containerInfo.classList.add('text-card-project');

    const projectTitle = document.createElement('h3');
    projectTitle.textContent = title;

    const projectDescription = document.createElement('p');
    projectDescription.textContent = description;

    const linksContainer = document.createElement('div');
    linksContainer.classList.add('links');

    const linkProjectPage = document.createElement('a');
    linkProjectPage.textContent = 'Página';
    linkProjectPage.href = linkPage;

    const linkRepositoryPage = document.createElement('a');
    linkRepositoryPage.textContent = 'Repositório';
    linkRepositoryPage.href = linkRepository;

    linkProjectPage.target = linkRepositoryPage.target = '_blank';

    linksContainer.append(linkProjectPage, linkRepositoryPage);

    containerInfo.append(projectTitle, projectDescription, linksContainer);

    projectCard.append(containerImgProject, containerInfo);

    return projectCard;
}

async function showProjects() {
    try {
        const data = await loadProjects();

        data.forEach(project => {
            const cardProject = createCardProject(project.cover_path, project.alt_img, project.title, project.description, project.link_page, project.link_repository_page);
            projecsBoard.appendChild(cardProject);
        });
    }catch(error) {
        console.error('Erro ao mostrar projetos:', error);
    }

    updateCarousel();
}

showProjects();

function updateLimit() {
    let limit;

    if(track.children.length) {
        const containerWidth = container.offsetWidth;
        const cardWidth = track.children[0].offsetWidth + 32;

        const visibleCards = Math.floor(containerWidth / cardWidth);

        limit = track.children.length - visibleCards;
    }else {
        limit = 0;
    }
    
    return limit;
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

window.addEventListener('resize', updateCarousel);