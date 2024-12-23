document.addEventListener('DOMContentLoaded', () => {
	const audioFiles = [
		'audios/REVOLVER - Lil Darkie.mp3',
		'audios/DARKIE STILL CANNOT RAP PT. 1 (REMIX) - Lil Darkie.mp3',
		'audios/When You Gone - LUKEBIKE & Lil Darkie.mp3', 
		'audios/ELECTRIC DANDELIONS - Lil Darkie.mp3', 
		'audios/ANXIETY - Lil Darkie.mp3', 
		'audios/just a little bit longer - Lil Darkie & CHRIST DILLINGER.mp3', 
		'audios/where is darkie - Lil Darkie.mp3', 
		'audios/MARY JANE - Lil Darkie.mp3',
		'audios/EGO DEATH - Lil Darkie.mp3',
	];

	let currentAudioIndex = 0;
	const fadeScreen = document.querySelector('.fade-screen');
	const mainContent = document.querySelector('.main-content');
	let hasPlayed = false;
	let myAudio = null;

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
			playAudio();  
		}, 1000);
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
	
	nextButton.addEventListener('click', () => {
		currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length;
		playAudio();
	});

	prevButton.addEventListener('click', () => {
		currentAudioIndex = (currentAudioIndex - 1 + audioFiles.length) % audioFiles.length;
		playAudio();
	});
	
	function playAudio() {
		if (audioFiles.length === 0) {
			console.error("No audio files found!");
			return;
		}

		if (myAudio) {
			myAudio.pause();
			myAudio.currentTime = 0; 
		}

		myAudio = new Audio(audioFiles[currentAudioIndex]);  
		myAudio.volume = 0.0001;

		myAudio.play();

		const currentSongElement = document.getElementById('currentSong');
		currentSongElement.textContent = audioFiles[currentAudioIndex].split('/').pop().replace('.mp3', '');

		myAudio.addEventListener('ended', function () {
			currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length;  
			playAudio();  
		}, false);

		let volume = 0.0001;
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
		