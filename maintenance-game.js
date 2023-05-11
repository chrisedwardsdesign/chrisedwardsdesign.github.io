document.addEventListener("DOMContentLoaded", function() {
  const contMove = document.getElementById("contMove");
  const contParent = document.getElementById("contParent");

//   const storedColors = ["#f000ff", "#001eff", "#FF5F1F", "#FFFFFF"]; // pink, blue, orange, white
  const storedColors = ["#FFFFFF","#001eff"]; // white, blue
  const storedWords = ["DESIGN", "ANIMATION", "UX", "CODE", "COMING SOON"];

  let lastColor;
  let lastWord;
  let autoAnimateTimeout;
  let isFirstRandomWord = true; // Add a flag to check if it's the first time the function is called
  let isFirstRandomColor = true; // Add a flag to check if it's the first time the function is called

function clickRandomColor() {
  const white = "#FFFFFF";
  let randomColor;
  
  // Exclude the last color in the array if it's the first time the function is called
  if (isFirstRandomColor) {
    randomColor = storedColors[Math.floor(Math.random() * (storedColors.length - 1))];
    isFirstRandomColor = false;
  } else {
    randomColor = storedColors[Math.floor(Math.random() * storedColors.length)];
  }

  if (randomColor === lastColor) {
    return clickRandomColor();
  }

  lastColor = randomColor;
  contMove.style.backgroundColor = randomColor;

  if (randomColor === white) {
    contMove.style.color = "#000000"; // set text color to black
  } else {
    contMove.style.color = "#FFFFFF"; // set text color to white
  }
}

function clickRandomWord() {
  let randomWord;
  
  // Exclude the last word in the array if it's the first time the function is called
  if (isFirstRandomWord) {
    randomWord = storedWords[Math.floor(Math.random() * (storedWords.length - 1))];
    isFirstRandomWord = false;
  } else {
    randomWord = storedWords[Math.floor(Math.random() * storedWords.length)];
  }

  if (randomWord === lastWord) {
    return clickRandomWord();
  }

  lastWord = randomWord;
  contMove.textContent = randomWord;
}

  function randomMove() {
    let x = Math.floor(Math.random() * (contParent.offsetWidth - contMove.offsetWidth));
    let y = Math.floor(Math.random() * (contParent.offsetHeight - contMove.offsetHeight));
    let rotation = Math.floor(Math.random() * 90) - 45; // select random rotation angle between -45 and 45 degrees
    contMove.style.left = x + "px";
    contMove.style.top = y + "px";
    contMove.style.transform = "rotate(" + rotation + "deg)"; // apply rotation to element
  };

  function startAutoAnimate() {
  autoAnimateTimeout = setTimeout(function() {
    contMove.classList.add("hidden"); // add 'hidden' class to element
    setTimeout(function() { // wait for transition to complete
      clickRandomColor();
      clickRandomWord();
      randomMove();
      contMove.classList.remove("hidden"); // remove 'hidden' class from element
    }, 200);
    startAutoAnimate();
  }, 2500);
}

  contMove.addEventListener("click", function() {
    clearTimeout(autoAnimateTimeout);
    contMove.style.visibility = "visible"; // set visibility property to "visible"
    contMove.classList.add("hidden"); // add 'hidden' class to element
    setTimeout(function() { // wait for transition to complete
      clickRandomColor();
      clickRandomWord();
      randomMove();
      contMove.classList.remove("hidden"); // remove 'hidden' class from element
      startAutoAnimate();
    }, 200);
  });

  contMove.style.visibility = "visible"; // set visibility property to "visible"
  startAutoAnimate();
});

// modal slide
document.addEventListener("DOMContentLoaded", function() {
  const formTrigger = document.getElementById('formTriggerOpen'),
    formTriggerTwo = document.getElementById('formTriggerTwo'),
    formPosition = document.getElementById('formPosition'),
    burgerOpen = document.getElementById('burgerOpen'),
    burgerClose = document.getElementById('burgerClose'),
    closeMinus = document.getElementById('closeMinus'),
    minusClose = document.getElementById('minusClose'),
    formOverlay = document.getElementById('formOverlay');

  function formToggle() {  
    formPosition.classList.toggle('form-slide-left');
    formOverlay.classList.toggle('form-hide');
    burgerOpen.classList.toggle('svg-hide');
    burgerClose.classList.toggle('svg-hide');
    closeMinus.classList.toggle('svg-hide');
    minusClose.classList.toggle('svg-hide');
  }

  formTrigger.addEventListener('click', formToggle);
  formOverlay.addEventListener('click', formToggle);
  formTriggerTwo.addEventListener('click', formToggle);

  // form
  document.querySelector("#formPosition").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var formData = new FormData(this);
    var submitButton = document.querySelector("#maintenance--form-submit");
    
    fetch(this.action, {
      method: this.method,
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    }).then(response => {
      if (response.ok) {
        submitButton.textContent = "Message sent!";
        this.reset();
        // Wait for 2 seconds, then close the form
        setTimeout(formToggle, 2000);
      } else {
        throw new Error('Form submission failed');
      }
    }).catch(error => {
      submitButton.textContent = "Error!";
      console.error(error);
    });
  });
  
})

// marquee
// Wait for the HTML document to load before executing any JavaScript code
document.addEventListener("DOMContentLoaded", function() {
  const marqueeText1 = document.getElementById("formTitleMarquee");
  const marqueeContainer = document.querySelector(".maintenance--marquee-container");
  let marqueeTextWidth = marqueeText1.offsetWidth;
  let marqueeParentWidth = marqueeContainer.offsetWidth;

  animate(marqueeText1, marqueeContainer);

  function animate(element, container) {
    let baseValue = 0;
    function step() {
      baseValue -= 1.5; // decrease baseValue by 2 pixels on each frame
      element.style.marginLeft = baseValue + "px";
      if (baseValue <= -marqueeTextWidth) {
        baseValue = marqueeParentWidth;
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  window.addEventListener("resize", function() {
    marqueeTextWidth = marqueeText1.offsetWidth;
    marqueeParentWidth = marqueeContainer.offsetWidth;
  });
});

// countdown timer
// Set the date and time to count down to
const countdownDate = new Date("2023-05-15T23:59:59Z").getTime();

// Update the countdown every second
const countdownInterval = setInterval(function() {

  // Get the current date and time
  const now = new Date().getTime();

  // Calculate the difference between the countdown date and the current date
  const distance = countdownDate - now;

  // Calculate the time remaining in days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update the countdown timer elements with the time remaining
  const countdownTimerDesk = document.getElementById("countdownTimerDesk");
  countdownTimerDesk.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  const countdownTimerMob = document.getElementById("countdownTimerMob");
  countdownTimerMob.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  // If the countdown has ended, display a message and clear the countdown interval
  if (distance < 0) {
    clearInterval(countdownInterval);
    countdownTimerDesk.textContent = "EXPIRED";
    countdownTimerMob.textContent = "EXPIRED";
  }
}, 1000);
