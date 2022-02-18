window.onload = () => {
  owlCarousel.init()
  // countUpConfig.init()
  // lazyLoading.init()
  // header.init()
}

const loading = {
  init: function () {
    this.configLoading()
  },
  configLoading: function () {
    
  }
}

const lazyLoading = {
  init: function () {
    this.config()
  },
  config: function () {
    const lazyLoadInstance = new LazyLoad({});
  }
}

const owlCarousel = {
  init: function () {
    this.previewCharacterCarousel()
  },
  previewCharacterCarousel: function () {
    const $owlPreviewCharacter = $("#preview-character-carousel").owlCarousel({
      responsive: {
        0: {
          items: 1,
        },
      },
      loop: false,
      autoplay: false,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      smartSpeed: 300,
      lazyLoad: true,
      dots: false,
      nav: false,
      margin: 0,
    });

    const $owlPreviewLevel = $("#preview-level-carousel").owlCarousel({
      responsive: {
        0: {
          items: 1,
        },
      },
      loop: false,
      autoplay: false,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      smartSpeed: 300,
      lazyLoad: true,
      dots: false,
      nav: false,
      margin: 0,
    });

    const prevBtnOwlPreviewCharacter = document.querySelector('.PreviewCharacters-button.left')
    const nextBtnOwlPreviewCharacter = document.querySelector('.PreviewCharacters-button.right')

    $owlPreviewCharacter.on('changed.owl.carousel', (event) => {
      const currentIndex = event.item.index
      $owlPreviewLevel.trigger('to.owl.carousel', [currentIndex, 300]);
    })

    prevBtnOwlPreviewCharacter.addEventListener('click', () => {
      $owlPreviewCharacter.trigger('prev.owl.carousel');
    })

    nextBtnOwlPreviewCharacter.addEventListener('click', () => {
      $owlPreviewCharacter.trigger('next.owl.carousel');
    })

    const prevBtnOwlPreviewLevel = document.querySelector('.PreviewCharacters-level-button.left')
    const nextBtnOwlPreviewLevel = document.querySelector('.PreviewCharacters-level-button.right')

    $owlPreviewLevel.on('changed.owl.carousel', (event) => {
      const currentIndex = event.item.index
      $owlPreviewCharacter.trigger('to.owl.carousel', [currentIndex, 300]);
    })

    prevBtnOwlPreviewLevel.addEventListener('click', () => {
      $owlPreviewLevel.trigger('prev.owl.carousel');
    })

    nextBtnOwlPreviewLevel.addEventListener('click', () => {
      $owlPreviewLevel.trigger('next.owl.carousel');
    })
  },
}

const header = {
  init: function () {
    // this.scrollHeaderEffect()
  },
  scrollHeaderEffect: function () {
    const header = document.querySelector('.header-layout')
    window.addEventListener('scroll', () => {
      if (window.scrollY > 150) header.classList.add('active')
      else header.classList.remove('active')
    })
  },
}

const countUpConfig = {
  init: function () {
    // this.configCountUpWelcomeSection()
  },
  configCountUpWelcomeSection: function () {
    const dataCountWelcomeSection = [{
        targetHTML: '#countUp-long-term',
        numberCountUp: 92,
        suffix: '%',
      },
      {
        targetHTML: '#countUp-offices-internationally',
        numberCountUp: 60
      },
      {
        targetHTML: '#countUp-years-in-viet-nam ',
        numberCountUp: 7
      },
    ]
    this.setupScrollEvent('.section-welcome .about-wrapper', dataCountWelcomeSection)
  },
  setupScrollEvent: function (targetHTML, elementsCountUp) {
    const target = document.querySelector(targetHTML)
    if (target) {
      const options = {
        threshold: 1,
        rootMargin: "0px",
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            return;
          } else {
            elementsCountUp.forEach((item) => this.setupCountUp(item.targetHTML, item.numberCountUp, item.suffix))
            observer.unobserve(entry.target);
          }
        })
      }, options);
      observer.observe(target);
    }
  },
  setupCountUp(targetId, number, suffix = '') {
    const options = {
      startVal: 0,
      duration: 5,
      suffix,
    }
    const target = document.querySelector(targetId)
    const countUpObj = new CountUp(target, number, options)
    countUpObj.start()
  }
}
