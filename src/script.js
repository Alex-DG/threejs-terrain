import './style.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Texture loader
const loader = new THREE.TextureLoader()
const height = loader.load('height.png')
const texture = loader.load('/texture.jpg')
const alpha = loader.load('/alpha.png')

// Debug
const gui = new dat.GUI({ width: 300 })
const lightFolder = gui.addFolder('Light')
const planeFolder = gui.addFolder('Plane')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.PlaneBufferGeometry(3, 3, 64, 64)
// Materials
const materials = new THREE.MeshStandardMaterial({
  color: 'grey',
  map: texture,
  displacementMap: height,
  displacementScale: 0.6,
  alphaMap: alpha,
  transparent: true,
  depthTest: false,
})
// Mesh
const plane = new THREE.Mesh(geometry, materials)
plane.rotation.x = 181

scene.add(plane)

planeFolder.add(plane.rotation, 'x').min(0).max(200).name('Rotation x')

// Lights
const pointLight = new THREE.PointLight('#00b3ff', 3)
pointLight.position.x = 0.2
pointLight.position.y = 10
pointLight.position.z = 4.4

scene.add(pointLight)

lightFolder.add(pointLight, 'intensity').min(0).max(100).step(0.1)
lightFolder.add(pointLight.position, 'x').min(0).max(100).step(0.1)
lightFolder.add(pointLight.position, 'y').min(0).max(100).step(0.1)
lightFolder.add(pointLight.position, 'z').min(0).max(100).step(0.1)

const col = { color: '#00b3ff' }
lightFolder.addColor(col, 'color').onChange(() => {
  pointLight.color.set(col.color)
})

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  //   sphere.rotation.y = 0.5 * elapsedTime

  // Update Orbital Controls
  // controls.update()

  plane.rotation.z = 0.5 * elapsedTime

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
