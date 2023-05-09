document.addEventListener("DOMContentLoaded", function() {
    const contMove = document.getElementById("contMove");
    const contParent = document.getElementById("contParent");
  
    const storedColors = ["#f000ff", "#001eff", "#FF5F1F", "#FFAD00"];
    const storedWords = ["DESIGN", "UX", "CODE", "COMING SOON"];
  
    let lastColor;
    let lastWord;
  
    function clickRandomColor() {
      let randomColor = storedColors[Math.floor(Math.random() * storedColors.length)];
  
      if (randomColor === lastColor) {
        return clickRandomColor();
      }
  
      lastColor = randomColor;
      contMove.style.backgroundColor = randomColor;
    }
  
    function clickRandomWord() {
      let randomWord = storedWords[Math.floor(Math.random() * storedWords.length)];
  
      if (randomWord === lastWord) {
        return clickRandomWord();
      }
  
      lastWord = randomWord;
      contMove.textContent = randomWord;
    }
  
    function randomMove() {
      let x = Math.floor(Math.random() * (contParent.offsetWidth - contMove.offsetWidth));
      let y = Math.floor(Math.random() * (contParent.offsetHeight - contMove.offsetHeight));
      contMove.style.left = x + "px";
      contMove.style.top = y + "px";
    };
  
    contMove.addEventListener("click", function() {
      contMove.classList.add("hidden"); // add 'hidden' class to element
      setTimeout(function() { // wait for transition to complete
        clickRandomColor();
        clickRandomWord();
        randomMove();
        contMove.classList.remove("hidden"); // remove 'hidden' class from element
      }, 250);
    });
  });
  
