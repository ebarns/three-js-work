const renderer = new THREE.WebGLRenderer({antialias: true});
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
const scene = new THREE.Scene();
const orbitControls = new THREE.OrbitControls(camera);

var bigTextDaddy, uniforms;
const loader = new THREE.FontLoader();
var timer = 0;

loader.load('./font.json', function (font) {
    init(font);
    createRenderer();
    animate();
});

function init(font) {
    camera.position.z = 50;
    camera.position.y = 0;
    orbitControls.update();
    scene.background = new THREE.Color(0x00053);
    bigTextDaddy = createTextObject(font, "F R E A K");
    scene.add(bigTextDaddy);
}


function animate() {
    requestAnimationFrame(animate);
    orbitControls.update();
    render();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function createRenderer() {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    var container = document.getElementById('container');
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
}

function render() {
    baseWork(timer, bigTextDaddy);
    timer++;
}

