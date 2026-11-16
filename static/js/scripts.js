

const content_dirs = { en: 'contents/', zh: 'contents/zh/' }
const config_file = 'config.yml'
const section_names = ['home', 'publications', 'awards', 'teaching', 'workinprogress', 'projects']
const supported_langs = ['en', 'zh']

// Interface text that is not in contents/*.md (nav links, section titles, abstract toggle)
const ui_text = {
    en: {
        'nav-menu': 'MENU',
        'nav-home': 'HOME',
        'nav-publications': 'PUBLICATIONS',
        'nav-awards': 'AWARDS',
        'nav-teaching': 'TEACHING',
        'nav-workinprogress': 'WORK IN PROGRESS',
        'nav-projects': 'PROJECTS',
        'publications-title': 'PUBLICATIONS',
        'awards-title': 'AWARDS',
        'teaching-title': 'TEACHING',
        'workinprogress-title': 'WORK IN PROGRESS',
        'projects-title': 'PROJECTS',
        'abstract-toggle': 'Abstract',
        'license-link': 'License',
    },
    zh: {
        'nav-menu': '菜单',
        'nav-home': '首页',
        'nav-publications': '学术论文',
        'nav-awards': '科研项目与奖励',
        'nav-teaching': '教学',
        'nav-workinprogress': '工作论文',
        'nav-projects': '项目',
        'publications-title': '学术论文',
        'awards-title': '科研项目与奖励',
        'teaching-title': '教学',
        'workinprogress-title': '工作论文',
        'projects-title': '项目',
        'abstract-toggle': '摘要',
        'license-link': '许可协议',
    },
}


// Language: ?lang= in the URL wins, then the visitor's last choice, then English
function getInitialLang() {
    const from_url = new URLSearchParams(window.location.search).get('lang');
    if (supported_langs.includes(from_url)) return from_url;
    try {
        const saved = localStorage.getItem('lang');
        if (supported_langs.includes(saved)) return saved;
    } catch (e) { }
    return 'en';
}

function rememberLang(lang) {
    try { localStorage.setItem('lang', lang); } catch (e) { }
    const url = new URL(window.location.href);
    if (lang === 'en') url.searchParams.delete('lang');
    else url.searchParams.set('lang', lang);
    history.replaceState(null, '', url.pathname + url.search + url.hash);
}


// Each <div class="abstract"> in the Markdown starts hidden; a small toggle is placed
// at the end of the citation line just before it.
function setupAbstracts(container, lang) {
    container.querySelectorAll('.abstract').forEach((abs, idx) => {
        abs.id = abs.id || container.id + '-abstract-' + idx;
        abs.hidden = true;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'abstract-toggle';
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', abs.id);
        btn.innerHTML = '[' + ui_text[lang]['abstract-toggle'] + ' <i class="bi bi-chevron-down"></i>]';
        btn.addEventListener('click', () => {
            const open = abs.hidden;
            abs.hidden = !open;
            btn.setAttribute('aria-expanded', String(open));
            btn.classList.toggle('open', open);
        });
        // Keep "[Paper] [Abstract]" together on one line
        const group = document.createElement('span');
        group.className = 'cite-links';
        let prev = abs.previousSibling;
        while (prev && prev.nodeType === Node.TEXT_NODE && !prev.textContent.trim()) prev = prev.previousSibling;
        abs.parentNode.insertBefore(group, abs);
        abs.parentNode.insertBefore(document.createTextNode(' '), group);
        if (prev && prev.nodeName === 'A') {
            group.appendChild(prev);
            group.appendChild(document.createTextNode(' '));
        }
        group.appendChild(btn);
    });
}


// Bumped on every language switch so a slow response from the previous language is dropped
let load_id = 0;

function loadConfig(lang, id) {
    fetch(content_dirs[lang] + config_file, { cache: 'no-cache' })
        .then(response => response.text())
        .then(text => {
            if (id !== load_id) return;
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                try {
                    document.getElementById(key).innerHTML = yml[key];
                } catch {
                    console.log("Unknown id and value: " + key + "," + yml[key].toString())
                }
            })
        })
        .catch(error => console.log(error));
}


function loadSections(lang, id) {
    section_names.forEach(name => {
        fetch(content_dirs[lang] + name + '.md', { cache: 'no-cache' })
            .then(response => response.text())
            .then(markdown => {
                if (id !== load_id) return;
                const container = document.getElementById(name + '-md');
                container.innerHTML = marked.parse(markdown);
                setupAbstracts(container, lang);
            }).then(() => {
                // MathJax
                if (window.MathJax && MathJax.typeset) MathJax.typeset();
            })
            .catch(error => console.log(error));
    })
}


function applyLang(lang) {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.body.classList.toggle('lang-zh', lang === 'zh');

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const text = ui_text[lang][el.dataset.i18n];
        if (text !== undefined) el.textContent = text;
    });

    document.querySelectorAll('.lang-switch button').forEach(btn => {
        const active = btn.dataset.lang === lang;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', String(active));
    });

    load_id += 1;
    loadConfig(lang, load_id);
    loadSections(lang, load_id);
}


window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Marked
    marked.use({ mangle: false, headerIds: false })

    // Language switch
    let current_lang = getInitialLang();
    document.querySelectorAll('.lang-switch button').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang === current_lang) return;
            current_lang = lang;
            rememberLang(lang);
            applyLang(lang);
        });
    });

    applyLang(current_lang);

});
