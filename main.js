document.addEventListener('DOMContentLoaded', function() {
  const creditsLink = document.getElementById('creditsLink');
  const creditsMessageToggle = document.getElementById('creditsMessageToggle');
  const creditsMessageOpen = document.getElementById('creditsMessageOpen');
  const creditsMessageClose = document.getElementById('creditsMessageClose');
  const creditsOverlay = document.getElementById('creditsOverlay');
  const creditsContent = document.getElementById('creditsContent');

  creditsLink.addEventListener('click', function(event) {
    event.preventDefault();
    creditsOverlay.classList.toggle('show');
    creditsContent.classList.toggle('show');
    creditsMessageOpen.classList.toggle('svg-hide');
    creditsMessageClose.classList.toggle('svg-hide');
  });

  function creditsToggle() {  
    creditsMessageOpen.classList.toggle('svg-hide');
    creditsMessageClose.classList.toggle('svg-hide');
    setTimeout(function() {
      creditsOverlay.classList.toggle('show');
      creditsContent.classList.toggle('show');
    }, 50);
  }

  creditsMessageToggle.addEventListener('click', creditsToggle);
  creditsOverlay.addEventListener('click', creditsToggle);
});

document.addEventListener('DOMContentLoaded', function() {
  const copyrightLinkMob = document.getElementById('copyrightLinkMob');
  const copyrightLink = document.getElementById('copyrightLink');
  const copyrightMessageToggle = document.getElementById('copyrightMessageToggle');
  const copyrightMessageOpen = document.getElementById('copyrightMessageOpen');
  const copyrightMessageClose = document.getElementById('copyrightMessageClose');
  const copyrightOverlay = document.getElementById('copyrightOverlay');
  const copyrightContent = document.getElementById('copyrightContent');

  copyrightLink.addEventListener('click', function(event) {
    event.preventDefault();
    copyrightOverlay.classList.toggle('show');
    copyrightContent.classList.toggle('show');
    copyrightMessageOpen.classList.toggle('svg-hide');
    copyrightMessageClose.classList.toggle('svg-hide');
  });

  copyrightLinkMob.addEventListener('click', function(event) {
    event.preventDefault();
    copyrightOverlay.classList.toggle('show');
    copyrightContent.classList.toggle('show');
    copyrightMessageOpen.classList.toggle('svg-hide');
    copyrightMessageClose.classList.toggle('svg-hide');
  });

  function creditsToggle() {  
    copyrightMessageOpen.classList.toggle('svg-hide');
    copyrightMessageClose.classList.toggle('svg-hide');
    setTimeout(function() {
      copyrightOverlay.classList.toggle('show');
      copyrightContent.classList.toggle('show');
    }, 50);
  }

  copyrightMessageToggle.addEventListener('click', creditsToggle);
  copyrightOverlay.addEventListener('click', creditsToggle);
});


document.addEventListener('DOMContentLoaded', function() {
  const centerElement = document.getElementById('logotypeSvgWidthCenter');
  const topElement = document.getElementById('logotypeSvgWidthTop');
  const bottomElement = document.getElementById('logotypeSvgWidthBottom');
  
  // Update centerElement width and height
  centerElement.style.width = '100%';
  centerElement.style.height = 'fit-content';

  function updateHeight() {
    const centerHeight = window.getComputedStyle(centerElement).height;
    topElement.style.height = centerHeight;
    bottomElement.style.height = centerHeight;
  }

  // Initial height update
  updateHeight();

  // Recalculate height on window resize
  window.addEventListener('resize', updateHeight);
});

// video
document.addEventListener("DOMContentLoaded", function() {
  let playButton = document.getElementById("play-button");
  let video = document.getElementById("video");

  playButton.addEventListener("click", playVideo);

  function playVideo() {
    playButton.style.display = "none";
    video.style.display = "block";
    video.play();
  }
});

document.addEventListener("DOMContentLoaded", function() {
  let element = document.getElementById('two-column--container');
  let footer = document.getElementById('footer--container');
  let scrollThresholdPercentage = 0.1; // Adjust this value to set the scroll threshold percentage
  let resizeTimer;

  function updateElementPosition() {
    let scrollThreshold = window.innerHeight * scrollThresholdPercentage;

    if (window.pageYOffset >= scrollThreshold) {
      element.style.position = 'relative';
      element.style.top = '1px';
      element.style.borderBottom = 'var(--section-border-width) solid var(--color-primary)';
    } else {
      element.style.position = 'sticky';
      element.style.top = '0';
      // element.style.paddingTop = '1rem';
      element.style.borderBottom = 'none';
    }
    
    // Update footer position
    footer.style.position = 'sticky';
    footer.style.bottom = '0';
  }

  function handleWindowResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      updateElementPosition();
    }, 200); // Adjust the delay as needed (in milliseconds)
  }

  window.addEventListener('scroll', updateElementPosition);
  window.addEventListener('resize', handleWindowResize);

  // Initial position update on page load
  updateElementPosition();
});

