document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.dress ul');
    const mainSection = document.getElementById('hovedside');
    
    function buildTabs() {
    navMenu.innerHTML = '';
    
    navMenu.append(...resources.map((resource, index) => {
    const tabButton = document.createElement('button');
    tabButton.textContent = resource.category;
    tabButton.classList.add('knapp');
    tabButton.dataset.index = index;
    
    // første knappen som default
    if (index === 0) {
    tabButton.classList.add('active');
    }
    
    tabButton.addEventListener('click', () => {
    document.querySelectorAll('.knapp').forEach(btn => btn.classList.remove('active'));
    tabButton.classList.add('active');
    showCategory(index);
    });
    
    const listItem = document.createElement('li');
    listItem.appendChild(tabButton);
    return listItem;
    }));
    }
    
    // Funksjon for å hente innholde fra ressurs filen
    function showCategory(index) {
    const category = resources[index];
    mainSection.innerHTML = '';
    
    //legge til tittel og tekst
    mainSection.append(
    Object.assign(document.createElement('h2'), { textContent: category.category }),
    Object.assign(document.createElement('p'), { textContent: category.text })
    );
    
    // legge til liste til ressurser
    const resourceList = document.createElement('ul');
    resourceList.append(...category.sources
    .filter(source => source.title && source.url)
    .map(source => {
    const listItem = document.createElement('li');
    const link = Object.assign(document.createElement('a'), {
    textContent: source.title,
    href: source.url,
    target: '_blank'
    });
    listItem.appendChild(link);
    return listItem;
    })
    );
    
    mainSection.appendChild(resourceList);
    }
    
    buildTabs();
    showCategory(0);
    });