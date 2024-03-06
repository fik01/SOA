import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { LayoutService } from '../layout.service';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as TWEEN from '@tweenjs/tween.js';

@Component({
  selector: 'xp-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  @ViewChild('webglCanvas', { static: true }) webglCanvas: ElementRef<HTMLCanvasElement>;
  gl: WebGLRenderingContext;

  private buttonClicked: boolean = false;
  private van: THREE.Object3D;

  private animationFrameId: number;

  constructor(private router: Router) { }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
  }

  async ngOnInit(): Promise<void> {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
    //const camera = new THREE.PerspectiveCamera(30,window.innerWidth/window.innerHeight,1,5000);
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg') as HTMLCanvasElement,
      antialias: true
    });

    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.set(-15, 0, 40);
    camera.rotation.set(0, 0, 0)
    // camera.position.set(-90, 0, 90);
    // camera.rotation.set(0, 0, 0)

    const loader = new GLTFLoader();

    await Promise.all([
      new Promise<void>((resolve) => {
        loader.load('./assets/background/Background.gltf', (gltfScene) => {
          //loader.load('./assets/Export/Background.glb', (gltfScene) => {
          const map = gltfScene.scene;

          map.position.set(-10, -65, -95);
          map.rotation.set(0, 0, 0)
          map.scale.set(30, 30, 30);

          // map.position.set(-105, -310, -850);
          // map.rotation.set(0, -1.7, 0)
          // map.scale.set(32, 32, 32);

          scene.add(map);
          resolve();
        });
      }),

      new Promise<void>((resolve) => {
        loader.load('./assets/kombi/VanAppliedTransform.glb', (gltfScene) => {
          this.van = gltfScene.scene;

          this.van.position.set(70, -20, -5);
          this.van.rotation.set(0, -1.58, 0)
          this.van.scale.set(12, 12, 12);

          // this.van.position.set(70, -80, -75);
          // this.van.rotation.set(0, -1.58, 0)
          // this.van.scale.set(12, 12, 12);

          scene.add(this.van);
          resolve();
        });
      }),

      new Promise<void>((resolve) => {
        const spaceTexture = new THREE.TextureLoader().load('../../../../assets/images/background_landing_page2.jpg', () => {
          scene.background = spaceTexture;
          resolve();
        });
      }),
    ]);

    //const pointLight = new THREE.PointLight(0xffffff);
    // pointLight.position.set(0, 10, 15);
    // pointLight.intensity = 2;

    const ambientLight = new THREE.AmbientLight(0xdddddd);
    ambientLight.intensity = 3;

    scene.add(ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.enabled = false;

    const vanRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
    const backgroundRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);

    function animate(this: LandingPageComponent) {
      this.animationFrameId = requestAnimationFrame(animate.bind(this));
    
      TWEEN.update();
    
      controls.update();
    
      if (this.buttonClicked && this.van) {
        renderer.render(scene, camera);
      } else {
        renderer.clear(); 
        renderer.render(scene, camera);
      }
    }
    animate.call(this);
  }

  moveVan(): void {
    const targetPosition = { x: this.van.position.x - 120 };
    new TWEEN.Tween(this.van.position)
      .to(targetPosition, 1000)
      .easing(TWEEN.Easing.Quadratic.In)
      .onUpdate(() => { })
      .onComplete(() => {
        this.router.navigate(['/home']);
      })
      .start();
  }
}
