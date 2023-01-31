class Question {
  constructor(text, choix, reponse) {
    this.text = text;
    this.choix = choix;
    this.reponse = reponse;
  }
  reponseCorrecte(choix) {
    return this.reponse === choix;
  }
}
let questions = [
  new Question("Lequel de ces artistes possède le plus grand nombre de certification ?", ["Damso", "Dinos", "Oboy", "Josman"], "Damso"),
  new Question("Qui a écrit le titre Helsinki ?", ["SCH","Nekfeu", "Dinos", "Johnny Hallyday"], "Dinos"),
  new Question("Quel titre d'OBOY est certifié Single de Diamant ?", ["Nuit", "TDB", "Cabeza","Avec Toi"], "TDB"),
  new Question("Quel est l'album le plus certifié ?", ["Taciturne", "Fame", "JO$", "Ipséité"], "Ipséité"),
  new Question("En quelle année est sorti Taciturne de Dinos ?", ["2017","2018","2019","2020"], "2019")
];

console.log(questions);

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(reponse) {
    if (this.getCurrentQuestion().reponseCorrecte(reponse)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}
const display = {
  elementShown: function(id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  endQuiz: function() {
    endQuizHTML = `
      <h1>Quiz terminé ! Bravo !</h1>
      <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
    this.elementShown("quiz", endQuizHTML);
  },
  question: function() {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choix: function() {
    let choix = quiz.getCurrentQuestion().choix;

    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function() {
        quiz.guess(guess);
        quizApp();
      }
    }
    for(let i = 0; i < choix.length; i++) {
      this.elementShown("choix" + i, choix[i]);
      guessHandler("guess" + i, choix[i]);
    }
  },
  progress: function() {
    let currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.elementShown("progress",+ currentQuestionNumber + "/" + quiz.questions.length);
  },
};

quizApp = () => {
  if (quiz.hasEnded()) {
    display.endQuiz();
  } else {
    display.question();
    display.choix();
    display.progress();
  } 
}
let quiz = new Quiz(questions);
quizApp();

console.log(quiz);

