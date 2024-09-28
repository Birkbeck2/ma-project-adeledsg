/*Register plugins for GSAP library*/
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);

//Creating a function that adjusts the viewbox of arrow svg depending on the media query as different css positioning was not working
function adjustSVG() {
    let width = window.innerWidth;
    let arrow = document.getElementById('arrow');
    if (width <= 1200) {
        arrow.setAttribute('viewBox', '-480 0 42 49');
    } else {
        arrow.setAttribute('viewBox', '-570 0 42 49');
    }
}

window.onload = adjustSVG;
window.onresize = adjustSVG;



//Animation for screens above 1024px and in landscape as smaller screen have the static reading layout, used https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
let mm = gsap.matchMedia();
mm.add("(min-width: 1025px) and (orientation: landscape)", () =>{ //Within this match media, which includes all screens above 1024px, I have added all my animations, smaller screens do not have the same css and experience implemented see report.

/*Animation for Titles*/
gsap.to(".scroll-out", {
    x: () => window.innerWidth + 100, //Function returning the window width plus 100, giving .scroll-out the position it will got to with gsap.to
    scrollTrigger:{ //method to make the animation/move to the above calculated x value, depending on scroll
        trigger: ".scroll-out", //animation is triggered by the div scroll out
        start: "top top", //animation starts at the top of .scroll-out div
        scrub: true, //animation smoothly catch up to the scroll progress in that section https://gsap.com/docs/v3/Plugins/ScrollTrigger/?page=1
        end: "bottom top", //increasing distance for smoother animation
        anticipatePin: 1, //this helps make transitions into and out of pinned state smoother. As I have a long scrolling narrative, this helps mainting a fluid scrolling/pinning avoiding jumps https://gsap.com/community/forums/topic/26335-scrolltrigger-pin-jumpssnaps-on-triggering/
    }
});

gsap.to("#indication",{
    duration: 1, //animation takes 1 sec to complete
    opacity: 0, //the indication div will go to 0 opacity, depending on scroll, same as above.
    ease: "none", //aniamtion moves at a steady, linear rate from start to end.
    scrollTrigger:{
        trigger: ".scroll-out",
        start: "top top", 
        scrub: true, 
        end: "bottom top",
        anticipatePin: 1, 
    }
});


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

//https://gsap.com/community/forums/topic/35469-making-a-timeline-with-scrolltrigger/
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
    ease: "none",
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
      end: '+=3000',
      scrub: true,
      pin: true,
      anticipatePin: 1,
    }
});

timelineOne.from("#gnu",{
  autoAlpha: 0, 
  ease: "none",
  duration: 2,
}, "start"); //The animation applied to Gnu starts when the timeline starts

timelineOne.from("#mum",{
  autoAlpha: 0, 
  ease: "none",
  duration: 2,
},"start+=1"); //The animation applied to the mum starts one second after the start of the timeline

timelineOne.fromTo("#paragraph-1", { //Animating the paragraph from a starting position outside the viewport to a dynamic ending postion outside the viewport as well
  y: '1000px' // Starting the animation with '#paragraph-1' positioned 1000 pixels down from its original position
}, {
  y: () => -1 * (document.getElementById("paragraph-1").offsetHeight + 400), // Dynamically setting the ending y-position. Moving '#paragraph-1' to a position above its original place by its own height plus an additional 400 pixels to ensure it is completly out of the viewport (same principle as title moving on the x axis)
  ease: "power1.inOut", //Predefined easing function in gsap, power refers to the strengh of the easing cruve with 1 being relatively mild, inOut means the start and end are slow. I implemented this for all paragraphs to control their speed, making sure they dont arrive and leave the viewport to abruptly and are not missed by the reader https://gsap.com/docs/v3/Eases/
  duration: 5,
}, 'start+=1.3'); //Delaying the start of the animation by 1.3sec after the start of the timeline, this way I coordinate how each elements appear in the timeline in relation to each other

timelineOne.fromTo("#paragraph-2", {
  y: '1000px'
}, {
  y: () => -1 * (document.getElementById("paragraph-2").offsetHeight + 400), 
  ease: "power1.inOut",
  duration: 5,
}, 'start+=5');

timelineOne.from("#gazelle",{
  autoAlpha: 0, 
  ease: "none",
  duration: 2,
},"start+=5.2");

timelineOne.from("#zebra",{
  autoAlpha: 0, 
  ease: "none",
  duration: 2,
},"start+=6");


