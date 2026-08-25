import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ArrowRight, ArrowUpRight, ChevronDown, Gamepad2, MousePointer2, RotateCcw } from "lucide-react";

const stations = [
  {
    id: "formulation",
    label: "Formulation OS",
    kicker: "01 / PRODUCT SOFTWARE",
    detail: "Ingredient evidence, specifications, optimisation and reviewable formulation decisions.",
    output: "Optimised product version",
    color: 0x2c94d6,
    href: "https://github.com/Charlie-Qi394/integrated-formulation-optimisation-tool",
  },
  {
    id: "careops",
    label: "CareOps AI",
    kicker: "02 / AGENT TOOLING",
    detail: "An MCP-powered operations assistant with permissions, validation and confirmation-gated actions.",
    output: "Controlled business action",
    color: 0x36b8ad,
    href: "https://github.com/Charlie-Qi394/careops-ai",
  },
  {
    id: "regulatory",
    label: "Regulatory RAG",
    kicker: "03 / AI APPLICATION",
    detail: "Document ingestion, vector retrieval and grounded answers with citations and cautious fallback states.",
    output: "Traceable answer",
    color: 0xd6a74a,
    href: "https://github.com/Charlie-Qi394/ai-regulatory-knowledge-assistant",
  },
  {
    id: "ml-lab",
    label: "ML Laboratory",
    kicker: "04 / MODEL BUILDING",
    detail: "NLP, computer vision and evaluation work from Monash coursework and public portfolio projects.",
    output: "Measured model behaviour",
    color: 0xb875d6,
    href: "https://github.com/Charlie-Qi394/computer-vision-cnn-segmentation",
  },
  {
    id: "domain",
    label: "Domain Context",
    kicker: "05 / R&D + MANUFACTURING",
    detail: "Ten years working with regulated product development, documentation, traceability and operational decisions.",
    output: "Evidence-led workflow",
    color: 0xe07b58,
    href: "#story",
  },
];

