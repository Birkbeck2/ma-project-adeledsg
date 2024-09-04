/*Register plugins for GSAP library*/
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);

//Creating a function that modifies the viewbox of arrow svg depending on the media query as different css positioning was not working
function adjustSVG() {

let width = window.innerWidth;
let arrow = document.getElementById('arrow');

if (width < 1024) {
    arrow.setAttribute('viewBox', '-320 0 42 49');
} else if (width < 1200) {
    arrow.setAttribute('viewBox', '-420 0 42 49');
} else if (width > 1200) {
    arrow.setAttribute('viewBox', '-570 0 42 49');
} else {
    arrow.setAttribute('viewBox', '-150 0 42 49');
}
};

window.onload = adjustSVG;
window.onresize = adjustSVG;

/*Animation for Titles: https://gsap.com/community/forums/topic/35469-making-a-timeline-with-scrolltrigger/*/
gsap.to(".scroll-out", {
    x: () => window.innerWidth + 100, //Function pushing the div 100px to the right
    scrollTrigger:{ //method to make the animation depending on scroll
        trigger: ".scroll-out", //animation is triggered by the div scroll out
        start: "top top", //animation starts at the top of .scroll-out div
        scrub: "true", //animation depending on the scroll
        end: "bottom top", //increasing distance for smoother animation
    }
});


//Setting viewBox and creating the animation for the continent zoom depending on the media query, used https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
let continent = document.getElementById("africa-svg");

let mmSmall = gsap.matchMedia();
mmSmall.add("(max-width: 767px)", () =>{ //matching first media query
gsap.set(continent, { attr: { viewBox: "460 350 100 100" } }); 
});

let mmMediumOne = gsap.matchMedia();
mmMediumOne.add("(min-width: 768px)", () =>{  //matching second media query
gsap.set(continent, { attr: { viewBox: "460 350 120 120" } }); 
});

let mmLarge = gsap.matchMedia();
mmLarge.add("(min-width: 1200px)", () =>{ //matching fourth media query
gsap.set(continent, { attr: { viewBox: "440 380 200 200" } }); 
gsap.to(continent, { //Changing the SVG view on scroll using GSAP scrolltrigger
    attr: { viewBox: "570 470 1 1" }, //The target viewbox after animation, different for each media query as effect needs to take into consideration the screen size
    scrollTrigger: {
        trigger: '.scroll-out',
        start: "top top",
        end: "bottom top",
        scrub: true,
    }
});
});