let sketch = function(p) { //Creating a rain transition. To do so, I am creating a function that takes a p5 instance to seperate from the global name space and thus other libraries https://www.youtube.com/watch?v=Su792jEauZg. This video https://www.youtube.com/watch?v=YQysSfaLDyo helped me create the rain object and then I modified variables to display it differently visually and I then incorporated GSAP timeline.
    let rains = []; //array holding the rain objects declared in the rain class below

    p.setup = function() { //the set up function allows me to create the canvas element and initialise all variables https://p5js.org/reference/p5/setup/, this function runs once when the sktech starts.
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight +10 ); //Creating the canvas and asssigning its width to match the width of the viewport and the height to be the same as the viewport but with an extra 10px to smooth the colour transition with the next chapter
        canvas.id("myCanvas"); //assigning id name to help with manipulating the canvas with GSAP
        canvas.parent('sketch-holder'); //assigning the 'sketch-holder div' as the parent element of the canvas https://p5js.org/reference/p5.Element/parent/
        p.background(48, 48, 50); //setting the background colour, same as next chapter for the transition
        canvas.style('opacity', '0'); //initailly setting the canvas to be fully transparent

        timelineOne.to('#myCanvas', { //animating canvas on the same timeline as zebra, gzaelle, gnu, etc. It will become fully opaque, hiding all elements and starts 2sec after the timeline
            opacity: 1,
            duration: 5,
        }, "start+=9");
    };
  
    p.draw = function() { //the draw function, all code here runs repeatadly as a loop
        p.background(48, 48, 50); //the background needs to be declared again as it runs in a loop, it is reset at every frame, illusion of drops of rain instead of lines
        for (let r of rains) { // Iterating over all rain objects created below in the array and calling their show and update methods.
            r.show();
            r.update();
        }

        if (rains.length < 500) {  // Continuously pushing rain objects into the array until there are 500 on the screen.
            rains.push(new Rain(p.random(p.width), 0));
        }
    };
  
    class Rain { //class declaration, creating rain objects https://p5js.org/reference/p5/class/ and https://www.youtube.com/watch?v=YQysSfaLDyo 
        constructor(x, y) { //creating the Rain object
            this.pos = p.createVector(x, y); //assigning inital position of the vector using p5 createvector for x and y coordinates https://p5js.org/reference/p5/createVector/
            this.vel = p.createVector(0, p.random(1, 5)); //the instance vel property is set in a downward direction (from 0 to a random position between 1 and 5)
            this.len = p.random(10, 20); //randomly setting a lenght between 10 and 20 px
            this.opa = p.random(1, 255); //assigning a random number for the opacity between 0 minimum opacity so transparent and 255, maximum level of opacity.
        }
  
        show() { //method to display the raindrops
            p.stroke(221, 221, 221, this.opa); //setting the stroke color and its opacity defined randomly above
            p.line(this.pos.x, this.pos.y, this.pos.x, this.pos.y - this.len); //drawing the rain drops as a line. 
        }
  
        update() { // Method to update the raindrop's position.
            this.pos.add(this.vel); // Moving the raindrop by its velocity
            if (this.pos.y > p.height + 50) {  // Checking if the raindrop has moved beyond the canvas height and removing it from the array if so to avoid lagging.
                let index = rains.indexOf(this);
                if (index > -1) {
                    rains.splice(index, 1);
                }
            }
        }
    }
};

new p5(sketch); // Instantiating the sketch by passing the defined function to the p5 constructor.


/*Chapter 2*/
let timelineTwo = gsap.timeline({
    scrollTrigger: {
      trigger: '#two',
      start: 'top top', 
      end: '+=3000', 
      scrub: true,   
      pin: true,
      anticipatePin: 1,
    }
});

timelineTwo.to(continent,{opacity:0}); //making the africa SVG transparent 

timelineTwo.to("#forest",{
    position: "absolute",
    opacity: 1, 
    duration: 5,
});

timelineTwo.fromTo("#paragraph-3", {
    y: '1000px'
}, {
    y: () => -1 * (document.getElementById("paragraph-3").offsetHeight + 600),
    ease: "power1.inOut",
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
    y: '1000px'
}, {
    y: () => -1 * (document.getElementById("paragraph-4").offsetHeight + 600),
    ease: "power1.inOut",
    duration: 10,
});

timelineTwo.to("#blood",{
  opacity: 1, 
});

timelineTwo.to("#blood-layer",{
  opacity: 1, 
  duration: 10,
}, "start+=10");

/*Chapter 3 */
let timelineThree = gsap.timeline({
    scrollTrigger: {
      trigger: '#three',
      start: 'top top', 
      end: '+=3000', 
      scrub: true,   
      pin: true,
      anticipatePin: 1,
    }
});
  
timelineThree.fromTo("#paragraph-5", {
    y: '1000px'
}, {
    y: () => -1 * (document.getElementById("paragraph-5").offsetHeight + 400),
    ease: "power1.inOut",
    duration: 8,
}, "start");
  
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
},"start+=2");

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
}, "start"
);

timelineFour.fromTo('#cloud-two', {
    x: '-2000px'
}, {
    x: '2000px',
    duration: 10, 
}, "start");

timelineFour.fromTo("#paragraph-6", {
    y: '1000px'
}, {
    y: () => -1 * (document.getElementById("paragraph-6").offsetHeight + 400),
    ease: "power1.inOut",
    duration: 5,
}, "start");

timelineFour.fromTo("#paragraph-7", {
    y: '1000px'
}, {
    y: () => -1 * (document.getElementById("paragraph-7").offsetHeight + 400),
    ease: "power1.inOut",
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
    ease: "power1.inOut",
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
    y: '1000px'
}, {
    y: () =>  -1 * (document.getElementById("paragraph-10").offsetHeight + 400), 
    ease: "power1.inOut",
    duration: 10,
  });
});
