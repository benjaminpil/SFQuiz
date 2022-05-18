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
        startButton.innerText = "Restart"
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
        question: 'What is 5 * 5?',
        answers: [
            {text: '25', correct: true},
            {text: '5', correct: false},
            {text: '8', correct: false},
            {text: 'idk', correct: false},
        ]
    },
    {
        question: 'What is 1 + 1?',
        answers: [
            {text: '2', correct: true},
            {text: '8', correct: false},
            {text: 'give me fun questions', correct: false},
            {text: 'I should go to bed', correct: false},
        ]
    }
]

