let user = {
    name: '',
    currentQuestion: 0,
    score: 0
}

let selected = '', intervalId

const questions = [
    { question: "Which among the following language is oldest among the cosmos?", options: ["Java", "Kotlin", "Dart", "Swift"], correct: "Java" },

    { question: "Which of the following is front-end language?", options: ["Java", "Python", "Javascript", "C++"], correct: "Javascript" },

    { question: "Which of the following is back-end language?", options: ["HTML", "CSS", "SCSS", "Python"], correct: "Python" },

    { question: "Which of the following is Markup language?", options: ["HTML", "C++", "Javascript", "Java"], correct: "HTML" },

    { question: "Which of the following is Scripting language?", options: ["Kotlin", "Javascript", "C++", "Java"], correct: "Javascript" },

    { question: "In C a preprocessor directive is a statement that begins with_____", options: ["/", "#", "/*", "*"], correct: "#" },

    { question: "In C which character always ends a statement?", options: [";", "+", "/*", ")"], correct: ";" },

    { question: "JavaScript is a ___ -side programming language.", options: ["Client", "Server", "Both", "None"], correct: "Both" },

    { question: "How do you find the minimum of x and y using JavaScript?", options: ["min(x,y);", "Math.min(x,y)", "Math.min(xy)", "min(xy);"], correct: "Math.min(x,y)" },

    { question: "Which JavaScript label catches all the values, except for the ones specified?", options: ["catch", "label", "try", "default"], correct: "default" }
]

const loginScreenBtn = document.querySelector('.login-screen__button')
const loginScreenInput = document.getElementById('input')
const quizScreenSubmitButton = document.querySelector('.quiz__screen__button')
const options = document.querySelectorAll('.opt')
const timer = document.querySelector('.quiz-screen__timer')

loginScreenInput.addEventListener('input', () => {
    if(loginScreenInput.value === ''){
        loginScreenBtn.classList.remove('quiz__screen__button__active')
    }else{
        loginScreenBtn.classList.add('quiz__screen__button__active')
    }
})

loginScreenBtn.addEventListener('click', () => {

    if (loginScreenInput.value === '') {
        alert('Please Enter Username!')
        return
    }

    document.querySelector('.login-screen').style.display = 'none'
    document.querySelector('.quiz-screen').style.display = 'block'

    user.name = loginScreenInput.value
    loginScreenInput.value = ''
    loadQuestion()

})

const loadQuestion = () => {

    startTimer()
    saveInLocal()

    if (user.currentQuestion === 10) {
        localStorage.removeItem('quizApp')
        clearInterval(intervalId)
        document.querySelector('.quiz-screen').style.display = 'none'

        if (user.score > 5) {
            document.querySelector('.passed-screen').style.display = 'grid'
            document.getElementById('p_score').textContent = user.score
            document.getElementById('p-user').textContent = user.name
        } else {
            document.querySelector('.fail-screen').style.display = 'grid'
            document.getElementById('f_score').textContent = user.score
            document.getElementById('f-user').textContent = user.name
        }

        return
    }

    const question = document.querySelector('.quiz__question')
    const opt1 = document.querySelector('.opt--1')
    const opt2 = document.querySelector('.opt--2')
    const opt3 = document.querySelector('.opt--3')
    const opt4 = document.querySelector('.opt--4')

    document.querySelector('.quiz-screen__question-no').textContent = `${user.currentQuestion + 1}/10`

    selected = ''

    const currentQues = questions[user.currentQuestion]

    question.textContent = currentQues.question
    opt1.textContent = currentQues.options[0]
    opt2.textContent = currentQues.options[1]
    opt3.textContent = currentQues.options[2]
    opt4.textContent = currentQues.options[3]
}

quizScreenSubmitButton.addEventListener('click', (e) => {

    if (!e.target.classList.contains('quiz__screen__button__active'))
        return

    if (selected === questions[user.currentQuestion].correct)
        user.score += 1

    user.currentQuestion += 1
    e.target.classList.remove('quiz__screen__button__active')
    options.forEach(option => option.classList.remove('opt__active'))
    loadQuestion()
})

options.forEach(opt => opt.addEventListener('click', (e) => {
    options.forEach(option => option.classList.remove('opt__active'))
    e.target.classList.add('opt__active')

    selected = e.target.textContent

    document.querySelector('.quiz__screen__button').classList.add('quiz__screen__button__active')
}))

document.querySelector('.fail-screen__return_button').addEventListener('click', () => {
    location.reload();
})

document.querySelector('.passed-screen__return_button').addEventListener('click', () => {
    location.reload();
})

const startTimer = () => {
    clearInterval(intervalId)
    let time = 60
    intervalId = setInterval(() => {
        time--
        timer.textContent = `00:${time}`
        if(time === 0){
            clearInterval(intervalId)
            timeOut()
        }
    }, 1000);
}

const timeOut = () => {
    user.currentQuestion += 1
    document.querySelector('.quiz-screen__question-no').textContent = `${user.currentQuestion + 1}/10`
    options.forEach(option => option.classList.remove('opt__active'))
    loadQuestion()
}

const saveInLocal = () => {
    localStorage.setItem("quizApp", JSON.stringify(user))
}

if(localStorage.getItem("quizApp")){
    user = JSON.parse(localStorage.getItem("quizApp"))
    console.log(user);

    document.querySelector('.login-screen').style.display = 'none'
    document.querySelector('.quiz-screen').style.display = 'block'
    loadQuestion()
}