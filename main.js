// window.addEventListener('DOMContentLoaded', function() {
//   document.body.classList.add('opacity-zero');

//   setTimeout(function() {
//     document.body.classList.remove('opacity-zero');
//     document.body.classList.add('body-fade-in');
//   }, 750); // 750 ms delay before the transition starts
// });


document.addEventListener("DOMContentLoaded", function(event) {
  const body = document.querySelector('body');
  const themeStyle = document.getElementById('theme-style');
  const darkTextDesktop = document.getElementById('darkTextDesktop');
  const lightTextDesktop = document.getElementById('lightTextDesktop');
  const ledRightDesktop = document.getElementById('ledRightDesktop');
  const ledLeftDesktop = document.getElementById('ledLeftDesktop');
  const darkTextMobile = document.getElementById('darkTextMobile');
  const lightTextMobile = document.getElementById('lightTextMobile');
  const ledRightMobile = document.getElementById('ledRightMobile');
  const ledLeftMobile = document.getElementById('ledLeftMobile');

  const transitionToggleDesktop = document.getElementById('toggleBtnDesktop');
  const transitionToggleMobile = document.getElementById('toggleBtnMobile');
  const logoSvgPaths = document.querySelectorAll('.logotype--svg-inner svg path');

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  }

  function toggleMode(element, sessionKey, className) {
    element.classList.toggle(className);
    sessionStorage.setItem(sessionKey, element.classList.contains(className) ? 'true' : 'false');
  }

  function toggleDesktopMode() {
    // document.body.classList.add('body-fade-in');
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');
    toggleMode(darkTextDesktop, 'darkTextDesktop', 'toggle-text-switch');
    toggleMode(lightTextDesktop, 'lightTextDesktop', 'toggle-text-switch');
    toggleMode(ledRightDesktop, 'ledRightDesktop', 'mode-switch--btn--visible');
    toggleMode(ledLeftDesktop, 'ledLeftDesktop', 'mode-switch--btn--visible');

    themeStyle.href = body.classList.contains('dark-mode') ? 'styles/dark-theme.css' : 'styles/light-theme.css';
    sessionStorage.setItem('desktopMode', body.classList.contains('dark-mode') ? 'dark' : 'light');
  }

  function toggleMobileMode() {
    // document.body.classList.add('body-fade-in');
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');
    toggleMode(darkTextMobile, 'darkTextMobile', 'toggle-text-switch');
    toggleMode(lightTextMobile, 'lightTextMobile', 'toggle-text-switch');
    toggleMode(ledRightMobile, 'ledRightMobile', 'mode-switch--btn--visible');
    toggleMode(ledLeftMobile, 'ledLeftMobile', 'mode-switch--btn--visible');

    themeStyle.href = body.classList.contains('dark-mode') ? 'styles/dark-theme.css' : 'styles/light-theme.css';
    sessionStorage.setItem('mobileMode', body.classList.contains('dark-mode') ? 'dark' : 'light');
  }

  function handleScroll() {
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      const logoElement = document.querySelector('.logotype--svg-inner svg path');
      // const textColor = document.querySelector('.logotype--svg-inner svg');
      const colorPrimary = getComputedStyle(logoElement).getPropertyValue('--color-primary').trim();
      const colorSecondary = getComputedStyle(body).getPropertyValue('--color-secondary').trim();
      const primaryRGB = hexToRgb(colorPrimary);
      const secondaryRGB = hexToRgb(colorSecondary);

      // if (window.innerWidth < 640) {
      //   // Do nothing if the screen size is below 760px
      //   return;
      // }

      if (!primaryRGB || !secondaryRGB) {
        console.error('Invalid colors:', colorPrimary, colorSecondary);
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
  }

  function handleToggle() {
    if (body.classList.contains('dark-mode') || body.classList.contains('light-mode')) {
      logoSvgPaths.forEach((path) => {
        path.setAttribute('fill', getComputedStyle(body).getPropertyValue('--color-secondary').trim());
      });
    } else {
      logoSvgPaths.forEach((path) => {
        setTimeout(function() {
          path.setAttribute('fill', getComputedStyle(body).getPropertyValue('inherit').trim());
        }, 100);
      });
    }
  }
  
  function handleSessionStorage(elementId) {
    const element = document.getElementById(elementId);
    const shouldBeActive = sessionStorage.getItem(elementId) === 'true';
    const isActive = element.classList.contains('toggle-text-switch') || element.classList.contains('mode-switch--btn--visible');
    if (shouldBeActive !== isActive) {
      element.classList.toggle('toggle-text-switch');
      element.classList.toggle('mode-switch--btn--visible');
    }
  }

  // // Initial body state with zero opacity
  // document.body.classList.add('opacity-zero');

  // // Remove zero opacity and add fade-in effect after 750 ms
  // setTimeout(function() {
  //   document.body.classList.remove('opacity-zero');
  //   document.body.classList.add('body-fade-in');
  // }, 750);

  // Event listeners
  transitionToggleDesktop.addEventListener('click', () => {
    toggleDesktopMode();
    handleToggle();
  });

  transitionToggleMobile.addEventListener('click', () => {
    toggleMobileMode();
    handleToggle();
  });

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
  
  const desktopMode = sessionStorage.getItem('desktopMode');
  console.log('Retrieved desktop mode:', desktopMode); // Add this line
  if (desktopMode) {
    const darkModeSet = body.classList.contains('dark-mode');
    if ((desktopMode === 'dark' && !darkModeSet) || (desktopMode === 'light' && darkModeSet)) {
      toggleDesktopMode();
    }
    setTimeout(function() {
      ['darkTextDesktop', 'lightTextDesktop', 'ledRightDesktop', 'ledLeftDesktop'].forEach((elementId) => {
        handleSessionStorage(elementId);
        handleScroll();
      });
    }, 750);

    // Update the --color-primary value in session storage
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {

    const logoElement = document.querySelector('.logotype--svg-inner svg');
    const colorPrimary = getComputedStyle(body).getPropertyValue('--color-primary').trim();
    sessionStorage.setItem('--color-primary', colorPrimary);
    }
  }

    const mobileMode = sessionStorage.getItem('mobileMode');
    console.log('Retrieved mobile mode:', mobileMode); // Add this line
    if (mobileMode) {
      const darkModeSet = body.classList.contains('dark-mode');
      if ((mobileMode === 'dark' && !darkModeSet) || (mobileMode === 'light' && darkModeSet)) {
        toggleMobileMode();
      }
      setTimeout(function() {
        ['darkTextMobile', 'lightTextMobile', 'ledRightMobile', 'ledLeftMobile'].forEach((elementId) => {
          handleSessionStorage(elementId);
        });
      }, 750);
    }

    setTimeout(function() {
      sessionOverlay.style.opacity = '0';
      // Add this to prevent clicking on the elements in the overlay after it fades out
      setTimeout(function() {
        sessionOverlay.style.zIndex = '-1';
      }, 750); // This should match the transition time in your CSS
    }, 1000);
    
  handleScroll();
  handleToggle();

});