// header
document.addEventListener("DOMContentLoaded", function() {
  const headerContainer = document.getElementById('header--container');
  const pageWrapper = document.getElementById('page-wrapper');
  let previousScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  let isScrollingUp = false;
  let timeout;

  window.addEventListener('scroll', function() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPositionChange = currentScrollPosition - previousScrollPosition;

    if (scrollPositionChange < -6) {
      // Scrolling up
      if (!isScrollingUp) {
        headerContainer.style.zIndex = '8';
        headerContainer.style.opacity = '1';
        headerContainer.style.borderBottom = 'var(--section-border-width) solid var(--color-primary)'; // add border-bottom
        pageWrapper.style.position = 'relative'; // move down 1px account for border-bottom overlap
        pageWrapper.style.top = 'var(--section-border-width-minus)'; // move down 1px account for border-bottom overlap
        isScrollingUp = true;
      }
    } else if (scrollPositionChange > 2) {
      // Scrolling down
      headerContainer.style.zIndex = '0';
      headerContainer.style.opacity = '0';
      headerContainer.style.borderBottom = 'none'; // add border-bottom
      pageWrapper.style.position = 'relative'; // move down 1px account for border-bottom overlap
      isScrollingUp = false;

      // Clear any previously scheduled timeout
      clearTimeout(timeout);

      // Add a timeout function to bring the header back to opacity 1
      timeout = setTimeout(() => {
        headerContainer.style.opacity = '1';
      }, 150); // Adjust the delay (in milliseconds) as per your preference
    }

    previousScrollPosition = currentScrollPosition;
  });
});

// dark / light mode
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('toggleBtn').addEventListener('click', function() {
    const body = document.querySelector('body');
    const themeStyle = document.getElementById('theme-style');
    const darkText = document.getElementById('darkText');
    const lightText = document.getElementById('lightText');
    const ledRight = document.getElementById('ledRight');
    const ledLeft = document.getElementById('ledLeft');
  
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');
    darkText.classList.toggle('toggle-text-switch');
    lightText.classList.toggle('toggle-text-switch');
    ledRight.classList.toggle('mode-switch--btn--visible');
    ledLeft.classList.toggle('mode-switch--btn--visible');
  
    if (body.classList.contains('dark-mode')) {
      themeStyle.href = 'styles/dark-theme.css';
    } else {
      themeStyle.href = 'styles/light-theme.css';
    }
  });
});

//nav height calc
document.addEventListener("DOMContentLoaded", function() {
  const navBar = document.getElementById('navBar');
  const navBarHeight = navBar.offsetHeight;

  console.log('Navigation bar height:', navBarHeight);
});

// game
document.addEventListener("DOMContentLoaded", function() {
  const contMove = document.getElementById("contMove");
  const contGame = document.getElementById("contGame");

//   const storedColors = ["#f000ff", "#001eff", "#FF5F1F", "#FFFFFF"]; // pink, blue, orange, white
  const storedColors = ["var(--color-primary)","var(--color-highlight-1)"]; // white, blue
  const storedWords = ["DESIGN", "ANIMATION", "UX", "CODE", "COMING SOON"];

  let lastColor;
  let lastWord;
  let autoAnimateTimeout;
  let isFirstRandomWord = true; // Add a flag to check if it's the first time the function is called
  let isFirstRandomColor = true; // Add a flag to check if it's the first time the function is called

  function clickRandomColor() {
    const white = "var(--color-primary)";
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
      contMove.style.color = "var(--color-secondary)"; // set text color to black
    } else {
      contMove.style.color = "var(--color-game-text-1)"; // set text color to white
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
      let x = Math.floor(Math.random() * (contGame.offsetWidth - contMove.offsetWidth));
      let y = Math.floor(Math.random() * (contGame.offsetHeight - contMove.offsetHeight));
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
    formTriggerThree = document.getElementById('formTriggerThree'),
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
  formTriggerThree.addEventListener('click', formToggle);

  // form
  document.querySelector("#formPosition").addEventListener("submit", function(event) {
    event.preventDefault();
  
    var formElement = event.target; // Get the form element
    if (!(formElement instanceof HTMLFormElement)) {
      console.error("Element is not a form.");
      return;
    }
  
    var formData = new FormData(formElement);
    var submitButton = document.querySelector("#maintenance--form-submit");
  
    fetch(formElement.action, {
      method: formElement.method,
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    }).then(response => {
      if (response.ok) {
        submitButton.textContent = "Message sent!";
        formElement.reset();
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
  
});

// marquee
document.addEventListener("DOMContentLoaded", function() {
  const marqueeText1 = document.getElementById("formTitleMarquee");
  const marqueeContainer = document.querySelector(".maintenance--marquee-container");
  let marqueeTextWidth = marqueeText1.offsetWidth;
  let marqueeParentWidth = marqueeContainer.offsetWidth;

  animate(marqueeText1, marqueeContainer);

  function animate(element, container) {
    let baseValue = 0;
    function step() {
      baseValue -= 2; // decrease baseValue by 2 pixels on each frame
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
document.addEventListener("DOMContentLoaded", function() {
  // Countdown timer for desktop
  const countdownDateDesktop = new Date("2023-05-26T23:59:59Z").getTime();
  const countdownTimerDesktop = document.getElementById("countdownTimerDesktop");

  setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDateDesktop - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countdownTimerDesktop.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
      clearInterval(countdownIntervalDesktop);
      countdownTimerDesktop.textContent = "EXPIRED";
    }
  }, 1000);

  // Countdown timer for mobile
  const countdownDateMobile = new Date("2023-05-26T23:59:59Z").getTime();
  const countdownTimerMobile = document.getElementById("countdownTimerMobile");

  setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDateMobile - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countdownTimerMobile.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
      clearInterval(countdownIntervalMobile);
      countdownTimerMobile.textContent = "EXPIRED";
    }
  }, 1000);
});
