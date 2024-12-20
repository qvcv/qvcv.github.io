document.addEventListener('DOMContentLoaded', () => {
    const audioFiles = [
        'audios/song1.mp3', 
        'audios/song2.mp3', 
        'audios/song3.mp3', 
        'audios/song4.mp3', 
        'audios/song5.mp3', 
    ];
    
    let currentAudioIndex = 0;
    const fadeScreen = document.querySelector('.fade-screen');
    const mainContent = document.querySelector('.main-content');
    let hasPlayed = false;
    let myAudio = null;  // Declare myAudio outside the function to manage the instance.

    fadeScreen.addEventListener('click', () => {
        if (hasPlayed) return;
        hasPlayed = true;
        fadeScreen.style.opacity = '0';
        setTimeout(() => {
            mainContent.style.opacity = '1';
            startTypeWriter();
        }, 500);

        setTimeout(() => {
            fadeScreen.classList.add('hidden');
            mainContent.classList.add('visible');
            playAudio();  // Start the first audio
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

    function playAudio() {
        // Check if the audioFiles array is populated
        if (audioFiles.length === 0) {
            console.error("No audio files found!");
            return;
        }

        // If there is already an audio instance, stop it before starting the new one
        if (myAudio) {
            myAudio.pause();
            myAudio.currentTime = 0; // Reset to the beginning
        }

        myAudio = new Audio(audioFiles[currentAudioIndex]);  // Create new audio instance
        myAudio.volume = 0.001;

        // Play the audio
        myAudio.play();

        // Handle the end of the song and move to the next one
        myAudio.addEventListener('ended', function () {
            currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length;  // Move to next audio
            playAudio();  // Play the next audio in the array
        }, false);

        // Gradually increase the volume
        let volume = 0.001;
        const targetVolume = 0.10;
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

    function startTypeWriter() {
        var TxtType = function (el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
        };

        TxtType.prototype.tick = function () {
            var i = this.loopNum % this.toRotate.length;
            var fullTxt = this.toRotate[i];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

            var that = this;
            var delta = 200 - Math.random() * 100;

            if (this.isDeleting) { delta /= 2; }

            if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
            }

            setTimeout(function () {
                that.tick();
            }, delta);
        };

        var elements = document.getElementsByClassName('typewrite');
        for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }

        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    }
});