// splide video
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === '/design.html' || window.location.pathname === '/animation.html') {
    splide = new Splide('.splide', {
      type: 'loop',
      perPage: 1,
      autoplay: true,
      speed: 1500,
      interval: 10000,
      pauseOnHover: false,
      pauseOnFocus: false,
      resetProgress: false,
      arrows: true,
      video: {
        loop: true,
        mute: true,
        autoplay: true,
        hideControls: true,
        disableOverlayUI: false,
        playsInline: true,
        playerOptions: {
          htmlVideo: {
            autoplay: true,
            height: true,
            loop: true,
            muted: true,
            playsInline: true,
            preload: true,
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
  let splideVideoPlayElements = document.querySelectorAll('.splide__video__play');
  // Find the element with class `.splide__pagination` and save as a const variable `paginationItems`.
  const paginationItems = document.querySelector('.splide__pagination');
  // Count the number of li tags present inside `paginationItems` and save this as a const variable `counterCalc`.
  const counterCalc = paginationItems.getElementsByTagName('li').length;
  // console.log("counterCalc:", counterCalc);
  // Then add a new style rule to the document head.
  const style = document.createElement('style');

  // Loop over the elements and append the custom content to each
  splideVideoPlayElements.forEach(function(splideVideoPlay) {
    let customContent = createCustomContent();
    splideVideoPlay.appendChild(customContent);
  });

  style.textContent = `
    .media .splide__pagination > *:last-child::after {
      content: "/ of ${counterCalc}";
    }
  `;
  document.head.appendChild(style);

    // Recalculate Splide video size when the container's size changes
    function recalculateSplideSize() {
      splide.refresh();
    }

    recalculateSplideSize();
  }

  else if (window.location.pathname === '/design.html' || 
           window.location.pathname === '/animation.html' || 
           window.location.pathname === '/ux-code.html') {
    // Initialize regular Splide
    const splideDesign = new Splide('.splide', {
      type: 'loop',
      perPage: 1,
      autoplay: true,
      speed: 2000,
      interval: 4000,
      pauseOnHover: false,
      pauseOnFocus: false,
      resetProgress: false,
      arrows: true,
      width: '100%',
    }).mount();
  }

// custom reusable accordion logic
  let timeOuts = {};

  const toggleContent = function(elementId) {
    const element = document.getElementById(elementId);

    if (!element) return;

    if (element.style.maxHeight && element.style.maxHeight !== "0px") {
      element.style.maxHeight = "0px";
      clearTimeout(timeOuts[elementId]);
      timeOuts[elementId] = setTimeout(() => {
        element.style.display = "none";
      }, 250);
    } else {
      const isContentOpening = element.style.maxHeight === "0px";
      clearTimeout(timeOuts[elementId]);
      element.style.display = "grid";
      timeOuts[elementId] = setTimeout(() => {
        element.style.maxHeight = element.scrollHeight + "px";
        if (isContentOpening) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 10);
    }
  }; 

  const toggleSvg = function(svgOpenId, svgCloseId) {
    const svgOpen = document.getElementById(svgOpenId);
    const svgClose = document.getElementById(svgCloseId);

    if (svgOpen) {
      svgOpen.classList.toggle('svg-hide');
    }

    if (svgClose) {
      svgClose.classList.toggle('svg-hide');
    }
  };

  const triggersAndElements = [
    // {
    //   trigger: '#aboutTriggerTabletLogoHome',
    //   element1: 'sectionContent',
    //   svg: {
    //     open: 'accordionPlusOpen',
    //     close: 'accordionPlusClose'
    //   },
    //   animateElement2: false
    // },
    {
      trigger: '#aboutTriggerTablet',
      element1: 'sectionContent',
      svg: {
        open: 'accordionPlusOpen',
        close: 'accordionPlusClose'
      },
      animateElement2: false
    },
    {
      trigger: '#aboutTriggerDesktop',
      element1: 'contentXl',
      element2: 'sectionMedia',
      svg: {
        open: 'contactChevronCloseDesktop',
        close: 'contactChevronOpenDesktop'
      },
      gridColumnClass: 'animate-grow-from-column-2-5',
      animateElement2: true
    }
  ];

  const closeContentOnResize = function(elementsToClose) {
    elementsToClose.forEach((elementObj) => {
      const element1 = document.getElementById(elementObj.element1);
      const element2 = document.getElementById(elementObj.element2);
      if (element1 && element1.style.maxHeight && element1.style.maxHeight !== "0px") {
        toggleContent(elementObj.element1);
        toggleContent(elementObj.element2);
        if (elementObj.svg) {
          toggleSvg(elementObj.svg.open, elementObj.svg.close);
        }
      }
      if (element2) {
        element2.classList.remove('animate-grow-from-column-2-5');
        element2.style.display = 'grid';
        if (elementObj.svg) {
          toggleSvg(elementObj.svg.close, elementObj.svg.open);
        }
      }
    });
  };

  const openContentOnResize = function(elementsToOpen) {
    elementsToOpen.forEach((elementObj) => {
      const element = document.getElementById(elementObj.element1);
      if (element && element.style.maxHeight && element.style.maxHeight === "0px" && window.innerWidth > 640) {
        toggleContent(elementObj.element1);
        if (elementObj.svg) {
          toggleSvg(elementObj.svg.open, elementObj.svg.close);
        }
      }
    });
  };

  const addToggleListener = function(triggerElement, element1Id, element2Id, svg, gridColumnClass, animateElement2) {
    const element2 = document.getElementById(element2Id);
    let resizeObserver;
    let splideListContainer;
    let refreshTimeout;
    let resizeTimeout;
    const observationDuration = 750; // Duration in milliseconds

    const startObservation = () => {
      if (window.location.pathname === '/' || window.location.pathname === '/index.html') {

        if (resizeObserver) {
            resizeObserver.disconnect();
            console.log('Stopped observing');
        }

        clearTimeout(resizeTimeout);

        if (window.innerWidth > 1360) {
            splideListContainer = document.querySelector('#splide01-list');
            console.log('splideListContainer');
            
            resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    if (entry.target === splideListContainer) {
                        console.log('Container size changed');
                        splide.refresh();
                        console.log('Splide refreshed');
                  }
                }
            });

            window.scrollTo({ top: '200px', behavior: 'smooth' });


            setTimeout(() => {
                resizeObserver.observe(splideListContainer);
                setTimeout(() => {
                    resizeObserver.disconnect();
                    console.log('Stopped observing');
                }, observationDuration);
            }, 350);
        }
    };
  };

    triggerElement.addEventListener('click', function(event) {
        event.preventDefault();

        toggleContent(element1Id);

        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
          startObservation();

          if (animateElement2) {
              setTimeout(() => {
                element2.classList.toggle(gridColumnClass);
              }, 350);
              setTimeout(() => {
                element2.classList.toggle('gap-none');
              }, 400);
          }

          if (svg) {
              toggleSvg(svg.open, svg.close);
          }
        }  else if (window.location.pathname === '/' || window.location.pathname === '/design.html' || window.location.pathname === '/cv.html') {
          if (svg) {
            toggleSvg(svg.close, svg.open);
          }
        }
    });

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout); // Clear the previous timeout
  
      resizeTimeout = setTimeout(() => {
        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {

          if (animateElement2 && element2.classList.contains(gridColumnClass)) {
              element2.classList.toggle('gap-none');
              element2.classList.remove(gridColumnClass);
          }
            startObservation();
          }
      }, 0);
    });
  };

  triggersAndElements.forEach(item => {
    const trigger = document.querySelector(item.trigger);
    if (trigger) {
      addToggleListener(trigger, item.element1, item.element2, item.svg, item.gridColumnClass, item.animateElement2);
    }
  });

