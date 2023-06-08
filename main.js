// about me
document.addEventListener('DOMContentLoaded', function() {
  const aboutTrigger = document.getElementById('aboutTrigger');
  const aboutTriggerLogoHome = document.getElementById('aboutTriggerLogoHome');
  const sectionContent = document.getElementById('sectionContent');
  let timeOutAbout;

  const toggleContent = function() {
    if (window.innerWidth >= 640 && window.innerWidth <= 1360) {
      // Toggle the clicked item
      if (sectionContent.style.maxHeight && sectionContent.style.maxHeight !== "0px") {
        sectionContent.style.maxHeight = "0px";
        clearTimeout(timeOutAbout); // Clear any existing timeouts to avoid conflicts
        timeOutAbout = setTimeout(() => {
          sectionContent.style.display = "none";
        }, 250); // Use at least your transition time
      } else {
        clearTimeout(timeOutAbout); // Clear any existing timeouts to avoid conflicts
        sectionContent.style.display = "grid";
        timeOutAbout = setTimeout(() => {
          sectionContent.style.maxHeight = sectionContent.scrollHeight + "px";
        }, 10); // No need to delay the max-height change
      }
    }
  }

  aboutTrigger.addEventListener('click', toggleContent);
  aboutTriggerLogoHome.addEventListener('click', toggleContent);
  
  window.addEventListener('resize', function() {
    if (window.innerWidth < 640 || window.innerWidth > 1360) {
      // Ensure content is visible when out of range
      sectionContent.style.display = "none";
      sectionContent.style.maxHeight = null;
    } else {
      // Reapply the click function logic
      toggleContent();
    }
  });
});

//splide video
document.addEventListener('DOMContentLoaded', function() {
  const splide = new Splide('.splide', {
    type: 'loop',
    perPage: 1,
    autoplay: true,
    speed: 1500,
    interval: 7000,
    pauseOnHover: false,
    pauseOnFocus: false,
    resetProgress: false,
    arrows: true,
    video: {
      loop: true,
      mute: true,
      autoplay: true,
      hideControls: true,
      disableOverlayUI: true,
      playsInline: true,
      playerOptions: {
        htmlVideo: {
          autoplay: true,
          // controls: true,
          // crossOrigin: true,
          // currentTime: true,
          // disablePictureInPicture: true,
          // disableRemotePlayback: true,
          height: true,
          loop: true,
          muted: true,
          // playbackRate: true,
          playsInline: true,
          // preload: true,
          width: true,
          volume: false
        }
      }
    },
  }).mount(window.splide.Extensions);

  // Function to create custom content
  function createCustomContent() {
    var playButton = document.createElement('div');
    playButton.id = 'play-button';
    playButton.className = 'play-button uppercase';

    var svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElem.setAttributeNS(null, 'width', '9');
    svgElem.setAttributeNS(null, 'height', '17');
    svgElem.setAttributeNS(null, 'viewBox', '0 0 9 17');
    svgElem.setAttributeNS(null, 'fill', 'inherit');

    var pathElem = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathElem.setAttributeNS(null, 'd', 'M0.0415039 0.351562L8.0415 8.35156L0.0415039 16.3516');
    pathElem.setAttributeNS(null, 'fill', 'inherit');

    svgElem.appendChild(pathElem);
    playButton.appendChild(svgElem);

    var textContainer = document.createElement('span');
    textContainer.className = 'text-container';

    var oldText = document.createElement('span');
    oldText.className = 'old-text';
    oldText.innerText = 'Play';

    var newText = document.createElement('span');
    newText.className = 'new-text';
    newText.innerText = 'Play';

    textContainer.appendChild(oldText);
    textContainer.appendChild(newText);

    playButton.appendChild(textContainer);

    return playButton;
  }

  // Get all the .splide__video__play elements
  var splideVideoPlayElements = document.querySelectorAll('.splide__video__play');

  // Loop over the elements and append the custom content to each
  splideVideoPlayElements.forEach(function(splideVideoPlay) {
    var customContent = createCustomContent();
    splideVideoPlay.appendChild(customContent);
  });

});

