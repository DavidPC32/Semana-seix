// 1. Datos de proyectos y colores
const projects = [
    {
        title: "Apartamento Urbano",
        description: "Diseño minimalista para apartamento en la ciudad con espacios multifuncionales.",
        color: "#f0e6d2",
        img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3"
    },
    {
        title: "Casa de Playa",
        description: "Interiores luminosos y abiertos con materiales naturales y tonos neutros.",
        color: "#d8e2dc",
        img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3"
    },
    {
        title: "Loft Industrial",
        description: "Fusión entre estilo industrial y minimalismo con acentos en madera y metal.",
        color: "#e8d7f1",
        img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3"
    },
    {
        title: "Oficina en Casa",
        description: "Espacio de trabajo minimalista que promueve la concentración y creatividad.",
        color: "#d4e1ed",
        img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3"
    }
];

const trendColors = [
    { name: "Beige Moderno", code: "#f0e6d2" },
    { name: "Verde Suave", code: "#d8e2dc" },
    { name: "Lila Pastel", code: "#e8d7f1" },
    { name: "Azul Claro", code: "#d4e1ed" },
    { name: "Gris Terroso", code: "#d9d9d9" },
    { name: "Blanco Roto", code: "#f5f5f5" }
];

const styleData = {
    japones: {
        name: "Japonés (Wabi-Sabi)",
        description: "El estilo japonés o Wabi-Sabi valora la simplicidad, los materiales naturales y la belleza en la imperfección. Se caracteriza por:",
        features: [
            "Líneas limpias y muebles bajos",
            "Paleta de colores neutros y naturales",
            "Uso de materiales como madera, papel y piedra",
            "Espacios despejados y minimalistas",
            "Conexión con la naturaleza"
        ],
        examples: [
            {
                img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3",
                desc: "Sala de estar con tatami y muebles bajos"
            },
            {
                img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3",
                desc: "Dormitorio minimalista con futón"
            },
            {
                img: "https://images.unsplash.com/photo-1486946255434-2466348c2166?ixlib=rb-4.0.3",
                desc: "Baño estilo onsen con madera natural"
            }
        ]
    },
    americano: {
        name: "Americano Moderno",
        description: "El estilo americano moderno combina comodidad con elegancia. Características principales:",
        features: [
            "Muebles espaciosos y cómodos",
            "Paleta de colores cálidos y neutros",
            "Mezcla de texturas (madera, metal, tela)",
            "Espacios funcionales y familiares",
            "Toques de color en acentos"
        ],
        examples: [
            {
                img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3",
                desc: "Sala de estar amplia con sofá cómodo"
            },
            {
                img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3",
                desc: "Cocina abierta con isla central"
            },
            {
                img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3",
                desc: "Dormitorio principal con armarios empotrados"
            }
        ]
    },
    alternativo: {
        name: "Alternativo/Bohemio",
        description: "El estilo alternativo o bohemio valora la expresión personal y la creatividad. Rasgos distintivos:",
        features: [
            "Mezcla de patrones y texturas",
            "Colores vibrantes y contrastantes",
            "Muebles y decoración únicos/eclecticos",
            "Ambientes dinámicos y expresivos",
            "Objetos con historia y personalidad"
        ],
        examples: [
            {
                img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3",
                desc: "Sala con mezcla de estilos y colores"
            },
            {
                img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3",
                desc: "Dormitorio con decoración ecléctica"
            },
            {
                img: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3",
                desc: "Espacio de trabajo creativo"
            }
        ]
    }
};

// 2. Funciones de carga inicial
function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <img src="${project.img}" alt="${project.title}" class="project-img">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

function loadColorTrends() {
    const colorTrends = document.querySelector('.color-trends');
    
    trendColors.forEach(color => {
        const colorCard = document.createElement('div');
        colorCard.className = 'color-card';
        colorCard.style.backgroundColor = color.code;
        
        colorCard.innerHTML = `
            <span class="color-name">${color.name}</span>
        `;
        
        colorTrends.appendChild(colorCard);
    });
}

// 3. Funciones de la encuesta
function determineStyle(answers) {
    let counts = { japones: 0, americano: 0, alternativo: 0 };
    
    // Evaluar preferencia de colores
    if (answers.colors === "neutrales") counts.japones += 2;
    else if (answers.colors === "vibrantes") counts.alternativo += 2;
    else if (answers.colors === "oscuros") counts.alternativo += 1;
    
    // Evaluar preferencia de muebles
    if (answers.furniture === "minimalista") counts.japones += 2;
    else if (answers.furniture === "comodo") counts.americano += 2;
    else if (answers.furniture === "unico") counts.alternativo += 2;
    
    // Evaluar preferencia de atmósfera
    if (answers.atmosphere === "tranquila") counts.japones += 2;
    else if (answers.atmosphere === "acogedora") counts.americano += 2;
    else if (answers.atmosphere === "dinamica") counts.alternativo += 2;
    
    // Determinar el estilo con mayor puntaje
    const maxScore = Math.max(counts.japones, counts.americano, counts.alternativo);
    
    if (counts.japones === maxScore) return "japones";
    if (counts.americano === maxScore) return "americano";
    return "alternativo";
}

function showSurveyResult(styleKey) {
    const style = styleData[styleKey];
    const resultSection = document.getElementById('survey-result');
    
    document.getElementById('result-style').textContent = style.name;
    document.getElementById('result-description').innerHTML = `
        <p>${style.description}</p>
        <ul class="features-list">
            ${style.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
    `;
    
    document.getElementById('result-examples').innerHTML = 
        style.examples.map(example => `
            <div class="example-card">
                <img src="${example.img}" alt="${example.desc}">
                <p>${example.desc}</p>
            </div>
        `).join('');
    
    document.getElementById('style-survey').classList.add('hidden');
    resultSection.classList.remove('hidden');
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

function setupSurveyForm() {
    const form = document.getElementById('style-survey');
    const retakeBtn = document.getElementById('retake-survey');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const answers = {
            colors: form.querySelector('input[name="colors"]:checked').value,
            furniture: form.querySelector('input[name="furniture"]:checked').value,
            atmosphere: form.querySelector('input[name="atmosphere"]:checked').value
        };
        
        showSurveyResult(determineStyle(answers));
    });
    
    retakeBtn.addEventListener('click', function() {
        form.reset();
        document.getElementById('style-survey').classList.remove('hidden');
        document.getElementById('survey-result').classList.add('hidden');
    });
}

// 4. Funciones generales
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.querySelector('.hamburger').classList.remove('active');
            }
        });
    });
}

function setupPageLoad() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
}

// 5. Inicialización
document.addEventListener('DOMContentLoaded', () => {
    setupPageLoad();
    loadProjects();
    loadColorTrends();
    setupMobileMenu();
    setupSmoothScrolling();
    setupSurveyForm();
});