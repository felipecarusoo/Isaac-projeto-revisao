// High Contrast Toggle
const contrastBtn = document.getElementById('contrastBtn');
contrastBtn.addEventListener('click', function() {
    document.body.classList.toggle('high-contrast');
});

// Font Size Toggle
const fontSizeBtn = document.getElementById('fontSizeBtn');
fontSizeBtn.addEventListener('click', function() {
    const html = document.documentElement;
    const currentSize = parseFloat(window.getComputedStyle(html).fontSize);
    
    if(currentSize < 18) {
        html.style.fontSize = (currentSize + 2) + 'px';
    } else {
        html.style.fontSize = '16px';
    }
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
});

// Scroll to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
            // Close mobile menu if open
            if(!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic Navigation Background
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 100) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
});

// Form Submission
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would typically send the form data to a server
    // For demonstration, we'll just show the success modal
    successModal.classList.remove('hidden');
    
    // Reset form
    contactForm.reset();
});

closeModal.addEventListener('click', function() {
    successModal.classList.add('hidden');
});

// Close modal when clicking outside
successModal.addEventListener('click', function(e) {
    if(e.target === successModal) {
        successModal.classList.add('hidden');
    }
});

// Quiz Functionality
const quizQuestions = [
    {
        question: "Qual porcentagem da população brasileira vive em áreas urbanas?",
        options: [
            "Aproximadamente 50%",
            "Aproximadamente 75%",
            "Aproximadamente 65%",
            "Aproximadamente 86%"
        ],
        correct: 3
    },
    {
        question: "Qual destes alimentos tem o maior caminho do campo à cidade em média no Brasil?",
        options: [
            "Alface",
            "Arroz",
            "Bovinos",
            "Ovos"
        ],
        correct: 2
    },
    {
        question: "Qual tecnologia está sendo mais usada recentemente no campo?",
        options: [
            "Drones para monitoramento",
            "Tratores movidos a vapor",
            "Robôs para colheita manual",
            "Plantio em prateleiras verticais"
        ],
        correct: 0
    },
    {
        question: "Quanto em média um alimento perde de seu valor ao passar por intermediários?",
        options: [
            "5-10%",
            "15-30%",
            "40-60%",
            "70-90%"
        ],
        correct: 2
    },
    {
        question: "Qual destes não é um benefício da conexão direta entre campo e cidade?",
        options: [
            "Alimentos mais frescos",
            "Preços mais altos para o consumidor",
            "Renda mais justa para o produtor",
            "Redução de desperdício"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
const quizContainer = document.getElementById('quizContainer');
const quizQuestion = document.getElementById('quizQuestion');
const nextQuestionBtn = document.getElementById('nextQuestion');
const quizProgress = document.getElementById('quizProgress');
// const quizOptions = quizQuestion.querySelectorAll('.quiz-option'); // This line is not needed here as options are re-rendered

function loadQuestion(index) {
    const question = quizQuestions[index];
    
    quizQuestion.innerHTML = `
        <h3 class="text-xl font-bold text-primary mb-4">${index + 1}. ${question.question}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${question.options.map((option, i) => `
                <button class="quiz-option bg-white p-4 rounded-lg border border-gray-200 text-left hover:border-primary transition" data-index="${i}">${option}</button>
            `).join('')}
        </div>
    `;
    
    quizProgress.textContent = `Pergunta ${index + 1} de ${quizQuestions.length}`;
    
    if(index === quizQuestions.length - 1) {
        nextQuestionBtn.textContent = 'Finalizar';
    } else {
        nextQuestionBtn.textContent = 'Próxima';
    }
    
    // Add click event to new options
    quizQuestion.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove selection from all options
            quizQuestion.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('bg-secondary', 'text-white');
            });
            
            // Add selection to clicked option
            this.classList.add('bg-secondary', 'text-white');
        });
    });
}

nextQuestionBtn.addEventListener('click', function() {
    currentQuestion++;
    
    if(currentQuestion < quizQuestions.length) {
        loadQuestion(currentQuestion);
    } else {
        // Quiz finished
        quizContainer.innerHTML = `
            <div class="text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-check-circle text-primary text-3xl"></i>
                </div>
                <h3 class="text-xl font-bold text-primary mb-2">Quiz Concluído!</h3>
                <p class="text-gray-600 mb-6">Obrigado por testar seus conhecimentos sobre a conexão entre campo e cidade.</p>
                <button id="restartQuiz" class="bg-primary hover:bg-dark text-white font-bold py-2 px-6 rounded-full transition">Refazer Quiz</button>
            </div>
        `;
        
        document.getElementById('restartQuiz').addEventListener('click', function() {
            currentQuestion = 0;
            loadQuestion(0);
        });
    }
});

// Load first question
loadQuestion(0);

// Intersection Observer for Section Animations
const sections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
            sectionObserver.unobserve(entry.target);
        }
    });
}, {threshold: 0.1});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Load More Gallery Items
const loadMoreBtn = document.getElementById('loadMoreGallery');
if(loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        alert('Mais itens seriam carregados aqui em uma implementação completa!');
    });
}

// Share Your Story Button
const shareStoryBtn = document.getElementById('shareYourStory');
if(shareStoryBtn) {
    shareStoryBtn.addEventListener('click', function() {
        window.location.href = '#contact';
    });
}

// Focus styles for keyboard navigation
document.addEventListener('keyup', function(e) {
    if(e.key === 'Tab') {
        document.body.classList.add('user-tabbing');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('user-tabbing');
});