document.addEventListener('DOMContentLoaded', () => {
    const bellWrapper = document.querySelector('.base-notifications-wrapper');
    if (!bellWrapper) return;

    const bellIcon = bellWrapper.querySelector('.base-bell-icon');
    const notificationsDropdown = bellWrapper.querySelector('.base-notifications-dropdown');
    const urlNotificaciones = bellWrapper.dataset.url;
    if (!bellIcon || !notificationsDropdown || !urlNotificaciones) return;

    function cargarNotificaciones() {
        const lista = bellWrapper.querySelector('.base-notifications-list');
        lista.innerHTML = '';

        fetch(urlNotificaciones)
            .then(res => res.ok ? res.json() : Promise.reject('Error en la respuesta'))
            .then(data => {
                if (data.notificaciones && data.notificaciones.length > 0) {
                    data.notificaciones.forEach(n => {
                        const p = document.createElement('p');
                        p.classList.add('notificacion-item');

                        if (n.toLowerCase().includes('crítico')) p.classList.add('notificacion-critica');
                        else if (n.toLowerCase().includes('bajo')) p.classList.add('notificacion-baja');
                        else if (n.toLowerCase().includes('nuevo')) p.classList.add('notificacion-nueva');

                        p.textContent = n;
                        lista.appendChild(p);
                    });
                } else {
                    const p = document.createElement('p');
                    p.classList.add('notificacion-item');
                    p.textContent = 'No hay notificaciones';
                    lista.appendChild(p);
                }
            })
            .catch(err => console.error("Error cargando notificaciones:", err));
    }

    bellIcon.addEventListener('click', e => {
        e.stopPropagation();
        const isVisible = notificationsDropdown.style.display === 'block';
        notificationsDropdown.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) cargarNotificaciones();
    });

    document.addEventListener('click', e => {
        if (!bellWrapper.contains(e.target)) notificationsDropdown.style.display = 'none';
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const userInfo = document.querySelector('.base-user-info');

    if (userInfo) {
        userInfo.addEventListener('click', () => {
            const url = userInfo.dataset.url;
            if (url) {
                window.location.href = url;
            }
        });
    }
});