// Open element by default 'aboutTriggerDesktop'
const aboutTriggerDesktopElement = document.getElementById('aboutTriggerDesktop');
if (aboutTriggerDesktopElement) {
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    toggleContent('contentXl');
    toggleSvg('contactChevronOpenDesktop', 'contactChevronCloseDesktop');
  }

  else if (window.location.pathname === '/cv.html') {
    toggleContent('contentXl');
    toggleContent('sectionContent');
    toggleSvg('contactChevronOpenDesktop', 'contactChevronCloseDesktop');
  }
  
  else {
    // When on other pages
    const contentElement = document.getElementById('contentXl');
    if (contentElement) {
      // Ensure 'contentXl' is collapsed
      contentElement.style.maxHeight = "0px";
      contentElement.style.display = "none";
    }
    // Ensure the chevron is in the correct state
    const chevronOpen = document.getElementById('contactChevronOpenDesktop');
    const chevronClose = document.getElementById('contactChevronCloseDesktop');
    if (chevronOpen && !chevronOpen.classList.contains('svg-hide')) {
      // If chevronOpen is not hidden, hide it
      chevronOpen.classList.add('svg-hide');
    }
    if (chevronClose && chevronClose.classList.contains('svg-hide')) {
      // If chevronClose is hidden, show it
      chevronClose.classList.remove('svg-hide');
    }
  }
  if (window.location.pathname === '/design.html') {
    toggleSvg('contactChevronOpenDesktop', 'contactChevronCloseDesktop');
  }
}

  window.addEventListener('resize', () => {
    if (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === '/cv.html') {
      closeContentOnResize(triggersAndElements.filter(item => item.element1 === 'sectionContent' || 'contentXl'));
      openContentOnResize(triggersAndElements.filter(item => item.element1 === 'sectionContent' || 'contentXl'));
      toggleSvg('contactChevronOpenDesktop', 'contactChevronCloseDesktop');
    }
  });
});

