const btnMenu = document.getElementById("btnMenu");
const menuList = document.getElementById("menuList");
const btnHome = document.getElementById("btnHome");
const btnAbout = document.getElementById("btnAbout");
const btnSkills = document.getElementById("btnSkills");
const btnProjects = document.getElementById("btnProjects");
const projectsBoard = document.querySelector('.projects-board');
const btnPrevProject = document.querySelector('.btnPrevProject');
const btnNextProject = document.querySelector('.btnNextProject');
const containerProjects = document.querySelector('.container-projects');
let currentProject = 0;

const skillsBoard = document.querySelector('.skills-board');
const btnPrevSkill = document.querySelector('.btnPrevSkill');
const btnNextSkill = document.querySelector('.btnNextSkill');
const containerSkills = document.querySelector('.container-skills');
let currentSkill = 0;

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
            projectsBoard.appendChild(cardProject);
        });
    }catch(error) {
        console.error('Erro ao mostrar projetos:', error);
    }

    updateCarousel('project');
}

showProjects();

function updateLimit(container, board) {
    let limit;

    if(board.children.length) {
        const containerWidth = container.offsetWidth;
        const cardWidth = board.children[0].offsetWidth + 32;

        const visibleCards = Math.floor(containerWidth / cardWidth);

        limit = board.children.length - visibleCards;
    }else {
        limit = 0;
    }
    
    return limit;
}

btnPrevSkill.addEventListener('click', () => {
    if(currentSkill === 0) return
    
    currentSkill--;
    updateCarousel('skill');
});

btnNextSkill.addEventListener('click', () => {
    const limitCard = updateLimit(containerSkills, skillsBoard);
    if(currentSkill === limitCard) return
    
    currentSkill++;
    updateCarousel('skill');
});


btnPrevProject.addEventListener('click', () => {
    if(currentProject === 0) return

    currentProject--;
    updateCarousel('project');
});

btnNextProject.addEventListener('click', () => {
    const limitCard = updateLimit(containerProjects, projectsBoard);
    if(currentProject === limitCard) return
    
    currentProject++;
    updateCarousel('project');
});

const carousels = {
    skill: {
        container: containerSkills,
        board: skillsBoard,
        getCurrent: () => currentSkill,
        setCurrent: val => currentSkill = val,
        width: 17,
        btnPrev: btnPrevSkill,
        btnNext: btnNextSkill
    },
    project: {
        container: containerProjects,
        board: projectsBoard,
        getCurrent: () => currentProject,
        setCurrent: val => currentProject = val,
        width: 20,
        btnPrev: btnPrevProject,
        btnNext: btnNextProject
    }
}

function updateCarousel(element) {
    const { container, board, getCurrent, setCurrent, width, btnPrev, btnNext } = carousels[element];

    const limitCard = updateLimit(container, board);

    if(getCurrent() > limitCard) setCurrent(limitCard);

    board.style.transform = `translateX(-${getCurrent() * width}rem)`;

    btnPrev.disabled = getCurrent() === 0;
    btnPrev.classList.toggle('disable', btnPrev.disabled);

    btnNext.disabled = getCurrent() === limitCard;
    btnNext.classList.toggle('disable', btnNext.disabled);
}

updateCarousel('skill');

window.addEventListener('resize', () => {
    updateCarousel('skill');
    updateCarousel('project');
});