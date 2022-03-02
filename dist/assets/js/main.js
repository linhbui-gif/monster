window.onload = () => {
  owlCarousel.init()
  // scrollMagic.init()
  // wowJs.init()
}

const owlCarousel = {
  init: function () {
    this.previewCharacterCarousel()
  },
  previewCharacterCarousel: async function () {
    const response = await fetch('https://daonghia2404.github.io/crypto-monster/data.json');
    const data = await response.json();
    let currentIndex = 0;

    const initialOwlCarousel = (characterIndex) => {
      const currentData = data[characterIndex]
      const mainPreviewCharacter = document.querySelector('#preview-character-carousel');
      const mainPreviewLevel = document.querySelector('#preview-level-carousel');

      const mainPreviewCharacterButton = document.querySelector('.PreviewCharacters-character-main-button')
      const mainPreviewLevelButton = document.querySelector('.PreviewCharacters-level-main-button')

      const mainPreviewNameCharacter = document.querySelector('.PreviewCharacters-navigation-title');

      mainPreviewCharacter.innerHTML = ''
      mainPreviewLevel.innerHTML = ''
      mainPreviewCharacterButton.innerHTML = ''
      mainPreviewLevelButton.innerHTML = ''
      mainPreviewNameCharacter.innerHTML = ''

      let contentPreviewCharacter = ''
      let contentPreviewLevel = ''

      mainPreviewCharacterButton.innerHTML = `
        <div class="PreviewCharacters-button left">
          <img src="./assets/icons/icon-arrow-left.svg" alt="" />
        </div>
        <div class="PreviewCharacters-button right">
          <img src="./assets/icons/icon-arrow-right.svg" alt="" />
        </div>
      `

      mainPreviewLevelButton.innerHTML = `
        <div class="PreviewCharacters-level-button left">
          <img src="./assets/icons/icon-angle-left.svg" alt="" />
        </div>
        <div class="PreviewCharacters-level-button right">
          <img src="./assets/icons/icon-angle-right.svg" alt="" />
        </div>
      `

      currentData.levels.forEach((item, index) => {
        contentPreviewCharacter += `
          <div class="item">
            <div class="PreviewCharacters-preview-image">
              <img class="PreviewCharacters-preview-image-bg" src="./assets/images/bg-character.png" alt="" />
              <img src="${item.image}" alt="" />
            </div>
          </div>
        `

        contentPreviewLevel += `
        <div class="item">
          <div class="PreviewCharacters-level-preview-item flex items-center">
            <div class="PreviewCharacters-level-preview-item-image flex items-center">
              <img src="${item.image}" alt="" />
            </div>

            <div class="PreviewCharacters-level-preview-item-info">
              <div class="PreviewCharacters-level-preview-item-info-title flex items-center">
                <div class="PreviewCharacters-level-preview-item-info-title-number">${index + 1}</div>
                <div class="PreviewCharacters-level-preview-item-info-title-label">${item.title}</div>
              </div>
              <div class="PreviewCharacters-level-preview-item-info-description">${item.description}</div>
            </div>
          </div>
        </div>
        `
      })

      mainPreviewCharacter.innerHTML = contentPreviewCharacter
      mainPreviewLevel.innerHTML = contentPreviewLevel
      mainPreviewNameCharacter.innerHTML = currentData.name

      const $owlPreviewCharacter = $("#preview-character-carousel")
      $owlPreviewCharacter.trigger('destroy.owl.carousel');
      $owlPreviewCharacter.owlCarousel({
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

      const $owlPreviewLevel = $("#preview-level-carousel")
      $owlPreviewLevel.trigger('destroy.owl.carousel');
      $owlPreviewLevel.owlCarousel({
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
    }

    const prevBtnCharacter = document.querySelector('.PreviewCharacters-navigation-arrow.left')
    const nextBtnCharacter = document.querySelector('.PreviewCharacters-navigation-arrow.right')

    nextBtnCharacter.addEventListener('click', () => {
      currentIndex += 1
      if (currentIndex < 0) currentIndex *= -1
      const newCharacterIndex = currentIndex % data.length
      initialOwlCarousel(newCharacterIndex)
    })

    prevBtnCharacter.addEventListener('click', () => {
      currentIndex -= 1
      if (currentIndex < 0) currentIndex *= -1
      const newCharacterIndex = currentIndex % data.length
      initialOwlCarousel(newCharacterIndex)
    })

    initialOwlCarousel(currentIndex)
  },
}

const scrollMagic = {
  init: function () {
    this.config()
  },
  config: function () {
    const tween = new TimelineLite()

    const land1Bezier = {
      curviness: 0,
      autoRotate: false,
      values: [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
      ],
    }

    const land2Bezier = {
      curviness: 0,
      autoRotate: false,
      values: [
        { x: 0, y: 0 },
        { x: -100, y: 0 },
      ],
    }

    tween.add(
      [
        TweenLite.to(".land.land1", 2, {
          bezier: land1Bezier,
          ease: Power1.easeInOut,
        }),
        TweenLite
        .to(".land.land2", 2, {
          bezier: land2Bezier,
          ease: Power1.easeInOut,
        }),
      ]
      
    )

    const controller = new ScrollMagic.Controller()

    const scene = new ScrollMagic.Scene({
      triggerElement: ".background-page",
      duration: 1500,
      triggerHook: 0.5,
    })

    scene
      .setTween(tween)
      // .addIndicators()
      .addTo(controller)
  },
}

const wowJs = {
  init: function() {
    this.config()
  },
  config: function() {
    new WOW({
      animateClass: 'animate__animated',
    }).init();
  }
}