// video
document.addEventListener("DOMContentLoaded", function() {
  if (window.location.pathname === '/design.html' || window.location.pathname === '/animation.html' || window.location.pathname === '/ux-code.html') {

    var videoContainers = document.querySelectorAll(".container--video");

    videoContainers.forEach((container) => {
      var video = container.querySelector(".video-content");
      var thumbnail = container.querySelector(".thumbnail");
      var playButton = container.querySelector(".play-button");

      function playVideo() {
        video.play().then(function() {
          thumbnail.style.display = "none";
          playButton.style.display = "none";
        }).catch(function(error) {
          console.log("Autoplay was prevented:", error);
          thumbnail.style.display = "block";
          playButton.style.display = "block";
        });
      }

      function lazyLoadVideo() {
        if ('IntersectionObserver' in window) {
          var observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                var sourceElements = entry.target.querySelectorAll("source");
                sourceElements.forEach(function(source) {
                  if (!source.src) {
                    source.src = source.dataset.src;
                  }
                });
                observer.unobserve(entry.target);
              }
            });
          });

          observer.observe(video);
        } else {
          var sourceElements = video.querySelectorAll("source");
          sourceElements.forEach(function(source) {
            if (!source.src) {
              source.src = source.dataset.src;
            }
          });
        }
      }

      function handlePlayButtonClick() {
        playVideo();
      }

      function handleVideoClick() {
        if (video.paused) {
          playVideo();
        } else {
          video.pause();
          thumbnail.style.display = "flex";
          playButton.style.display = "flex";
        }
      }

      function handleVideoEnded() {
        video.currentTime = 0;
        video.play();
      }

      lazyLoadVideo();
      playButton.addEventListener("click", handlePlayButtonClick);
      video.addEventListener("click", handleVideoClick);
      video.addEventListener("ended", handleVideoEnded);
    });
  }
});

