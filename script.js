const startButton = document.getElementById('start-button')
const nextButton = document.getElementById('next-button')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffleQuestions, currentQuestionIndex

startButton.addEventListener('click', start)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function start(){
    console.log("Started")
    startButton.classList.add('hidden')
    shuffleQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hidden')
    setNextQuestion()
}

function setNextQuestion(){
    reset()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('button')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function reset(){
    clearStatusClass(document.body)
    nextButton.classList.add('hidden')
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestionIndex +1){
        nextButton.classList.remove('hidden')
    } else {
        startButton.innerText = "Thank you! Click here to restart"
        startButton.classList.remove('hidden')
    }

    
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What do I do in my free time besides surfing the web?',
        answers: [
            {text: 'Climbing', correct: false},
            {text: 'Sleeping', correct: false},
            {text: 'Surfing waves', correct: true},
            {text: 'Running', correct: false},
        ]
    },
    {
        question: 'Which of these describe me?',
        answers: [
            {text: 'Team player', correct: true},
            {text: 'Eager to learn', correct: true},
            {text: 'Positive attitude', correct: true},
            {text: 'Critical thinker', correct: true},
        ]
    },
    {
        question: 'Where do I see myself in a few years?',
        answers: [
            {text: 'In my current comfort zone', correct: false},
            {text: 'On the other side of this interview', correct: false},
            {text: 'As an experience software engineer continously learning new things', correct: true},
            {text: 'Stuck in tutorial hell', correct: false},
        ]
    },
    {
        question: 'Which characteristic trait defines me the most?',
        answers: [
            {text: 'Humoristic', correct: false},
            {text: 'Optimistic', correct: false},
            {text: 'Enthousiastic', correct: false},
            {text: 'Hands on mentality', correct: true},
        ]
    },
    {
        question: 'What is my motivation to become a software engineer?',
        answers: [
            {text: 'Have challenging tasks where I can have a meaningful impact', correct: true},
            {text: 'Earn more money', correct: false},
            {text: 'To brag at the yearly family meetup', correct: false},
            {text: 'I like computers', correct: false},
        ]
    }
]

