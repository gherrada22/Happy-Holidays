const message = "Happy Holidays!";

!function() {
    "use strict";
    let e, t, n, o, a, r, s, E, i, l, h, d, c = 1, m = "", w = [];
    const u = 1, T = new THREE.Layers();
    T.set(u);
    const R = {
        exposure: 2,
        bloomStrength: 2,
        bloomThreshold: 0,
        bloomRadius: 0
    }, H = new THREE.MeshBasicMaterial({
        color: "black"
    }), p = {}, M = new THREE.Vector3(), f = new THREE.Matrix4();
    let g = new THREE.Vector3();
    const y = new THREE.Euler();
    let S = new THREE.Quaternion();
    const P = new THREE.Vector3(1, 1, 1), b = new THREE.Vector3(0, 0, 0);
    new THREE.Matrix4(), new THREE.Vector3(0, 1, 0);
    function x(e, n, o) {
        let a, r = n.length, s = new THREE.InstancedMesh(E.geometry, E.material, r);
        s.castShadow = !0, S.set(0, 0, 0, 0);
        for (let t = 0; t < r; t++) M.set(n[t][0], n[t][1], n[t][2]), g = M, "ico" != o && "green" != o || (y.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI), 
        S.setFromEuler(y)), 1 != e && P.set(e, e, e), f.compose(g, S, P), a = "green" == o ? new THREE.Color().setHSL(THREE.MathUtils.randFloat(.25, .4), 1, .18) : "ico" == o ? new THREE.Color().setHSL(Math.random(), 1, .85) : "bloom" == o ? new THREE.Color().setHSL(Math.random(), 1, .5) : new THREE.Color().setHSL(Math.random(), 1, .8), 
        s.setMatrixAt(t, f), s.setColorAt(t, a);
        if ("bloom" == o) {
            setInterval(function() {
                s.layers.toggle(u), A();
            }, 1e3);
        }
        t.add(s);
    }
    function B(e) {
        let t = this.attributes.position;
        if (null != this.index) return;
        let n = t.count / 3, o = [], a = new THREE.Triangle(), r = new THREE.Vector3(), s = new THREE.Vector3(), E = new THREE.Vector3();
        for (let i = 0; i < n; i++) {
            r.fromBufferAttribute(t, 3 * i + 0), s.fromBufferAttribute(t, 3 * i + 1), E.fromBufferAttribute(t, 3 * i + 2), 
            a.set(r, s, E);
            let n = new THREE.Vector3();
            a.getMidpoint(n);
            let l = r.distanceTo(s), h = Math.sqrt(3) / 2 * l * e, d = n.clone().normalize().setLength(h);
            n.add(d), o.push(n.clone(), r.clone(), s.clone(), n.clone(), s.clone(), E.clone(), n.clone(), E.clone(), r.clone());
        }
        let i = new THREE.BufferGeometry().setFromPoints(o);
        return i.computeVertexNormals(), i;
    }
    function I() {
        const t = window.innerWidth, o = window.innerHeight;
        e.aspect = t / o, e.updateProjectionMatrix(), n.setSize(t, o), h.setSize(t, o), 
        d.setSize(t, o), A();
    }
    function G(e) {
        (e.isMesh || e.isInstancedMesh) && !1 === T.test(e.layers) && (p[e.uuid] = e.material, 
        e.material = H);
    }
    function v(e) {
        p[e.uuid] && (e.material = p[e.uuid], delete p[e.uuid]);
    }
    function C() {
        requestAnimationFrame(C), o.update(), l && l.moveAlongCurve(.002), A();
    }
    function A() {
        t.traverse(G), h.render(), t.traverse(v), d.render();
    }
    !function() {
        const u = document.createElement("div");
        document.body.appendChild(u), (t = new THREE.Scene()).background = 0, (n = new THREE.WebGLRenderer({
            antialias: !0
        })).setPixelRatio(window.devicePixelRatio), n.setSize(window.innerWidth, window.innerHeight), 
        n.outputEncoding = THREE.sRGBEncoding, n.shadowMap.enabled = !0, n.shadowMap.type = THREE.PCFSoftShadowMap, 
        u.appendChild(n.domElement), new THREE.TextureLoader().load("https://happy358.github.io/Images/HDR/leadenhall_market_1k_s.jpg", function(e) {
            e.mapping = THREE.EquirectangularReflectionMapping, t.environment = e;
        }), (e = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, .01, 500)).position.set(0, .8, 22), 
        e.lookAt(0, 0, 0);
        const T = new THREE.RenderPass(t, e), H = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, .4, .85);
        H.threshold = R.bloomThreshold, H.strength = R.bloomStrength, H.radius = R.bloomRadius, 
        (h = new THREE.EffectComposer(n)).renderToScreen = !1, h.addPass(T), h.addPass(H);
        const p = new THREE.ShaderPass(new THREE.ShaderMaterial({
            uniforms: {
                baseTexture: {
                    value: null
                },
                bloomTexture: {
                    value: h.renderTarget2.texture
                }
            },
            vertexShader: document.getElementById("vertexshader").textContent,
            fragmentShader: document.getElementById("fragmentshader").textContent,
            defines: {}
        }), "baseTexture");
        p.needsSwap = !0, (d = new THREE.EffectComposer(n)).addPass(T), d.addPass(p);
        const f = new THREE.AmbientLight(16777215, .15);
        t.add(f);
        const g = [], y = [ {
            x: 2.8,
            y: -2.8,
            z: -2.8
        }, {
            x: 2.8,
            y: -2.8,
            z: 2.8
        }, {
            x: -2.8,
            y: -2.8,
            z: 2.8
        }, {
            x: -2.8,
            y: -2.8,
            z: -2.8
        } ];
        for (const e of y) {
            const t = new THREE.Object3D();
            t.position.copy(e), g.push(t);
        }
        const S = new THREE.CatmullRomCurve3(g.map(e => e.position));
        S.curveType = "catmullrom", S.tension = .8, S.closed = !0, new THREE.FontLoader().load("https://cdn.jsdelivr.net/npm/three@0.145.0/examples/fonts/helvetiker_bold.typeface.json", function(e) {
            (a = new THREE.TextGeometry(message, {
                font: e,
                size: 1,
                height: .1,
                curveSegments: 12
            })).rotateX(Math.PI), a.rotateY(-Math.PI), r = new THREE.MeshStandardMaterial({
                color: 16766720
            });
            const n = new THREE.Mesh(a, r);
            (l = new THREE.Flow(n)).updateCurve(0, S), t.add(l.object3D);
        }), a = new THREE.CylinderGeometry(0, 4, 10, 6, 1, !0);
        let P = [];
        s = new THREE.Mesh(a, new THREE.MeshBasicMaterial());
        const G = new THREE.MeshSurfaceSampler(s).build();
        for (let e = 0; e < 730; e++) G.sample(M, b), P.push([ M.x, M.y, M.z ]);
        let v = 600, A = [ ...Array(v) ].map(() => P.splice(Math.floor(Math.random() * P.length), 1)[0]);
        v = 70;
        let z = [ ...Array(v) ].map(() => P.splice(Math.floor(Math.random() * P.length), 1)[0]);
        v = 20;
        let L = [ ...Array(v) ].map(() => P.splice(Math.floor(Math.random() * P.length), 1)[0]), V = new THREE.MeshStandardMaterial({
            metalness: 1,
            roughness: 0
        });
        i = .2, a = new THREE.SphereGeometry(i, 20, 20), r = V.clone(), E = new THREE.Mesh(a, r), 
        x(c = 1, P, "spere"), i = .13, c = 3, THREE.BufferGeometry.prototype.tripleFace = B, 
        a = new THREE.IcosahedronGeometry(i, 0).tripleFace(c), r = V.clone(), E = new THREE.Mesh(a, r), 
        x(c = 1, L, "ico"), i = .1, a = new THREE.IcosahedronGeometry(i, 0), (r = V.clone()).metalness = .1, 
        r.roughness = .9, E = new THREE.Mesh(a, r), x(c = 1, A, "green"), i = .08, a = new THREE.SphereGeometry(i, 10, 10), 
        E = new THREE.Mesh(a, new THREE.MeshBasicMaterial()), x(c = 1, z, "bloom");
        let F = [];
        for (let e = 0; e < 10; e++) {
            let t, n;
            F.push(0, 0, -.89), e % 2 == 0 ? (t = 2, n = 1) : (t = 1, n = 2);
            let o = (e + 1) / 5 * Math.PI;
            F.push(Math.cos(o) * t, Math.sin(o) * t, 0), o = e / 5 * Math.PI, F.push(Math.cos(o) * n, Math.sin(o) * n, 0), 
            F.push(0, 0, .89), o = e / 5 * Math.PI, F.push(Math.cos(o) * n, Math.sin(o) * n, 0), 
            o = (e + 1) / 5 * Math.PI, F.push(Math.cos(o) * t, Math.sin(o) * t, 0);
        }
        F = new Float32Array(F), (a = new THREE.BufferGeometry()).setAttribute("position", new THREE.BufferAttribute(F, 3)), 
        a.computeVertexNormals(), (r = V.clone()).color.set("yellow");
        const k = new THREE.Mesh(a, r);
        k.position.y = 5.3, k.rotation.z = -Math.PI / 5 / 2, c = .35, k.scale.set(c, c, c), 
        k.castShadow = !0, t.add(k);
        w = [], a = new THREE.BoxGeometry(1, 1, 1);
        let D = new THREE.MeshPhongMaterial({
            color: 16711680
        }), j = new THREE.MeshStandardMaterial({
            color: 16766720,
            metalness: 1,
            roughness: .3,
            side: THREE.DoubleSide
        }), W = new THREE.Mesh(a, D);
        a = new THREE.BoxGeometry(1.01, 1.01, .15), w.push(a), a = new THREE.BoxGeometry(1.01, .15, 1.01), 
        w.push(a), a = new THREE.BoxGeometry(.15, 1.01, 1.01), w.push(a);
        let U = [];
        (a = new THREE.CylinderGeometry(.075, .075, .15, 15, 1, !0, 0, 1.2 * Math.PI)).rotateX(Math.PI / 2), 
        a.translate(.25, .575, 0), U.push(a);
        let _ = new THREE.Shape();
        _.moveTo(0, 0), _.lineTo(.25, -.075), _.lineTo(.25, .075), (a = new THREE.ShapeGeometry(_)).rotateX(Math.PI / 2), 
        a.rotateZ(Math.PI / 5.4), a.translate(0, .5, 0), U.push(a);
        let q = THREE.BufferGeometryUtils.mergeBufferGeometries(U);
        q.scale(1.2, 1, 1.2);
        let X = 2 * Math.PI / 6;
        for (let e = 0; e < 6; e++) w.push(q.clone().rotateY(X * e));
        (a = new THREE.SphereGeometry(.105, 6, 3)).translate(0, .5, 0), w.push(a), a = THREE.BufferGeometryUtils.mergeBufferGeometries(w), 
        s = new THREE.Mesh(a, j), W.add(s), W.position.set(5, -5, 0), W.scale.set(1.3, 1.3, 1.3), 
        W.castShadow = !0, t.add(W);
        m = 16777215;
        const N = new THREE.PointLight(m, 1, 40, 3.8);
        N.castShadow = !0, N.shadow.bias = -.005, t.add(N), a = new THREE.BoxGeometry(50, 50, 50), 
        r = new THREE.MeshPhongMaterial({
            color: 16758465,
            shininess: 10,
            specular: 1118481,
            side: THREE.BackSide
        }), (s = new THREE.Mesh(a, r)).position.y = 19.2, s.receiveShadow = !0, t.add(s), 
        (o = new THREE.OrbitControls(e, n.domElement)).autoRotate = !0, o.autoRotateSpeed = 2, 
        o.enableDamping = !0, o.enablePan = !1, o.minDistance = 3, o.maxDistance = 28, o.minPolarAngle = 0, 
        o.maxPolarAngle = Math.PI / 2, o.target.set(0, 0, 0), o.update(), C(), window.addEventListener("resize", I);
    }();
}();