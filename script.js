/*Register plugins for GSAP library*/
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);

//Creating a function that adjusts the viewbox of arrow svg depending on the media query as different css positioning was not working
function adjustSVG() {
let width = window.innerWidth;
let arrow = document.getElementById('arrow');
if (width < 1200) {
    arrow.setAttribute('viewBox', '-480 0 42 49');
} else if (width > 1200) {
    arrow.setAttribute('viewBox', '-570 0 42 49');
}
};
window.onload = adjustSVG;
window.onresize = adjustSVG;

/*Animation for Titles: https://gsap.com/community/forums/topic/35469-making-a-timeline-with-scrolltrigger/*/
/*As relatively simple animation, this is common to all media queries */
gsap.to(".scroll-out", {
    x: () => window.innerWidth + 100, //Function pushing the div 100px to the right
    scrollTrigger:{ //method to make the animation depending on scroll
        trigger: ".scroll-out", //animation is triggered by the div scroll out
        start: "top top", //animation starts at the top of .scroll-out div
        scrub: "true", //animation smoothly catch up to the scroll progress in that section https://gsap.com/docs/v3/Plugins/ScrollTrigger/?page=1
        end: "bottom top", //increasing distance for smoother animation
        anticipatePin: 1, //this helps make transitions into and out of pinned state smoother. As I have a long scrolling narrative, this helps mainting a fluid scrolling/pinning avoiding jumps https://gsap.com/community/forums/topic/26335-scrolltrigger-pin-jumpssnaps-on-triggering/
    }
});


//Animation for screens above 1024px, used https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
let mm = gsap.matchMedia();
mm.add("(min-width: 1025px) and (orientation: landscape)", () =>{ //Within this match media, which includes all screens above 1024px, I have added all my animations. This is because they depend on screen size, positioning of elements, and the animations would overload the smaller screens, see report.

let continent = document.getElementById("africa-svg");
gsap.set(continent, { attr: { viewBox: "460 390 210 210" } }); //Using gsap to immedialty apply viewbox properties to the SVG
gsap.to(continent, { //Changing the SVG view on scroll using GSAP scrolltrigger
    attr: { viewBox: "510 420 1 1" }, //The target viewbox after animation
    scrollTrigger: {
        trigger: '.scroll-out',
        start: "top top",
        end: "bottom top",
        scrub: true,
        anticipatePin: 1, 
    }
});


/*Introduction paragraph and footprints*/
gsap.set("#ff-svg, #fs-svg, #ft-svg, #fl-svg, #pf-svg", { //resizing and rotating fottprints
    scale: 8,
    rotate: 150,
});

gsap.timeline({ //timeline for this section, triggered by section with id=zero. Each chapter follow the same structure, with a timeline that starts at the corresponding chapter and ends later to give room for the scroll, then each animated elements within the chapter depends on that timeline
scrollTrigger: {
    trigger: '#zero',
    start: 'top top', 
    end: '+=100%', 
    scrub: true,   
    pin: true, // Pinning the element '#zero' when the trigger starts and unpins when the trigger ends (element is in fixed position during the scroll range)
    anticipatePin: 1, 
}
})
.from("#ff-svg", { 
    autoAlpha: 0,  //Both visibility and opacity are set at 0, meaning the svg starts from that states before beeing fully visible and opaque on scroll https://gsap.com/community/forums/topic/15361-understanding-autoalpha/
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
let timelineOne = gsap.timeline({ 
    scrollTrigger: {
      trigger: "#one",
      start: "top top", 
      endTrigger: '#three',
      end: 'top top',
      scrub: true,
      pin: true,
      anticipatePin: 1,
    }
});

timelineOne.from("#gnu",{
  autoAlpha: 0, 
  ease: "none",
}, "start");

timelineOne.from("#mum",{
  autoAlpha: 0, 
  ease: "none",
},"start+=1");

timelineOne.fromTo("#paragraph-1", { //Animating the paragraph from a starting position outside the viewport to a dynamic ending postion outside the viewport as well
  y: 2000 // Starting the animation with '#paragraph-1' positioned 2000 pixels down from its original position
}, {
  y: () => -1 * (document.getElementById("paragraph-1").offsetHeight + 400), // Dynamically setting the ending y-position. Moving '#paragraph-1' to a position above its original place by its own height plus an additional 400 pixels for larger screens to ensure it is completly out of the viewport
  ease: "none", //No easing, linear transition
}, 'start+=1'); //Delaying the start of the animation by 1sec after the start of the timeline, this way I coordinate how each elements appear in the timeline in relation to each other

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
      anticipatePin: 1,
    }
});

timelineTwo.to(continent,{opacity:0}); //making the africa SVG transparent so other eleemnts and background appear later on

timelineTwo.to("#forest",{
    position: "absolute",
    opacity: 1, 
    duration: 5,
});

timelineTwo.fromTo("#paragraph-3", {
    y: '2000px'
}, {
    y: () => -1 * (document.getElementById("paragraph-3").offsetHeight + 500),
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
    y: () => -1 * (document.getElementById("paragraph-4").offsetHeight + 500),
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
      anticipatePin: 1,
    }
});
  
timelineThree.fromTo("#paragraph-5", {
    y: '2000px'
}, {
    y: () => -1 * (document.getElementById("paragraph-5").offsetHeight + 400),
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
      anticipatePin: 1,  
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
    anticipatePin: 1,
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
    y: () => -1 * (document.getElementById("paragraph-6").offsetHeight + 400),
    ease: "none",
    duration: 5,
}, "start");

timelineFour.fromTo("#paragraph-7", {
    y: '1000px'
}, {
    y: () => -1 * (document.getElementById("paragraph-7").offsetHeight + 400),
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
    y: () => -1 * (document.getElementById("paragraph-8").offsetHeight + 400), 
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
      anticipatePin: 1,
    }
});
  
timelineSix.fromTo("#paragraph-9", {
    y: '1000px'
}, {
    y: () => -1 * (document.getElementById("paragraph-9").offsetHeight + 400), 
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
      anticipatePin: 1,
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
    y: () =>  -1 * (document.getElementById("paragraph-10").offsetHeight + 400), 
    ease: "none",
    duration: 10,
  });
});
