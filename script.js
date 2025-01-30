//https://stackoverflow.com/questions/47378194/fire-a-function-when-innerhtml-of-element-changes
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
            //https://stackoverflow.com/questions/54752767/add-class-to-active-tab-add-class-inactive-to-inactive-tab
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
    
    // Funcksjon for å hente innholde fra ressurs filen
    function showCategory(index) {
        const category = resources[index];
        mainSection.innerHTML = '';
    
    //legge til tittle og tekst
        mainSection.append(
            Object.assign(document.createElement('h2'), { textContent: category.category }),
            Object.assign(document.createElement('p'), { textContent: category.text })
        );
    
    // legge till liste til ressurser
    //https://stackoverflow.com/questions/46516359/filter-serilog-logs-to-different-sinks-depending-on-context-source
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