let mmMediumTwo = gsap.matchMedia();
mmMediumTwo.add("(min-width: 1024px)", () =>{ //matching third media query
gsap.set(continent, { attr: { viewBox: "460 350 120 120" } }); 
gsap.to(continent, { 
    attr: { viewBox: "550 400 1 1" },
    scrollTrigger: {
        trigger: '.scroll-out',
        start: "top top",
        end: "bottom top",
        scrub: true,
    }
});

/*Introduction paragraph and footprints*/
gsap.set("#ff-svg, #fs-svg, #ft-svg, #fl-svg, #pf-svg", { //resizing and rotating fottprints
    scale: 8,
    rotate: 150,
});

gsap.timeline({ //timeline for this section, triggered by section with id=zero
    scrollTrigger: {
        trigger: '#zero',
        start: 'top top', 
        end: '+=100%', 
        scrub: true,   
        pin: true, // Pinning the element '#zero' when the trigger starts and unpins when the trigger ends (element is fixed during the scroll range)
    }
})
.from("#ff-svg", { 
    autoAlpha: 0,  //Footprints start from an invisible state 
    ease: "none", //Linear animation, no easing
    duration: 1,
})
.from("#fs-svg", { 
    autoAlpha: 0, 
    ease: "none",
    duration: 1,
})
.from("#ft-svg", { 
    autoAlpha: 0, 
    ease: "none",
    duration: 1
})
.from("#fl-svg", { 
    autoAlpha: 0, 
    ease: "none",
    duration: 1
})
.from("#pf-svg", { 
    autoAlpha: 0, 
    ease: "none",
    duration: 1
});

/*Chapter One */
let timelineOne = gsap.timeline({ //creating timeline to coordinate all elements in chapter one
    scrollTrigger: {
      trigger: "#one",
      start: "top top", 
      endTrigger: '#three',
      end: 'top top',
      scrub: true,
      pin: true,
      anticipatePin: 3,
    }
});

timelineOne.from("#gnu",{
  autoAlpha: 0, 
  ease: "none",
}, "start"); //

timelineOne.from("#mum",{
  autoAlpha: 0, 
  ease: "none",
},"start+=1");

timelineOne.fromTo("#paragraph-1", {
  y: 2000
}, {
  y: () => -1 * (document.getElementById("paragraph-2").offsetHeight + 400), //
  ease: "none",
}, 'start+=1');

timelineOne.fromTo("#paragraph-2", {
  y: 2000
}, {
  y: () => -1 * (document.getElementById("paragraph-2").offsetHeight + 400), 
  ease: "none",
}, 'start+=1.6');

timelineOne.from("#gazelle",{
  autoAlpha: 0, 
  ease: "none",
},"start+=1.2");

timelineOne.from("#zebra",{
  autoAlpha: 0, 
  ease: "slow",
},"start+=1.4");



/*Chapter 2*/
let timelineTwo = gsap.timeline({
    scrollTrigger: {
      trigger: '#two',
      start: 'top top', 
      endTrigger: '#five',
      end: 'top center', 
      scrub: true,   
      pin: true,
      anticipatePin: 3
    }
});

timelineTwo.to(continent,{opacity:0});

timelineTwo.to("#forest",{
    position: "absolute",
    opacity: 1, 
    duration: 5,
});

timelineTwo.fromTo("#paragraph-3", {
    y: '2000px'
}, {
    y: () => -1 * (document.getElementById("paragraph-2").offsetHeight + 500),
    ease: "none",
    duration: 10,
});

timelineTwo.to("#baobab",{
    opacity: 1, 
    duration: 4,
});

timelineTwo.to("#baobab-2",{
    opacity: 1, 
    duration: 4,
});

timelineTwo.to("#acacia",{
    opacity: 1, 
    duration: 4,
});

timelineTwo.fromTo("#paragraph-4", {
    y: '2000px'
}, {
    y: () => -1 * (document.getElementById("paragraph-2").offsetHeight + 500),
    ease: "none",
    duration: 10,
});

timelineTwo.to("#blood",{
  opacity: 1, 
});

timelineTwo.to("#blood-layer",{
  opacity: 1, 
  duration: 2,
});

/*Chapter 3 */
let timelineThree = gsap.timeline({
    scrollTrigger: {
      trigger: '#three',
      start: 'top top', 
      endTrigger: '#six',
      end: 'top center', 
      scrub: true,   
      pin: true,
    }
});
  
timelineThree.fromTo("#paragraph-5", {
    y: '2000px'
}, {
    y: () => -1 * (document.getElementById("paragraph-2").offsetHeight + 400),
    ease: "none",
    duration: 10,
});
  
gsap.from("#plain",{
    autoAlpha: 0, 
    ease: "none",
    scrollTrigger: {
      trigger: '#death',
      start: 'top top', 
      endTrigger: '#paragraph-5',
      end: 'bottom top', 
      scrub: true,   
    }
});

/*Chapter 4 */
gsap.set('#cloud-one, #cloud-two, #cloud-three', {
    attr: { viewBox: "0 0 500 500" },
});
  
gsap.set('#plant', {
    attr: { viewBox: "0 -750 1800 1900" },
});
  
let timelineFour = gsap.timeline({
    scrollTrigger: {
    trigger: '#four',
    start: 'top top', 
    endTrigger: '#seven',
    end: 'top top', 
    scrub: true, 
    pin: true,
    anticipatePin: 5,
    }
});

timelineFour.fromTo('#cloud-one, #cloud-three', {
    x: '2000px'
}, {
    x: '-2000px',
    duration: 10,  
    immediateRender: false
}, "start"
);

timelineFour.fromTo('#cloud-two', {
    x: '-2000px'
}, {
    x: '2000px',
    duration: 10, 
    immediateRender: false
}, "start");

timelineFour.fromTo("#paragraph-6", {
    y: '1000px'
}, {
    y: () => -1 * (document.getElementById("paragraph-2").offsetHeight + 400),
    ease: "none",
    duration: 5,
}, "start");

timelineFour.fromTo("#paragraph-7", {
    y: '1000px'
}, {
    y: () => -1 * (document.getElementById("paragraph-2").offsetHeight + 400),
    ease: "none",
    duration: 5,
}, "start+=4");

timelineFour.from('.green',{
    autoAlpha: 0, 
    ease: "none",
    duration: 4,
}, "start+=4.5");

timelineFour.from('#grounds',{
    autoAlpha: 0, 
    ease: "none",
    duration: 5,
}, "start+=7");

/*Chapter Five */
let timelineFive = gsap.timeline({
    scrollTrigger: {
      trigger: '#five',
      start: 'top top', 
      endTrigger: '#end',
      end: 'top top', 
      scrub: true, 
      pin: true,
      anticipatePin: 1,
    }
});
  
timelineFive.fromTo("#paragraph-8", {
    y: '1000px'
}, {
    y: () => -1 * (document.getElementById("paragraph-2").offsetHeight + 400), 
    ease: "none",
    duration: 4,
});

/*Chapter Six */
let timelineSix = gsap.timeline({
    scrollTrigger: {
      trigger: '#six',
      start: 'top top', 
      endTrigger: '#end',
      end: 'top top', 
      scrub: true, 
      pin: true,
    }
});
  
timelineSix.fromTo("#paragraph-9", {
    y: '1000px'
}, {
    y: () => -1 * (document.getElementById("paragraph-2").offsetHeight + 400), 
    ease: "none",
    duration: 5,
}, "start");
  
timelineSix.from("#jump", {
    autoAlpha: 0, 
    ease: "none",
    duration: 4,
}, "start+=1");
  
/*Chapter Seven */
let timelineSeven = gsap.timeline({
    scrollTrigger: {
      trigger: '#seven',
      start: 'top top', 
      end: '+=1000px', 
      scrub: true, 
      pin: true,
    }
});
  
timelineSeven.from('#leaf-one, #leaf-two, #repeated-wave, #cloud-five, #acacia-two, #baobab-two',{
    autoAlpha: 0, 
    ease: "none",
    duration: 4,
}, "start");
  
timelineSeven.from('#gazelle-two, #zebra-two, #gnu-mum-two',{
    autoAlpha: 0, 
    ease: "none",
    duration: 4,
}, "start+=3");
  
timelineSeven.from('#gnu-two',{
    autoAlpha: 0, 
    ease: "none",
    duration: 4,
}, "start+=9");
  
timelineSeven.fromTo("#paragraph-10", {
    y: '2000px'
}, {
    y: () =>  -1 * (document.getElementById("paragraph-2").offsetHeight + 400), 
    ease: "none",
    duration: 10,
  });
});