// Preconnect to video source
document.addEventListener("DOMContentLoaded", function() {
  if (window.location.pathname === '/design.html' || window.location.pathname === '/animation.html' || window.location.pathname === '/ux-code.html') {

    if ("connection" in navigator) {
      const videoSource = document.querySelector("#video source");
      if (videoSource) {
        const videoUrl = videoSource.src;
        const urlObj = new URL(videoUrl);
        const origin = urlObj.origin;
        navigator.connection.addEventListener("change", function() {
          const effectiveType = navigator.connection.effectiveType;
          if (effectiveType === "4g" || effectiveType === "3g") {
            const link = document.createElement("link");
            link.rel = "preconnect";
            link.href = origin;
            document.head.appendChild(link);
          }
        });
      }
    }

  }
});

// svg resize
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
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
  }
});

// mobile menu
document.addEventListener('DOMContentLoaded', function() {
let menuIsVisible = false; // Variable to track menu visibility

// mobile menu
const menuButton = document.getElementById('menu-button'); // Store menu button
const headerContainer = document.getElementById('header--container');
const menuOverlay = document.getElementById('menuOverlay');
const menu = document.querySelector('.mobile-menu--container');


menuButton.addEventListener('click', function() {
  headerContainer.style.zIndex = '8';
  menu.classList.toggle('visible');
  menuIsVisible = menu.classList.contains('visible'); // Update variable
  // menuPlusOpen.classList.toggle('svg-hide');
  // menuPlusClose.classList.toggle('svg-hide');
  menuOverlay.classList.toggle('form-hide');
  menuOverlay.classList.toggle('z-index-3');
  // toggleMenuSvg();
});

menuOverlay.addEventListener('click', function() {
  menu.classList.remove('visible');
  menuOverlay.classList.toggle('form-hide');
  menuOverlay.classList.toggle('z-index-3');
});

// accordion menu
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
// let accordionDefault = document.querySelector('#accordionOpenDefaultRÉSUMÉ .accordion-header');
// if (accordionDefault) accordionDefault.click();


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
    if (menuIsVisible && window.innerWidth < 1100) {
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
    if (menuIsVisible && window.innerWidth > 1100) {
      menu.classList.remove('visible');
      menuOverlay.classList.add('form-hide');
      menuOverlay.classList.remove('z-index-3');
    }
  }

  // Listen for window resize events
  window.addEventListener('resize', adjustCSSForMenuVisibility);
  window.addEventListener('resize', adjustCSSForMenuVisibilityDesktop);
});

// modal slide
document.addEventListener("DOMContentLoaded", function() {
  const formTrigger = document.getElementById('formTriggerOpen');
  const  formTriggerThree = document.getElementById('formTriggerThree');
  const  formTriggerThreeDesktop = document.getElementById('formTriggerThreeDesktop');
  const  contactFormTriggerTwo = document.getElementById('contactFormTriggerTwo');
  const  formPosition = document.getElementById('formPosition');
  const  contactChevronOpen = document.getElementById('contactChevronOpen');
  const  contactChevronClose = document.getElementById('contactChevronClose');
  const  closeMinus = document.getElementById('closeMinus');
  const minusClose = document.getElementById('minusClose');
  const  formOverlay = document.getElementById('formOverlay');

  function formToggle() {  
    formPosition.classList.toggle('form-slide-left');
    formOverlay.classList.toggle('form-hide');
    contactChevronOpen.classList.toggle('svg-hide');
    contactChevronClose.classList.toggle('svg-hide');
    closeMinus.classList.toggle('svg-hide');
    minusClose.classList.toggle('svg-hide');
    // toggleContactSvg();
  }

  // formTrigger.addEventListener('click', formToggle);
  formTrigger.addEventListener('click', function(event) {
    event.preventDefault();
    formToggle();
  });
  formOverlay.addEventListener('click', formToggle);
  contactFormTriggerTwo.addEventListener('click', formToggle);
  formTriggerThree.addEventListener('click', formToggle);
  formTriggerThreeDesktop.addEventListener('click', formToggle);


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

// copyright popup
document.addEventListener('DOMContentLoaded', function() {
  const copyrightLink = document.getElementById('copyrightLink');
  const copyrightLinkTwo = document.getElementById('copyrightLinkTwo');
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

  copyrightLinkTwo.addEventListener('click', function(event) {
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
