
const cursos = {
    'sem1': [
        { id: 'intro', nombre: 'Introducción al cuidado de enfermería', prereqs: [] },
        { id: 'bases1', nombre: 'Bases I', prereqs: [] },
        { id: 'comunicacion', nombre: 'Comunicación efectiva', prereqs: [] },
        { id: 'desarrollo', nombre: 'Desarrollo personal', prereqs: [] }
    ],
    'sem2': [
        { id: 'adulto', nombre: 'Cuidado de enfermería al adulto y adulto mayor', prereqs: ['intro'] },
        { id: 'bases2', nombre: 'Bases II', prereqs: ['bases1'] },
        { id: 'desarrollo2', nombre: 'Desarrollo evolutivo del ser humano', prereqs: ['desarrollo'] }
    ],
    'sem3': [
        { id: 'nino', nombre: 'Cuidado de enfermería al niño y adolescente', prereqs: ['adulto'] },
        { id: 'bases_terapeuticas', nombre: 'Bases terapéuticas', prereqs: ['bases2'] },
        { id: 'investigar', nombre: 'Bases para investigar', prereqs: [] },
        { id: 'ingles', nombre: 'Inglés básico', prereqs: [] }
    ],
    'sem4': [
        { id: 'familia', nombre: 'Cuidado de enfermería a la familia y comunidad', prereqs: ['nino'] },
        { id: 'bases_socio', nombre: 'Bases socioculturales del cuidado', prereqs: ['desarrollo2'] },
        { id: 'estadistica', nombre: 'Estadística aplicada a la investigación', prereqs: ['investigar'] }
    ],
};

const aprobados = new Set();

function crearMalla() {
    const malla = document.getElementById('malla');
    for (const semestre in cursos) {
        const columna = document.createElement('div');
        columna.className = 'semestre';
        columna.innerHTML = `<h3>${semestre.toUpperCase()}</h3>`;
        cursos[semestre].forEach(curso => {
            const btn = document.createElement('button');
            btn.textContent = curso.nombre;
            btn.className = 'curso';
            btn.id = curso.id;
            btn.disabled = !curso.prereqs.every(pr => aprobados.has(pr));
            btn.onclick = () => {
                if (!btn.classList.contains('aprobado')) {
                    btn.classList.add('aprobado');
                    aprobados.add(curso.id);
                    actualizarMalla();
                }
            };
            columna.appendChild(btn);
        });
        malla.appendChild(columna);
    }
}

function actualizarMalla() {
    document.getElementById('malla').innerHTML = '';
    crearMalla();
}

window.onload = () => {
    crearMalla();
};
