const canvas = document.getElementById('network');
const ctx = canvas.getContext('2d');

let width, height;
const nodes = [];
const maxDistance = 120;
let numNodes = window.innerWidth < 768 ? 10 : 40; // Modo móvil: 10 nodos, escritorio: 40

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = 200; // Altura del footer animado

    // Ajustar el número de nodos al cambiar de tamaño
    numNodes = window.innerWidth < 768 ? 10 : 40;
    nodes.length = 0; // Vaciar el array
    createNodes(); // Volver a crearlos
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Crear nodos aleatorios
function createNodes() {
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1 // Tamaño aleatorio
        });
    }
}
createNodes();

function draw() {
    ctx.clearRect(0, 0, width, height);

    // Dibujar conexiones entre nodos
    nodes.forEach((node, i) => {
        for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const distance = Math.hypot(node.x - other.x, node.y - other.y);

            if (distance < maxDistance) {
                ctx.strokeStyle = `rgba(0, 170, 255, ${1 - distance / maxDistance})`; // Azul Neón
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
            }
        }
    });

    // Dibujar nodos con efecto glow
    nodes.forEach(node => {
        ctx.fillStyle = 'rgba(0, 170, 255, 1)'; // Azul Neón
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(0, 170, 255, 0.8)';

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();

        // Movimiento
        node.x += node.vx;
        node.y += node.vy;

        // Rebote en bordes
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
    });

    requestAnimationFrame(draw);
}

draw();



// inicio





// Animaciones en servicios al hacer scroll
function revealServices() {
    const services = document.querySelectorAll('.service-card');
    const windowHeight = window.innerHeight;
    services.forEach(service => {
        const position = service.getBoundingClientRect().top;
        if (position < windowHeight - 50) {
            service.classList.add('show');
        }
    });
}
window.addEventListener('scroll', revealServices);
// nombre escribriendo 

const text = "Dr Laptop";
const speed = 100; // milliseconds per character
let i = 0;

function typeWriter() {
    if (i < text.length) {
        document.getElementById("text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

window.onload = typeWriter;
// 


// 
