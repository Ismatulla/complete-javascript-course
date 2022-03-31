'use strict';
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// tabs
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
    //
const header = document.querySelector('.header')
const allSections = document.querySelectorAll('.section')
const message = document.createElement('div')
    //
const nav = document.querySelector('nav')
    //
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
    //
const imgTargets = document.querySelectorAll('img[data-src]')
    //
const slider = document.querySelector('.slider')
const slides = document.querySelectorAll('.slide')
const btnRight = document.querySelector('.slider__btn--right')
const btnLeft = document.querySelector('.slider__btn--left')
    //
const dotContainer = document.querySelector('.dots')
    //
const openModal = function(e) {
    e.preventDefault()
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//
//navbar fadeout ///
const handleHover = (e, opacity) => {
    e.preventDefault()
    if (e.target.classList.contains('nav__link')) {
        const link = e.target
        const siblings = link.closest('.nav').querySelectorAll('.nav__link')
        const logo = link.closest('.nav').querySelector('img')
        siblings.forEach(el => {
            if (el !== link) el.style.opacity = opacity
        })
        logo.style.opacity = opacity

    }
}


nav.addEventListener('mouseover', (e) => handleHover(e, 0.5))
nav.addEventListener('mouseout', (e) => handleHover(e, 1))

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// Sticky navigation :Intersection observer API
const navHeight = nav.getBoundingClientRect().height
const stickyNav = (entries) => {
    const [entry] = entries
    if (!entry.isIntersecting) nav.classList.add('sticky')
    else nav.classList.remove('sticky')
}
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
})
headerObserver.observe(header)
    // Reveal Section ////////////
const revealSection = (entries, observer) => {
    const [entry] = entries
    if (!entry.isIntersecting) return
    entry.target.classList.remove('section--hidden')
    observer.unobserve(entry.target);
}
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
})
allSections.forEach(section => {
        sectionObserver.observe(section);
        // section.classList.add('section--hidden')
    })
    /////////////////////////////

//////
// scrolling
btnScrollTo.addEventListener('click', () => {
    // scrolling
    //----this is an old way of smooth scroll----//
    // const s1coords = section1.getBoundingClientRect()
    // window.scrollTo({
    //     left: s1coords.left + window.pageXOffset,
    //     top: s1coords.top + window.pageYOffset,
    //     behavior: 'smooth'
    // })
    //----------------------------------------//
    //modern way of doing it 

    section1.scrollIntoView({ behavior: "smooth" })
})

// page navigation 
//   1====> this way of attaching event listener to each child element is not so good solution because it creates copy of callback function each time when we click particular "li" element ,that can affect performance when we have more elements then it should iterate through all elements and trigger an event , that is why we are introduced event propogation which means we only have to atach an event listener one common parent of all elements and due to event propogation behaviour of js it just traverse down to element which we clicked instead of looping and creating copy of the eventlistener function  each time
// document.querySelectorAll('.nav__link').forEach((el) => {
//         el.addEventListener('click', (e) => {
//             e.preventDefault()
//             const id = e.target.getAttribute('href')
//             const scrollToSection = document.querySelector(id)
//             scrollToSection.scrollIntoView({ behavior: "smooth" })
//         })
//     })

// 2====> SOLUTION THAT WE HAVE TO USE
document.querySelector('.nav__links').addEventListener('click', (e) => {
        e.preventDefault()
        if (e.target.classList.contains('nav__link')) {
            const id = e.target.getAttribute('href')
            document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
        }
    })
    // Table component

tabsContainer.addEventListener('click', (e) => {
        // active tab
        const clicked = e.target.closest('.operations__tab')
        if (!clicked) return
        tabs.forEach(t => t.classList.remove('operations__tab--active'))
        tabsContent.forEach(c => c.classList.remove('operations__content--active'))
        clicked.classList.add('operations__tab--active')
            // active content
        document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

    })
    //
    // img blur
const loadImg = function(entries, observer) {
    const [entry] = entries
    if (!entry.isIntersecting) return
        //replace src with data-src
    entry.target.src = entry.target.dataset.src
    entry.target.addEventListener('load', () => {
        entry.target.classList.remove('lazy-img')
    })
    observer.unobserve(entry.target)
}
const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px'
})
imgTargets.forEach(img => imgObserver.observe(img))

/////////=======  slider component =====/////////
let curSlide = 0
let maxSlideLength = slides.length
const goToSlide = (slide) => {
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`)
}
goToSlide(0)
    ///slide with dots 
const activeDot = function(slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')

}
const createDots = function() {
    slides.forEach((_, i) => {
        dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
    })

}
createDots()
dotContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('dots__dot')) {
        const { slide } = e.target.dataset
        goToSlide(slide)
        activeDot(slide)
    }
})
activeDot(0)
    ////////////////////
    // Next Slide
const nextSlide = () => {
    if (curSlide === maxSlideLength - 1) {
        curSlide = 0
    } else {
        curSlide++
    }
    goToSlide(curSlide)
    activeDot(curSlide)
}
btnRight.addEventListener('click', nextSlide)

// Prev slide

const prevSlide = function() {
    if (curSlide === 0) {
        curSlide = maxSlideLength - 1
    } else {
        curSlide--

    }
    goToSlide(curSlide)
    activeDot(curSlide)
}

btnLeft.addEventListener('click', prevSlide)




///////////////////////////////////////////////


message.classList.add('cookie-message')

message.innerHTML = 'We use cookies for improved functionality and analytics<button class="btn btn--close-cookie">Got it!</button>'
header.append(message)
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
        message.remove()
            // message.removeChild(message) old way of doing , you have to choose parent element and traverse throught to child element and give the name of child into paranthesis that should be removed from dom 

    })
    // styles
message.style.backgroundColor = '#37383d'
message.style.width = '100%';
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'