// svg color change on scroll
document.addEventListener("DOMContentLoaded", function(event) {
  const logoSvgPaths = document.querySelectorAll('.logotype--svg-inner svg path');
  const transitionToggle = document.getElementById('toggleBtn');

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  }

  function handleScroll() {
    const body = document.body;
    const colorPrimary = getComputedStyle(body).getPropertyValue('--color-primary').trim();
    const colorSecondary = getComputedStyle(body).getPropertyValue('--color-secondary').trim();
    const primaryRGB = hexToRgb(colorPrimary);
    const secondaryRGB = hexToRgb(colorSecondary);

    if (window.innerWidth < 760) {
      // Do nothing if the screen size is below 760px
      return;
    }

    if (!body.classList.contains('dark-mode') && logoSvgPaths.length) {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.pageYOffset;
      const scrollPercent = scrollPosition / totalHeight;
      const newColor = primaryRGB.map((start, i) => Math.floor(start + scrollPercent * (secondaryRGB[i] - start)));

      logoSvgPaths.forEach((path) => {
        path.setAttribute('fill', `rgb(${newColor})`);
      });
    } else {
      logoSvgPaths.forEach((path) => {
        path.setAttribute('fill', colorPrimary);
      });
    }
  }

  function handleToggle() {
    handleScroll();
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener('resize', handleScroll);
  transitionToggle.addEventListener('click', handleToggle);
  handleScroll();
});

// svg resize
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

// mobile menu
document.addEventListener('DOMContentLoaded', function() {
let menuIsVisible = false; // Variable to track menu visibility

// mobile menu
const menuButton = document.getElementById('menu-button'); // Store menu button
const headerContainer = document.getElementById('header--container');
const menuOverlay = document.getElementById('menuOverlay');

const  menuPlusOpen = document.getElementById('menuPlusOpen');
const  menuPlusClose = document.getElementById('menuPlusClose');

const menu = document.querySelector('.mobile-menu-overlay--container');


menuButton.addEventListener('click', function() {
  headerContainer.style.zIndex = '8';
  menu.classList.toggle('visible');
  menuIsVisible = menu.classList.contains('visible'); // Update variable
  menuPlusOpen.classList.toggle('svg-hide');
  menuPlusClose.classList.toggle('svg-hide');
  menuOverlay.classList.toggle('form-hide');
  menuOverlay.classList.toggle('z-index-3');
});

menuOverlay.addEventListener('click', function() {
  menu.classList.remove('visible');
  menuOverlay.classList.toggle('form-hide');
  menuOverlay.classList.toggle('z-index-3');
});

// accordion
let accordionItems = Array.from(document.querySelectorAll('.accordion-item'));

accordionItems.forEach(function(item) {
  let header = item.querySelector('.accordion-header');
  let content = item.querySelector('.accordion-content');
  let toggle = item.querySelector('.accordion-toggle-one');
  let toggleTwo = item.querySelector('.accordion-toggle-two');

  header.addEventListener('click', function() {
    // Close all other items
    accordionItems.forEach(function(otherItem) {
      if(otherItem !== item) {
        let otherContent = otherItem.querySelector('.accordion-content');
        let otherToggle = otherItem.querySelector('.accordion-toggle-one');
        let otherToggleTwo = otherItem.querySelector('.accordion-toggle-two');

        otherContent.style.maxHeight = null;
        if(otherToggle) {
          otherToggle.classList.remove('svg-hide');
          otherToggleTwo.classList.add('svg-hide');
        }
      }
    });

    // Toggle the clicked item
    if(content.style.maxHeight && content.style.maxHeight !== "0px") {
      content.style.maxHeight = null;
      toggle.classList.remove('svg-hide');
      toggleTwo.classList.add('svg-hide');

    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      toggle.classList.add('svg-hide');
      toggleTwo.classList.remove('svg-hide');
    }
  });
});

// Open the accordion with id 'accordionOpenDefaultResume' by default
let accordionDefault = document.querySelector('#accordionOpenDefaultResume .accordion-header');
if (accordionDefault) accordionDefault.click();


  // Scroll effect
  // const headerContainer = document.getElementById('header--container');
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
    } else if (scrollPositionChange > 2 && !menuIsVisible) {
      // Scrolling down
      headerContainer.style.zIndex = '0';
      headerContainer.style.opacity = '0';
      headerContainer.style.borderBottom = 'none'; // remove border-bottom
      pageWrapper.style.position = 'relative'; // move down 1px account for border-bottom overlap
      isScrollingUp = false;

      // Clear any previously scheduled timeout
      clearTimeout(timeout);

      // Add a timeout function to bring the header back to opacity 1
      timeout = setTimeout(() => {
        headerContainer.style.opacity = '1';
      }, 150); // Adjust the delay (in milliseconds) as per your preference
    }

    adjustCSSForMenuVisibility();

    previousScrollPosition = currentScrollPosition;
  });

  function adjustCSSForMenuVisibility() {
    // Check menu visibility and adjust CSS
    if (menuIsVisible && window.innerWidth < 840) {
      pageWrapper.style.top = 'var(--header-height-mob)';
      headerContainer.style.position = 'fixed';
      headerContainer.style.zIndex = '8';
    } else {
      pageWrapper.style.top = 'var(--section-border-width-minus)';
      headerContainer.style.position = 'sticky';
    }
  }

  function adjustCSSForMenuVisibilityDesktop() {
    // Check menu visibility and adjust CSS
    if (menuIsVisible && window.innerWidth > 840) {
      menu.classList.remove('visible');
      menuOverlay.classList.add('form-hide');
      menuOverlay.classList.remove('z-index-3');
    }
  }

  // Listen for window resize events
  window.addEventListener('resize', adjustCSSForMenuVisibility);
  window.addEventListener('resize', adjustCSSForMenuVisibilityDesktop);
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

