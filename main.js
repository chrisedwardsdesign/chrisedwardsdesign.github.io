document.addEventListener("DOMContentLoaded", function(event) {
  window.onload = function() {
    if (window.location.pathname === '/index.html') {
      let sectionMediaHeight = document.getElementById('sectionMedia');
      let computedStyle = window.getComputedStyle(sectionMediaHeight);
      let sectionMediaheightCalc = parseFloat(computedStyle.getPropertyValue('height'));
      
      console.log('Computed Height of sectionMedia:', sectionMediaheightCalc);
      document.documentElement.style.setProperty('--sectionMedia-height', sectionMediaheightCalc + 'px');

      let elementSectionGraphic = document.getElementById('sectionGraphic');
      let elementSectionGraphiccomputedStyle = window.getComputedStyle(elementSectionGraphic);
      let elementSectionGraphiccomputedStyleCalc = parseFloat(elementSectionGraphiccomputedStyle.getPropertyValue('height'));
      
      console.log('Computed Height of sectionMedia:', elementSectionGraphiccomputedStyleCalc);
      
      document.documentElement.style.setProperty('--section-graphic-height', elementSectionGraphiccomputedStyleCalc + 'px');
    }
  }

  const body = document.querySelector('body');
  const themeStyle = document.getElementById('theme-style');
  const darkTextDesktop = document.getElementById('darkTextDesktop');
  const lightTextDesktop = document.getElementById('lightTextDesktop');
  const ledRightDesktop = document.getElementById('ledRightDesktop');
  const ledLeftDesktop = document.getElementById('ledLeftDesktop');

  const transitionToggleDesktop = document.getElementById('toggleBtnDesktop');
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
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');
    toggleMode(darkTextDesktop, 'darkTextDesktop', 'toggle-text-switch');
    toggleMode(lightTextDesktop, 'lightTextDesktop', 'toggle-text-switch');
    toggleMode(ledRightDesktop, 'ledRightDesktop', 'mode-switch--btn--visible');
    toggleMode(ledLeftDesktop, 'ledLeftDesktop', 'mode-switch--btn--visible');

    themeStyle.href = body.classList.contains('dark-mode') ? 'styles/dark-theme.css' : 'styles/light-theme.css';
    sessionStorage.setItem('themeMode', body.classList.contains('dark-mode') ? 'dark' : 'light');
  }

  function handleScroll() {
    if ((window.location.pathname === '/' || window.location.pathname === '/index.html') && window.innerWidth < 640) {
      const logoElement = document.querySelector('.logotype--svg-inner svg path');
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

  // Event listeners
  transitionToggleDesktop.addEventListener('click', () => {
    toggleDesktopMode();
    handleToggle();
  });

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);

  const themeMode = sessionStorage.getItem('themeMode');
  console.log('Retrieved theme mode:', themeMode);
  if (themeMode) {
    const darkModeSet = body.classList.contains('dark-mode');
    if ((themeMode === 'dark' && !darkModeSet) || (themeMode === 'light' && darkModeSet)) {
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

  setTimeout(function() {
    sessionOverlay.style.opacity = '0';
    // Add this to prevent clicking on the elements in the overlay after it fades out
    setTimeout(function() {
      sessionOverlay.style.zIndex = '-1';
    }, 750); // This should match the transition time in your CSS
  }, 1000);
    
  handleScroll();
  handleToggle();

  // splide video
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    splide = new Splide('.splide', {
      type: 'loop',
      perPage: 1,
      autoplay: true,
      speed: 1500,
      interval: 14000,
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
    

    function createCustomContent() {
      const playButton = document.createElement('div');
      playButton.id = 'play-button';
      playButton.className = 'play-button play-button--color-alt uppercase';
    
      const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgElem.setAttribute('width', '9');
      svgElem.setAttribute('height', '17');
      svgElem.setAttribute('viewBox', '0 0 9 17');
      svgElem.setAttribute('fill', 'inherit');
    
      const pathElem = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathElem.setAttribute('d', 'M0.0415039 0.351562L8.0415 8.35156L0.0415039 16.3516');
      pathElem.setAttribute('fill', 'inherit');
    
      svgElem.appendChild(pathElem);
      playButton.appendChild(svgElem);
    
      const textContainer = document.createElement('span');
      textContainer.className = 'text-container';
    
      const oldText = document.createElement('span');
      oldText.className = 'old-text';
      oldText.innerText = 'Play';
    
      const newText = document.createElement('span');
      newText.className = 'new-text';
      newText.innerText = 'Play';
    
      textContainer.appendChild(oldText);
      textContainer.appendChild(newText);
    
      playButton.appendChild(textContainer);
    
      return playButton;
    }
    


    let splideVideoPlayElements = document.querySelectorAll('.splide__video__play');
    const paginationItems = document.querySelector('.splide__pagination');
    const counterCalc = paginationItems.getElementsByTagName('li').length;
    const style = document.createElement('style');

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

      function recalculateSplideSize() {
        console.log('resize event fired');
        splide.refresh();
      }
      
      console.log('Before adding event listener');
      window.addEventListener('resize', recalculateSplideSize);
      console.log('After adding event listener');

    }
    
  else if (window.location.pathname === '/design.html' || 
    // window.location.pathname === '/animation.html' || 
    window.location.pathname === '/ux-code.html') {
    // Initialize regular Splide
      const splideDesign = new Splide('.splide', {
        type: 'loop',
        perPage: 1,
        autoplay: true,
        speed: 2000,
        interval: 3500,
        pauseOnHover: false,
        pauseOnFocus: false,
        resetProgress: true,
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

  // Add setSvgState function here
  const setSvgState = function(svgOpenId, svgCloseId, contentId) {
    const svgOpen = document.getElementById(svgOpenId);
    const svgClose = document.getElementById(svgCloseId);
    const content = document.getElementById(contentId);
  
    if (content && svgOpen && svgClose) {
      if (content.style.display !== "none") {  // content is open
        svgOpen.classList.add('svg-hide');
        svgClose.classList.remove('svg-hide');
      } else {  // content is closed
        svgOpen.classList.remove('svg-hide');
        svgClose.classList.add('svg-hide');
      }
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
    const observationDuration = 750;

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
        }  else if (window.location.pathname === '/' || window.location.pathname === '/design.html' || window.location.pathname === '/cv.html' || window.location.pathname === '/ux-code.html' || window.location.pathname === '/animation.html') {
          if (svg) {
            toggleSvg(svg.close, svg.open);
          }
        }
    });

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
  
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
  const contentElement = document.getElementById('contentXl');
  const chevronOpen = document.getElementById('contactChevronOpenDesktop');
  const chevronClose = document.getElementById('contactChevronCloseDesktop');

  if (aboutTriggerDesktopElement) {
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      toggleContent('contentXl');
    } else if (window.location.pathname === '/cv.html') {
      toggleContent('contentXl');
      toggleContent('sectionContent');
      toggleSvg('contactChevronOpenDesktop', 'contactChevronCloseDesktop');
      toggleSvg('accordionPlusOpen', 'accordionPlusClose');
    } else {
      // When on other pages, except 'cv.html'
      if (contentElement) {
        contentElement.style.maxHeight = "0px";
        contentElement.style.display = "none";
      }
      if (chevronOpen && !chevronOpen.classList.contains('svg-hide')) {
        chevronOpen.classList.remove('svg-hide');
      }
      if (chevronClose && chevronClose.classList.contains('svg-hide')) {
        chevronClose.classList.add('svg-hide');
      }
    }
  }

  window.addEventListener('resize', () => {
    if (window.location.pathname === '/cv.html') {
      closeContentOnResize(triggersAndElements.filter(item => item.element1 === 'sectionContent' || 'contentXl'));
      openContentOnResize(triggersAndElements.filter(item => item.element1 === 'sectionContent' || 'contentXl'));
      setSvgState('contactChevronOpenDesktop', 'contactChevronCloseDesktop', 'contentXl');
      setSvgState('accordionPlusOpen', 'accordionPlusClose', 'sectionContent');
    } else if (window.location.pathname === '/design.html' || window.location.pathname === '/animation.html' || window.location.pathname === '/ux-code.html') {
      closeContentOnResize(triggersAndElements.filter(item => item.element1 === 'sectionContent' || 'contentXl'));
    }
  });


  // video
let videoContainers; // Declare videoContainers variable at the start

const PATHS = {
  INDEX: '/index.html',
  DESIGN: '/design.html',
  ANIMATION: '/animation.html',
  UX_CODE: '/ux-code.html',
};

function checkViewport() {
  return window.innerWidth > 0;
}

async function playVideo(video, thumbnail, playButton, videoOverlay) {
  try {
    if (video.readyState < 2) {  // Check if video metadata has loaded
      await new Promise((resolve, reject) => {
        video.addEventListener('loadedmetadata', resolve);
        video.addEventListener('error', reject);
      });
    }

    await video.play();

    thumbnail.style.display = "none";
    playButton.style.display = "none";
    videoOverlay.style.display = "none";
  } catch (error) {
    console.error("Error playing video: ", error);
    // consider providing more user-friendly error handling here
  }
}

let videosPlayingWhenTabInactive = [];

function autoplayAllVideos(videoContainers) {
  if (window.location.pathname === PATHS.ANIMATION && checkViewport()) {
    setTimeout(() => {
      videoContainers.forEach((container, index) => {
        let video = container.querySelector(".video-content");
        let thumbnail = container.querySelector(".thumbnail");
        let playButton = container.querySelector(".play-button");
        let videoOverlay = container.querySelector(".container--video--overlay");

        let observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              playVideo(video, thumbnail, playButton, videoOverlay);
            } else if (!video.paused) {
              video.pause();
              thumbnail.style.display = "flex";
              playButton.style.display = "flex";
              videoOverlay.style.display = "flex";
            }
          });
        }, { threshold: 0.1, rootMargin: '200px 0px' }); // Start loading the video a bit before it enters the viewport

        observer.observe(video);

        // Autoplay first video when page loads
        if (container.getAttribute("data-video") === "1") {
          playVideo(video, thumbnail, playButton, videoOverlay);
        }
      });
    }, 2000); // Add a delay here
  }
}

if ([PATHS.INDEX, PATHS.DESIGN, PATHS.ANIMATION, PATHS.UX_CODE].includes(window.location.pathname)) {
  videoContainers = document.querySelectorAll(".container--video");
}

if (videoContainers) {
  videoContainers.forEach((container) => {
    const video = container.querySelector(".video-content");
    const thumbnail = container.querySelector(".thumbnail");
    const playButton = container.querySelector(".play-button");
    const videoOverlay = container.querySelector(".container--video--overlay");

      function lazyLoadVideo() {
        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                let sourceElements = entry.target.querySelectorAll("source");
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
          const sourceElements = video.querySelectorAll("source");
          sourceElements.forEach(function(source) {
            if (!source.src) {
              source.src = source.dataset.src;
            }
          });
        }
      }

      function handlePlayButtonClick() {
        playVideo(video, thumbnail, playButton, videoOverlay);
      }

      function handleVideoClick() {
        if (video.paused) {
          playVideo(video, thumbnail, playButton, videoOverlay);
        } else {
          video.pause();
          thumbnail.style.display = "flex";
          playButton.style.display = "flex";
          videoOverlay.style.display = "flex";
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

    autoplayAllVideos(videoContainers);
    // autoplayFirstVideo(videoContainers);
  }

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

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        videosPlayingWhenTabInactive = [];
        videoContainers.forEach(container => {
          const video = container.querySelector(".video-content");
          if (!video.paused) {
            video.pause();
            videosPlayingWhenTabInactive.push(video);
          }
        });
      } else {
        videosPlayingWhenTabInactive.forEach(video => {
          const thumbnail = video.parentElement.querySelector(".thumbnail");
          const playButton = video.parentElement.querySelector(".play-button");
          const videoOverlay = videoContainers[0].querySelector(".container--video--overlay");
          playVideo(video, thumbnail, playButton, videoOverlay);
        });
      }
    });

      window.onload = function() {
        // Check if the user's device is an iPhone or iPad
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            // Select all videos
            const videos = document.querySelectorAll('.video-content');
            videos.forEach(video => {
                video.click();
            });
        }
    };

  }

  // mobile menu
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
    menuOverlay.classList.toggle('form-hide');
    menuOverlay.classList.toggle('z-index-3');
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
  function runScript() {
    const pageWrapper = document.getElementById('page-wrapper');
    const footerScrollEffect = document.getElementById('footer--container');
    const sectionGraphicScrollEffect = document.getElementById('sectionGraphic');
    let previousScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    let isScrollingUp = false;
    let timeout;

    function isHomepageAndLargeScreenWidth() {
      return (window.location.pathname === '/' || window.location.pathname === '/index.html') && window.innerWidth > 640;
    }
    
    function isHomepageAndLargeScreenHeight() {
      return (window.location.pathname === '/' || window.location.pathname === '/index.html') && window.innerHeight > 1000;
    }

    function headerHomepageAboveSmallScreens() {
      if (isHomepageAndLargeScreenWidth()) {
        headerContainer.style.position = 'fixed';
        headerContainer.style.zIndex = '3';

        pageWrapper.style.position = 'fixed';
        pageWrapper.style.display = 'flex';
        pageWrapper.style.flexDirection = 'column';
        pageWrapper.style.width = '100%';

        sectionGraphicScrollEffect.style.top = 'var(--header-height-desktop)';
        sectionGraphicScrollEffect.style.backdropFilter = 'blur(0)';


        footerScrollEffect.style.zIndex = '3';
        footerScrollEffect.style.zIndex = '2';
      }
      else if (isHomepageAndLargeScreenHeight()) {
        sectionGraphicScrollEffect.style.minHeight = 'calc(100vh - var(--header-height-desktop) - var(--footer-height-mob) - 0.5rem)';
      } else {
        headerContainer.style.position = '';
        headerContainer.style.zIndex = '';
    
        pageWrapper.style.position = '';
        pageWrapper.style.display = '';
        pageWrapper.style.flexDirection = '';
        pageWrapper.style.width = '';

        if (sectionGraphicScrollEffect) {
          sectionGraphicScrollEffect.style.top = '';
          sectionGraphicScrollEffect.style.backdropFilter = '';
          sectionGraphicScrollEffect.style.minHeight = '';
        }
    
        footerScrollEffect.style.zIndex = '';
        footerScrollEffect.style.zIndex = '';
      }
    }

    function resetHeaderStyles() {
      if (isHomepageAndLargeScreenWidth()) {
          headerContainer.style.zIndex = '';
          headerContainer.style.opacity = '';
          headerContainer.style.borderBottom = '';
      }
    }

    window.addEventListener('scroll', function() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPositionChange = currentScrollPosition - previousScrollPosition;

      if (isHomepageAndLargeScreenWidth() && isHomepageAndLargeScreenHeight()) return;

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
        headerContainer.style.position = '';

        timeout = setTimeout(() => {
          headerContainer.style.position = '';
        }, 150); // Adjust the delay (in milliseconds) as per your preference
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
    // window.addEventListener('resize', adjustCSSForMenuVisibility);
    // window.addEventListener('resize', adjustCSSForMenuVisibilityDesktop);
    window.addEventListener('resize', function() {
      if (isHomepageAndLargeScreenWidth() && isHomepageAndLargeScreenHeight()) {
        resetHeaderStyles();
        headerHomepageAboveSmallScreens();
        return;
      }
      
      adjustCSSForMenuVisibility();
      adjustCSSForMenuVisibilityDesktop();
      headerHomepageAboveSmallScreens(); // Call it here

    });

    headerHomepageAboveSmallScreens();
  }

  runScript();  // Run the script initially

  window.addEventListener('resize', function() {
    runScript();  // Run the script again whenever the window is resized
  });


  // modal slide
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

  // copyright popup
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

  // Marquee 1
  // const marqueeText1 = document.getElementById("contactFormMarqueeTitle");
  // const marqueeContainer1 = document.getElementById("contact-form-footer");
  // let marqueeTextWidth1 = marqueeText1.offsetWidth;
  // let marqueeParentWidth1 = marqueeContainer1.offsetWidth;
  // const formPositionElement = document.getElementById("formPosition");

  // const formTriggerOpenClick = document.getElementById("formTriggerOpen");
  // const formTriggerThreeClick = document.getElementById("formTriggerThree");
  // const formTriggerThreeClose = document.getElementById("contactFormTriggerTwo");
  // let shouldMarquee1Animate = false;

  // formTriggerOpenClick.addEventListener("click", function() {
  //   shouldMarquee1Animate = true;
  // });

  // formTriggerThreeClick.addEventListener("click", function() {
  //   shouldMarquee1Animate = true;
  // });

  // formTriggerThreeClose.addEventListener("click", function() {
  //   shouldMarquee1Animate = false;
  // });

  // animate(marqueeText1, marqueeContainer1, () => marqueeTextWidth1, () => marqueeParentWidth1, () => !formPositionElement.classList.contains("slide-left") && shouldMarquee1Animate);

  // // Marquee 2
  // const marqueeText2 = document.getElementById("contactFormMarqueeTitleTwo");
  // const marqueeContainer2 = document.getElementById("contact-form-menu");
  // let marqueeTextWidth2 = marqueeText2.offsetWidth;
  // let marqueeParentWidth2 = marqueeContainer2.offsetWidth;
  // const mobileMenuDropDown = document.getElementById("mobileMenuDropDown");

  // animate(marqueeText2, marqueeContainer2, () => marqueeTextWidth2, () => marqueeParentWidth2, () => mobileMenuDropDown.classList.contains("visible"));

  // function animate(element, container, getTextWidth, getParentWidth, shouldAnimate) {
  //   let baseValue = 0;
  //   function step() {
  //     if (shouldAnimate()) {
  //       baseValue -= 2; // decrease baseValue by 2 pixels on each frame
  //       element.style.marginLeft = baseValue + "px";
  //       if (baseValue <= -getTextWidth()) {
  //         baseValue = getParentWidth();
  //       }
  //     }
  //     requestAnimationFrame(step);
  //   }
  //   requestAnimationFrame(step);
  // }

  // window.addEventListener("resize", function() {
  //   marqueeTextWidth1 = marqueeText1.offsetWidth;
  //   marqueeParentWidth1 = marqueeContainer1.offsetWidth;
  //   marqueeTextWidth2 = marqueeText2.offsetWidth;
  //   marqueeParentWidth2 = marqueeContainer2.offsetWidth;
  // });

  // svg resize
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    const centerElement = document.getElementById('logotypeSvgWidthCenter');
    const topElement = document.getElementById('logotypeSvgWidthTop');
    const bottomElement = document.getElementById('logotypeSvgWidthBottom');
    
    // Update centerElement width and height
    centerElement.style.width = '100%';
    centerElement.style.height = 'fit-content';
    topElement.style.width = 'fit-content%';
    topElement.style.height = 'fit-content';
    bottomElement.style.width = 'fit-content%';
    bottomElement.style.height = 'fit-content';

    function updateHeight() {
      // Calculate centerHeight based on the first SVG inside the centerElement
      const centerHeight = window.getComputedStyle(centerElement.querySelector('.logotype--svg')).height;
      // console.log('Calculated centerHeight:', centerHeight);
    
      // Apply the height to all SVGs in each anchor tag
      [topElement, centerElement, bottomElement].forEach(el => {
        // console.log('Setting height for SVGs in element:', el.id);
    
        el.querySelectorAll('.logotype--svg').forEach(svg => {
          // console.log('Before setting height for SVG:', svg.id, 'current height is:', svg.style.height);
          svg.style.height = centerHeight;
          // console.log('After setting height for SVG:', svg.id, 'current height is:', svg.style.height);
        });
      });
    }

    window.addEventListener('resize', () => {
      // Reset the heights before updating
      [topElement, centerElement, bottomElement].forEach(el => {
        el.querySelectorAll('.logotype--svg').forEach(svg => {
          svg.style.height = '';
        });
      });
    
      // Now call the updateHeight function to set the new heights
      updateHeight();
    });
    

  // Delayed initial height update
    setTimeout(updateHeight, 500); // Delay execution by 500ms
  }

  document.querySelectorAll(".logotype--a-top, .logotype--a-center, .logotype--a-bottom").forEach(el => {
    const svgs = el.querySelectorAll('.logotype--svg');
    const originalAnimationDurations = new Map();

    svgs.forEach(svg => {
      let animationDuration = window.getComputedStyle(svg).animationDuration;
      originalAnimationDurations.set(svg, animationDuration);
    });

    el.addEventListener("mouseover", () => {
      svgs.forEach(svg => {
        svg.style.animation = `slide ${originalAnimationDurations.get(svg)} linear infinite`;
      });
    });
    
    el.addEventListener("mouseleave", () => {
      svgs.forEach(svg => {
        svg.style.animation = `slideBack 0.35s forwards`;
      });
    });
  });
  

  // last updated
  fetch('https://api.github.com/repos/chrisedwardsdesign/chrisedwardsdesign.github.io/commits')
  .then(response => response.json())
  .then(data => {
    const lastCommitDate = new Date(data[0].commit.author.date);
    const formattedDate = lastCommitDate.toLocaleDateString();
    const notificationElements = document.querySelectorAll('.last-updated');
    notificationElements.forEach(element => {
      element.innerText = `Edited: ${formattedDate}`;
    });
  })
  .catch(error => console.error('Error fetching commit data:', error));
});
