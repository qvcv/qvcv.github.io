document.addEventListener('DOMContentLoaded', () => {
    const fadeScreen = document.querySelector('.fade-screen');
    const mainContent = document.querySelector('.main-content');

    fadeScreen.addEventListener('click', () => {
        fadeScreen.style.opacity = '0';
        setTimeout(() => {
	    mainContent.style.opacity = '1';
        }, 500);

        setTimeout(() => {
            fadeScreen.classList.add('hidden'); 
            mainContent.classList.add('visible'); 
            playAudio(); 
        }, 1000); 
    });

    const checkDevTools = setInterval(() => {
        const threshold = 160;
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;

        if (widthDiff > threshold || heightDiff > threshold) {
            clearInterval(checkDevTools);
            window.history.back();
        }

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
    
    let volume = 0; 
    const targetVolume = 0.15; 
    const volumeStep = 0.002; 
    const intervalTime = 75; 

    const volumeIncrease = setInterval(() => {
        if (volume < targetVolume) {
            volume += volumeStep;
            myAudio.volume = volume; 
        } else {
            clearInterval(volumeIncrease); 
        }
    }, intervalTime);
}