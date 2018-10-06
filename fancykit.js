function createShaderMaterial() {
    uniforms = {
        amplitude: {value: 1.0},
        opacity: {value: 0.8},
        color: {value: new THREE.Color(0xff0000)}
    };

    return new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true
    });
}


function createTextObject(font, message) {
    var textGeo = new THREE.TextGeometry(message, {
        font: font,
        size: 20,
        height: 30,
        steps: 3
    });
    textGeo.center();
    textGeo.translate(0, 1.0, 0);
    var vertices = textGeo.vertices;
    var position = emptyBufferAttribute(vertices).copyVector3sArray(vertices);
    var bufferGeo = new THREE.BufferGeometry();
    bufferGeo.addAttribute('position', position);

    var displacement = emptyBufferAttribute(vertices);
    bufferGeo.addAttribute('displacement', displacement);

    var customColor = emptyBufferAttribute(vertices);
    bufferGeo.addAttribute('customColor', customColor);
    var color = new THREE.Color(0xff0000);
    for (var i = 0, l = customColor.count; i < l; i++) {
        color.setHSL(i / l, 0.5 * i, 0.5);
        color.toArray(customColor.array, i * customColor.itemSize);
    }

    bigTextDaddy = new THREE.Line(bufferGeo, createShaderMaterial());
    scene.add(bigTextDaddy);
}

function emptyBufferAttribute(vertices) {
    return new THREE.Float32BufferAttribute(vertices.length * 3, 3)
}