// modal slide
document.addEventListener("DOMContentLoaded", function() {
  const formTrigger = document.getElementById('formTriggerOpen');
  const  formTriggerThree = document.getElementById('formTriggerThree');
  const  contactFormTriggerTwo = document.getElementById('contactFormTriggerTwo');
  const  formPosition = document.getElementById('formPosition');
  // const  menuPlusOpen = document.getElementById('menuPlusOpen');
  // const  menuPlusClose = document.getElementById('menuPlusClose');
  const  closeMinus = document.getElementById('closeMinus');
  const minusClose = document.getElementById('minusClose');
  const  formOverlay = document.getElementById('formOverlay');

  function formToggle() {  
    formPosition.classList.toggle('form-slide-left');
    formOverlay.classList.toggle('form-hide');
    // menuPlusOpen.classList.toggle('svg-hide');
    // menuPlusClose.classList.toggle('svg-hide');
    closeMinus.classList.toggle('svg-hide');
    minusClose.classList.toggle('svg-hide');
  }

  // formTrigger.addEventListener('click', formToggle);
  formTrigger.addEventListener('click', function(event) {
    event.preventDefault();
    formToggle();
  });
  formOverlay.addEventListener('click', formToggle);
  contactFormTriggerTwo.addEventListener('click', formToggle);
  formTriggerThree.addEventListener('click', formToggle);

  // form footer
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
  
  // form menu
  document.querySelector("#contact-form-menu").addEventListener("submit", function(event) {
    event.preventDefault();
  
    var formElement = event.target;
    if (!(formElement instanceof HTMLFormElement)) {
      console.error("Element is not a form.");
      return;
    }
  
    var formData = new FormData(formElement);
    var submitButton = document.querySelector("#contact-form--submit-two");
  
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
        // Change the text back to "SUBMIT" after 2 seconds
        setTimeout(function() {
          submitButton.textContent = "SUBMIT";
        }, 2000);
      } else {
        throw new Error('Form submission failed');
      }
    }).catch(error => {
      submitButton.textContent = "Error!";
      console.error(error);
    });
  });  
  
});

// credits popup
document.addEventListener('DOMContentLoaded', function() {
  const creditsLink = document.getElementById('creditsLink');
  const creditsMessageToggle = document.getElementById('creditsMessageToggle');
  const creditsMessageOpen = document.getElementById('creditsMessageOpen');
  const creditsMessageClose = document.getElementById('creditsMessageClose');
  const pageOverlay = document.getElementById('creditsOverlay');
  const creditsContent = document.getElementById('creditsContent');

  creditsLink.addEventListener('click', function(event) {
    event.preventDefault();
    pageOverlay.classList.toggle('show');
    creditsContent.classList.toggle('show');
    creditsMessageOpen.classList.toggle('svg-hide');
    creditsMessageClose.classList.toggle('svg-hide');
  });

  function creditsToggle() {  
    creditsMessageOpen.classList.toggle('svg-hide');
    creditsMessageClose.classList.toggle('svg-hide');
    setTimeout(function() {
      pageOverlay.classList.toggle('show');
      creditsContent.classList.toggle('show');
    }, 50);
  }

  creditsMessageToggle.addEventListener('click', creditsToggle);
  pageOverlay.addEventListener('click', creditsToggle);
});

