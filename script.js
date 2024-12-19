document.addEventListener('DOMContentLoaded', () => {
    const fadeScreen = document.querySelector('.fade-screen');
    fadeScreen.addEventListener('click', () => {
        fadeScreen.style.opacity = '0';
        setTimeout(() => {
            fadeScreen.classList.add('hidden');
            playAudio();
        }, 50);
    });

    const checkDevTools = setInterval(() => {
        const threshold = 160;
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;

        // Detect DevTools using screen size differences
        if (widthDiff > threshold || heightDiff > threshold) {
            clearInterval(checkDevTools);
            window.history.back();
        }

        // Detect DevTools using `console` behavior
        const devtoolsOpened = /./;
        devtoolsOpened.toString = () => 'devtools';
        console.debug(devtoolsOpened);
        if (console.debug.toString() === devtoolsOpened.toString()) {
            clearInterval(checkDevTools);
            window.history.back();
        }
    }, 5);
});
document.onkeydown = function(e) {
    if(event.keyCode == 123) {
        return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        alert("piss off skidatron");
        return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        alert("piss off skidatron");
        return false;
    }
    if(e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) {
        alert("piss off skidatron");
        return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        alert("piss off skidatron");
        return false;
    }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        alert("piss off skidatron");
        return false;
    }
};

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.getElementById('site').hidden = true;

function playAudio() {
    const myAudio = new Audio('music.mp3'); 
    if (typeof myAudio.loop == 'boolean') {
        myAudio.loop = true;
    } else {
        myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }
    myAudio.play();
    
    let volume = 0; // Initial volume
    const targetVolume = 0.15; // Target volume
    const volumeStep = 0.004; // Volume increment
    const intervalTime = 75; // Time in milliseconds for each volume increment
    
    // Function to increase volume until it reaches the target volume
    const volumeIncrease = setInterval(() => {
        if (volume < targetVolume) {
            volume += volumeStep;
            myAudio.volume = volume; // Set the audio volume
        } else {
            clearInterval(volumeIncrease); // Stop the interval when target volume is reached
        }
    }, intervalTime);
}
