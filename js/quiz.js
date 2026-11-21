(function () {
  var mount = document.getElementById("quiz");
  if (!mount || !window.QUIZ) return;

  var questions = window.QUIZ.questions;
  var index = 0;
  var score = 0;
  var answered = false;

  function render() {
    if (index >= questions.length) {
      renderResult();
      return;
    }

    var item = questions[index];
    var progress = Math.round((index / questions.length) * 100);

    mount.innerHTML =
      '<div class="quiz-top">' +
        '<span>Question ' + (index + 1) + " of " + questions.length + "</span>" +
        '<span class="score">⭐ Score: ' + score + "</span>" +
      "</div>" +
      '<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + progress + '">' +
        "<span></span>" +
      "</div>" +
      '<p class="question">' + item.q + "</p>" +
      '<div class="options">' +
        item.options.map(function (text, i) {
          return '<button class="option" type="button" data-i="' + i + '">' + text + "</button>";
        }).join("") +
      "</div>" +
      '<p class="feedback" aria-live="polite"></p>' +
      '<div class="quiz-actions"><button class="btn" type="button" id="quiz-next" hidden>Next</button></div>';

    mount.querySelector(".progress > span").style.width = progress + "%";

    var optionButtons = mount.querySelectorAll(".option");
    optionButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        choose(parseInt(btn.dataset.i, 10), item, optionButtons);
      });
    });

    var next = document.getElementById("quiz-next");
    next.addEventListener("click", function () {
      index += 1;
      answered = false;
      render();
    });

    document.getElementById("quiz-next").hidden = true;
    answered = false;
  }

  function choose(choice, item, optionButtons) {
    if (answered) return;
    answered = true;

    var feedback = mount.querySelector(".feedback");
    optionButtons.forEach(function (btn, i) {
      btn.disabled = true;
      if (i === item.answer) btn.classList.add("correct");
    });

    if (choice === item.answer) {
      score += 1;
      feedback.textContent = "✅ Yes! " + item.why;
      feedback.className = "feedback good";
    } else {
      optionButtons[choice].classList.add("wrong");
      feedback.textContent = "❌ Not quite. " + item.why;
      feedback.className = "feedback bad";
    }

    mount.querySelector(".score").textContent = "⭐ Score: " + score;

    var next = document.getElementById("quiz-next");
    next.hidden = false;
    next.textContent = index === questions.length - 1 ? "See my score" : "Next";
    next.focus();
  }

  function renderResult() {
    var total = questions.length;
    var emoji = "🌱";
    var message = "Good start! Read the lessons again, then try once more.";
    if (score === total) {
      emoji = "🏆";
      message = "Perfect score! You are a superstar!";
    } else if (score >= Math.ceil(total * 0.7)) {
      emoji = "🎉";
      message = "Great job! You know a lot about " + window.QUIZ.subject + "!";
    } else if (score >= Math.ceil(total * 0.4)) {
      emoji = "😊";
      message = "Nice try! A little practice and you will get them all.";
    }

    mount.innerHTML =
      '<div class="result">' +
        '<span class="result-emoji">' + emoji + "</span>" +
        "<h3>You scored " + score + " out of " + total + "!</h3>" +
        "<p>" + message + "</p>" +
        '<button class="btn" type="button" id="quiz-retry">Play again 🔁</button> ' +
        '<a class="btn btn-ghost" href="index.html">Back to subjects</a>' +
      "</div>";

    document.getElementById("quiz-retry").addEventListener("click", function () {
      index = 0;
      score = 0;
      answered = false;
      render();
    });
  }

  render();
})();
