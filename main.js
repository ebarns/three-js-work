var renderer, scene, camera, stats;
var bigTextDaddy, uniforms;
var orbitControls;
var loader = new THREE.FontLoader();
var timer = 0;

loader.load('./font.json', function (font) {
    init(font);
    animate();
});

function init(font) {
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 50;
    camera.position.y = 0;
    orbitControls = new THREE.OrbitControls(camera);
    orbitControls.update();
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x00053);

    createTextObject(font, "F R E A K");
    createRenderer();
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
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    var container = document.getElementById('container');
    container.appendChild(renderer.domElement);
    //
    window.addEventListener('resize', onWindowResize, false);
}

function render() {
    var delta = (timer % 1000) / 1000.0;
    bigTextDaddy.scale.set(delta * 2, delta * 3, 0.3)
    bigTextDaddy.rotation.y = delta * 5
    uniforms.amplitude.value = Math.sin(timer);
    uniforms.color.value.offsetHSL(0.05 * delta, 0.003 * delta, 0.05 * delta);
    var attributes = bigTextDaddy.geometry.attributes;
    var array = attributes.displacement.array;
    for (var i = 0, l = array.length; i < l; i += 3) {
        array[i] = 0.2 * (Math.random());
        array[i + 1] = 0.2 * (Math.random());
        array[i + 2] = 0.2 * (Math.random());
    }
    attributes.displacement.needsUpdate = true;
    renderer.render(scene, camera);
    timer++;
}

