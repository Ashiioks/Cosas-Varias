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
};