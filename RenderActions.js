function baseWork(timer, sceneObject) {
    var delta = (timer % 1000) / 1000.0;
    sceneObject.scale.set(delta * 2, delta * 3, 0.3)
    sceneObject.rotation.y = delta * 5
    uniforms.amplitude.value = Math.sin(timer);
    uniforms.color.value.offsetHSL(0.05 * delta, 0.003 * delta, 0.05 * delta);
    var attributes = sceneObject.geometry.attributes;
    var array = attributes.displacement.array;
    for (var i = 0, l = array.length; i < l; i += 3) {
        array[i] = 0.2 * (Math.random());
        array[i + 1] = 0.2 * (Math.random());
        array[i + 2] = 0.2 * (Math.random());
    }
    attributes.displacement.needsUpdate = true;
    renderer.render(scene, camera);
}