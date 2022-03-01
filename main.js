import './style.css';

// npm run dev to start 

import * as THREE from "three";
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347, wireframe: true});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// background
const widepeepoTexture = new THREE.TextureLoader().load('assets/widepeepoHappy.png');
// scene.background = widepeepoTexture;

// cube thingy
const sadgeTexture = new THREE.TextureLoader().load('assets/faangsadge.png');

const sadge = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({ map: sadgeTexture })
);
scene.add(sadge);

// side moon thing
const normalTexture = new THREE.TextureLoader().load('assets/normal.jpg');

const peepoMoon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial( {
    map: widepeepoTexture,
    normalMap: normalTexture
  })
)
scene.add(peepoMoon);

peepoMoon.position.z = 18;
peepoMoon.position.y = 12;
peepoMoon.position.x = -7;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  peepoMoon.rotation.x += 0.05;
  peepoMoon.rotation.y += 0.075;
  peepoMoon.rotation.z += 0.05;
  
  sadge.rotation.y += 0.01;
  sadge.rotation.z += 0.01;

  camera.position.z = t*-0.01;
  camera.position.x = t*-0.0002;
  camera.position.y = t*-0.0002;
}

document.body.onscroll = moveCamera

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);

}

Array(200).fill().forEach(addStar); 

// like a gameloop
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  peepoMoon.rotation.x += 0.005;
  peepoMoon.rotation.y += 0.01;
  peepoMoon.rotation.z += 0.005;

  sadge.rotation.y += 0.01;
  sadge.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);

}

animate();