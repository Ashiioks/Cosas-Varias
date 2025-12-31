window.onload = function () {
    var elements = {
        cd: document.getElementById("cd"),
        cd_title: document.getElementById("cd-title"),
        cd_days: document.getElementById("cd-days"),
        cd_hours: document.getElementById("cd-hours"),
        cd_mins: document.getElementById("cd-mins"),
        cd_secs: document.getElementById("cd-secs"),
        cd_timetil: document.getElementById("cd-timetil"),
    };

    // Control de música
    const bgMusic = document.getElementById("background-music");
    const muteBtn = document.getElementById("mute-btn");
    const muteIcon = document.getElementById("mute-icon");
    let isMuted = false;

    // Intentar reproducir la música automáticamente
    bgMusic.volume = 0.3; // Volumen al 30%
    bgMusic.play().catch(function(error) {
        console.log("Reproducción automática bloqueada. Haz clic para activar la música.");
    });

    // Toggle mute/unmute
    muteBtn.addEventListener("click", function() {
        isMuted = !isMuted;
        bgMusic.muted = isMuted;
        muteIcon.textContent = isMuted ? "🔇" : "🔊";
    });

    // Crear estrellas parpadeantes
    createStars();

    function createStars() {
        const starsContainer = document.getElementById("stars-container");
        const numStars = 100;
        
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement("div");
            star.className = "star";
            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";
            star.style.width = Math.random() * 3 + 1 + "px";
            star.style.height = star.style.width;
            star.style.animationDelay = Math.random() * 3 + "s";
            star.style.animationDuration = Math.random() * 3 + 2 + "s";
            starsContainer.appendChild(star);
        }
    }

    elements.cd_title.innerHTML += " " + (new Date().getFullYear() + 1);
    var endDate = new Date(new Date().getFullYear() + 1 + "/1/1"),
        sec = 1000,
        min = sec * 60,
        hour = min * 60,
        day = hour * 24;

    elements.cd_timetil.innerHTML = "Tiempo hasta " + endDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    var cdInterval = setInterval(function () {
        var nowDate = new Date(),
            dif = endDate.getTime() - nowDate.getTime();

        if (dif <= 0) {
            elements.cd_title.classList.add("cd__title--newyear");
            elements.cd_title.innerHTML = " ¡Feliz Año Nuevo 2026! ";
            elements.cd.insertAdjacentHTML(
                "beforeend",
                '<div class="celebrate"> ¡Disfruta la celebración! </div>'
            );

            setInterval(() => createFloatingEmojis(), 200);
            setInterval(() => createFirework(), 300);
            return clearInterval(cdInterval);
        }
        var days = Math.floor(dif / day),
            hours = Math.floor((dif % day) / hour),
            mins = Math.floor((dif % hour) / min),
            secs = Math.floor((dif % min) / sec);
        elements.cd_days.innerHTML = ("000" + days).slice(-3);
        elements.cd_days.nextElementSibling.innerHTML = "Día" + (days == 1 ? "" : "s");
        elements.cd_hours.innerHTML = ("00" + hours).slice(-2);
        elements.cd_hours.nextElementSibling.innerHTML = "Hora" + (hours == 1 ? "" : "s");
        elements.cd_mins.innerHTML = ("00" + mins).slice(-2);
        elements.cd_mins.nextElementSibling.innerHTML = "Minuto" + (mins == 1 ? "" : "s");
        elements.cd_secs.innerHTML = ("00" + secs).slice(-2);
        elements.cd_secs.nextElementSibling.innerHTML = "Segundo" + (secs == 1 ? "" : "s");
    }, 1000);

    function createFloatingEmojis() {
        const emojiList = ["🎉", "🎊", "✨", "🎆", "🎇"];
        for (let i = 0; i < 10; i++) {
            const emoji = document.createElement("div");
            emoji.className = "floating-emoji";
            emoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
            emoji.style.left = Math.random() * 100 + "vw";
            emoji.style.animationDuration = Math.random() * 2 + 4 + "s";
            emoji.style.fontSize = Math.random() * 1.5 + 1.5 + "em";
            document.body.appendChild(emoji);
            setTimeout(() => emoji.remove(), 3000);
        }
    }

    function createFirework() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff1493'];
        const firework = document.createElement('div');
        firework.style.position = 'fixed';
        firework.style.left = Math.random() * 100 + '%';
        firework.style.top = Math.random() * 60 + 20 + '%';
        firework.style.width = '4px';
        firework.style.height = '4px';
        firework.style.pointerEvents = 'none';
        firework.style.zIndex = '9999';
        document.body.appendChild(firework);

        // Crear partículas del fuego artificial
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 50 + Math.random() * 50;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.position = 'absolute';
            particle.style.width = '3px';
            particle.style.height = '3px';
            particle.style.backgroundColor = color;
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
            
            firework.appendChild(particle);
            
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.animate([
                { transform: 'translate(0, 0)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0, 0.9, 0.1, 1)'
            });
        }
        
        setTimeout(() => firework.remove(), 2000);
    }
};