function SystemsLab() {
  const canvasHostRef = useRef(null);
  const [selectedId, setSelectedId] = useState("formulation");
  const [hoveredId, setHoveredId] = useState("");
  const selectedRef = useRef(selectedId);
  const hoveredRef = useRef(hoveredId);
  const selected = stations.find((station) => station.id === selectedId) ?? stations[0];

  useEffect(() => {
    selectedRef.current = selectedId;
  }, [selectedId]);

  useEffect(() => {
    hoveredRef.current = hoveredId;
  }, [hoveredId]);

  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x071522);
    scene.fog = new THREE.Fog(0x071522, 17, 46);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 10.5, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const ambient = new THREE.HemisphereLight(0xb7e7ec, 0x06111c, 1.8);
    scene.add(ambient);
    const keyLight = new THREE.DirectionalLight(0xdefcff, 3.2);
    keyLight.position.set(-8, 16, 8);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(70, 70),
      new THREE.MeshStandardMaterial({ color: 0x0b2130, roughness: 0.86, metalness: 0.08 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const grid = new THREE.GridHelper(70, 35, 0x3b91a0, 0x173344);
    grid.position.y = 0.025;
    scene.add(grid);

    const stationMeshes = [];
    const stationGroups = [];
    const positions = [
      [-7, -4],
      [6.5, -4.5],
      [7, 4],
      [-6.5, 4.5],
      [0, -5.8],
    ];

    const connectionMaterial = new THREE.LineBasicMaterial({ color: 0x67cbd2, transparent: true, opacity: 0.62 });
    const connectionPoints = positions.map(([x, z]) => new THREE.Vector3(x, 0.14, z));
    const connectionLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([...connectionPoints, connectionPoints[0]]),
      connectionMaterial,
    );
    scene.add(connectionLine);

    stations.forEach((station, index) => {
      const group = new THREE.Group();
      const [x, z] = positions[index];
      group.position.set(x, 0, z);
      group.userData.stationId = station.id;

      const color = new THREE.Color(station.color);
      const base = new THREE.Mesh(
        new THREE.CylinderGeometry(1.35, 1.55, 0.34, 6),
        new THREE.MeshStandardMaterial({ color: 0x173344, metalness: 0.3, roughness: 0.4 }),
      );
      base.position.y = 0.18;
      base.castShadow = true;
      base.userData.stationId = station.id;
      group.add(base);
      stationMeshes.push(base);

      const tower = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 1.9, 0.8),
        new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.025, metalness: 0.12, roughness: 0.34 }),
      );
      tower.position.y = 1.1;
      tower.rotation.y = Math.PI / 4;
      tower.castShadow = true;
      tower.userData.stationId = station.id;
      group.add(tower);
      stationMeshes.push(tower);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.02, 0.035, 8, 32),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.75 }),
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.39;
      ring.userData.stationId = station.id;
      group.add(ring);
      stationMeshes.push(ring);

      const beacon = new THREE.PointLight(color, 0.3, 4.5, 2);
      beacon.position.y = 1.9;
      group.add(beacon);

      scene.add(group);
      stationGroups.push({ group, ring, tower });
    });

    const rover = new THREE.Group();
    const roverBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.42, 1.25),
      new THREE.MeshStandardMaterial({ color: 0xcdeff0, metalness: 0.42, roughness: 0.22 }),
    );
    roverBody.position.y = 0.7;
    roverBody.castShadow = true;
    rover.add(roverBody);
    const roverCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.26, 16, 12),
      new THREE.MeshStandardMaterial({ color: 0x36b8ad, emissive: 0x36b8ad, emissiveIntensity: 0.35 }),
    );
    roverCore.position.y = 1.02;
    rover.add(roverCore);
    const roverRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.64, 0.035, 8, 32),
      new THREE.MeshBasicMaterial({ color: 0x7bd9d2, transparent: true, opacity: 0.7 }),
    );
    roverRing.rotation.x = Math.PI / 2;
    roverRing.position.y = 0.16;
    rover.add(roverRing);
    rover.position.set(0, 0, 1.8);
    scene.add(rover);

    const keys = new Set();
    const onKeyDown = (event) => keys.add(event.key.toLowerCase());
    const onKeyUp = (event) => keys.delete(event.key.toLowerCase());
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onPointerMove = (event) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(stationMeshes, false)[0];
      setHoveredId(hit?.object?.userData?.stationId ?? "");
    };
    const onPointerDown = (event) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(stationMeshes, false)[0];
      if (hit?.object?.userData?.stationId) setSelectedId(hit.object.userData.stationId);
    };
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    const timer = new THREE.Timer();
    timer.connect(document);
    let frameId = 0;
    const animate = (timestamp) => {
      timer.update(timestamp);
      const delta = Math.min(timer.getDelta(), 0.04);
      const elapsed = timer.getElapsed();
      const speed = 3.6;
      let moveX = 0;
      let moveZ = 0;
      if (keys.has("arrowleft") || keys.has("a")) moveX -= 1;
      if (keys.has("arrowright") || keys.has("d")) moveX += 1;
      if (keys.has("arrowup") || keys.has("w")) moveZ -= 1;
      if (keys.has("arrowdown") || keys.has("s")) moveZ += 1;
      const magnitude = Math.hypot(moveX, moveZ) || 1;
      if (!reduceMotion && (moveX || moveZ)) {
        rover.position.x = THREE.MathUtils.clamp(rover.position.x + (moveX / magnitude) * speed * delta, -11, 11);
        rover.position.z = THREE.MathUtils.clamp(rover.position.z + (moveZ / magnitude) * speed * delta, -8, 8);
        rover.rotation.y = Math.atan2(moveX, moveZ);
      }

      if (!reduceMotion) {
        roverCore.position.y = 1.02 + Math.sin(elapsed * 4) * 0.035;
        roverRing.rotation.z = elapsed * 0.55;
      }
      stationGroups.forEach(({ group, ring, tower }) => {
        const stationId = group.userData.stationId;
        const isActive = stationId === selectedRef.current || stationId === hoveredRef.current;
        const pulse = reduceMotion ? 1 : isActive ? 1 + Math.sin(elapsed * 4) * 0.05 : 1;
        ring.scale.setScalar(pulse);
        if (!reduceMotion) tower.rotation.y += isActive ? 0.006 : 0.002;
        group.position.y = reduceMotion ? 0 : isActive ? Math.sin(elapsed * 3) * 0.045 : 0;
      });

      const targetCameraX = rover.position.x * 0.18;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCameraX, 0.025);
      camera.lookAt(rover.position.x * 0.12, 0.2, 0);
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };
    animate();

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.dispose();
      timer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="systems-lab" id="lab">
      <div className="lab-canvas" ref={canvasHostRef} aria-hidden="true" />
      <div className="lab-scanline" aria-hidden="true" />
      <div className="lab-nav">
        <a className="lab-brand" href="#lab"><span>CQ</span> Charlie Qi / AI Systems Lab</a>
        <a className="lab-normal-link" href="#projects">Skip 3D view <ArrowRight size={15} /></a>
      </div>
      <div className="lab-profile-card" aria-label="Charlie Qi profile">
        <img src={`${import.meta.env.BASE_URL}profile-photo.jpeg`} alt="Charlie Qi" />
        <span><strong>Charlie Qi</strong><small>Applied AI systems · software engineering</small></span>
      </div>
      <div className="lab-intro">
        <span className="console-kicker">Interactive portfolio / 2026</span>
        <h1>Enter the system.</h1>
        <p>Explore the software, workflows and domain context behind my AI engineering portfolio.</p>
      </div>
      <div className="lab-hud">
        <div className="lab-hud-label"><span className="status-dot" /> Live scene / five stations</div>
        <div className="lab-hud-controls"><span><MousePointer2 size={14} /> Click a station</span><span><Gamepad2 size={14} /> WASD / arrows to move</span></div>
      </div>
      <div className="lab-station-panel">
        <div className="detail-kicker"><span /> {selected.kicker}</div>
        <h2>{selected.label}</h2>
        <p>{selected.detail}</p>
        <div className="lab-output"><span>System output</span><strong>{selected.output}</strong></div>
        <a className="lab-open-link" href={selected.href} target={selected.href.startsWith("http") ? "_blank" : undefined} rel={selected.href.startsWith("http") ? "noreferrer" : undefined}>Open project <ArrowUpRight size={15} /></a>
      </div>
      <a className="lab-scroll" href="#projects"><ChevronDown size={17} /> Continue through portfolio</a>
      <button className="lab-reset" type="button" onClick={() => window.location.reload()} title="Reset the scene"><RotateCcw size={14} /> Reset</button>
    </section>
  );
}

export default SystemsLab;