// copyright popup
document.addEventListener('DOMContentLoaded', function() {
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

// marquees
document.addEventListener("DOMContentLoaded", function() {
  // Marquee 1
  const marqueeText1 = document.getElementById("contactFormMarqueeTitle");
  const marqueeContainer1 = document.getElementById("contact-form-footer");
  let marqueeTextWidth1 = marqueeText1.offsetWidth;
  let marqueeParentWidth1 = marqueeContainer1.offsetWidth;
  const formPositionElement = document.getElementById("formPosition");

  const formTriggerOpenClick = document.getElementById("formTriggerOpen");
  const formTriggerThreeClick = document.getElementById("formTriggerThree");
  const formTriggerThreeClose = document.getElementById("contactFormTriggerTwo");
  let shouldMarquee1Animate = false;

  formTriggerOpenClick.addEventListener("click", function() {
    shouldMarquee1Animate = true;
  });

  formTriggerThreeClick.addEventListener("click", function() {
    shouldMarquee1Animate = true;
  });

  formTriggerThreeClose.addEventListener("click", function() {
    shouldMarquee1Animate = false;
  });

  animate(marqueeText1, marqueeContainer1, () => marqueeTextWidth1, () => marqueeParentWidth1, () => !formPositionElement.classList.contains("slide-left") && shouldMarquee1Animate);

  // Marquee 2
  const marqueeText2 = document.getElementById("contactFormMarqueeTitleTwo");
  const marqueeContainer2 = document.getElementById("contact-form-menu");
  let marqueeTextWidth2 = marqueeText2.offsetWidth;
  let marqueeParentWidth2 = marqueeContainer2.offsetWidth;
  const mobileMenuDropDown = document.getElementById("mobileMenuDropDown");

  animate(marqueeText2, marqueeContainer2, () => marqueeTextWidth2, () => marqueeParentWidth2, () => mobileMenuDropDown.classList.contains("visible"));

  function animate(element, container, getTextWidth, getParentWidth, shouldAnimate) {
    let baseValue = 0;
    function step() {
      if (shouldAnimate()) {
        baseValue -= 2; // decrease baseValue by 2 pixels on each frame
        element.style.marginLeft = baseValue + "px";
        if (baseValue <= -getTextWidth()) {
          baseValue = getParentWidth();
        }
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  window.addEventListener("resize", function() {
    marqueeTextWidth1 = marqueeText1.offsetWidth;
    marqueeParentWidth1 = marqueeContainer1.offsetWidth;
    marqueeTextWidth2 = marqueeText2.offsetWidth;
    marqueeParentWidth2 = marqueeContainer2.offsetWidth;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Find the element with class `.splide__pagination` and save as a const variable `paginationItems`.
  const paginationItems = document.querySelector('.splide__pagination');

  // Count the number of li tags present inside `paginationItems` and save this as a const variable `counterCalc`.
  const counterCalc = paginationItems.getElementsByTagName('li').length;
  // console.log("counterCalc:", counterCalc);

  // Then add a new style rule to the document head.
  const style = document.createElement('style');
  style.textContent = `
    .media .splide__pagination > *:last-child::after {
      content: "/ of ${counterCalc}";
    }
  `;
  document.head.appendChild(style);
});

// last updated
document.addEventListener('DOMContentLoaded', function() {
  fetch('https://api.github.com/repos/chrisedwardsdesign/chrisedwardsdesign.github.io/commits')
  .then(response => response.json())
  .then(data => {
    const lastCommitDate = new Date(data[0].commit.author.date);
    const formattedDate = lastCommitDate.toLocaleDateString();
    const notificationElements = document.querySelectorAll('.last-updated');
    notificationElements.forEach(element => {
      element.innerText = `Updated: ${formattedDate}`;
    });
  })
  .catch(error => console.error('Error fetching commit data:', error));
});
