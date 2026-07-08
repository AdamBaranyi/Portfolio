import * as THREE from 'three';

/**
 * Small procedural textures, drawn once on a canvas at startup.
 * Way cheaper than shipping image files and costs next to nothing
 * at runtime — the GPU just receives one tiny texture per object.
 */

function makeCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

/** Soft round glow with a subtle cross flare — used for the star particles. */
export function makeStarTexture(): THREE.Texture {
  const size = 64;
  const canvas = makeCanvas(size, size);
  const ctx = canvas.getContext('2d')!;
  const half = size / 2;

  const glow = ctx.createRadialGradient(half, half, 0, half, half, half);
  glow.addColorStop(0, 'rgba(255,255,255,1)');
  glow.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  glow.addColorStop(0.6, 'rgba(255,255,255,0.12)');
  glow.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  // thin sparkle cross
  ctx.globalAlpha = 0.35;
  const flare = ctx.createLinearGradient(0, half, size, half);
  flare.addColorStop(0, 'rgba(255,255,255,0)');
  flare.addColorStop(0.5, 'rgba(255,255,255,0.9)');
  flare.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = flare;
  ctx.fillRect(0, half - 1, size, 2);
  ctx.fillRect(half - 1, 0, 2, size);
  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Banded gas-giant look in sandy whippet tones — Jupiter. */
export function makeJupiterTexture(): THREE.Texture {
  const canvas = makeCanvas(256, 128);
  const ctx = canvas.getContext('2d')!;
  const bands = ['#e8d8b4', '#d9c398', '#efe2c4', '#c9ab7d', '#e3cfa8', '#d2b98b', '#eadcba', '#c19f72'];

  const bandHeight = canvas.height / bands.length;
  bands.forEach((color, i) => {
    ctx.fillStyle = color;
    ctx.fillRect(0, i * bandHeight, canvas.width, bandHeight + 1);
  });

  // wobble the band edges so they feel like flowing gas
  ctx.globalAlpha = 0.25;
  for (let x = 0; x < canvas.width; x += 4) {
    const offset = Math.sin(x * 0.06) * 3 + Math.sin(x * 0.15) * 2;
    ctx.drawImage(canvas, x, 0, 4, canvas.height, x, offset, 4, canvas.height);
  }
  ctx.globalAlpha = 1;

  // a small storm spot, like Jupiter's — in warm brown
  ctx.fillStyle = 'rgba(150,108,70,0.8)';
  ctx.beginPath();
  ctx.ellipse(170, 82, 16, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(190,150,105,0.9)';
  ctx.beginPath();
  ctx.ellipse(170, 82, 9, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Dark brindle mottling with an even darker "mask" band — Kepler. */
export function makeKeplerTexture(): THREE.Texture {
  const canvas = makeCanvas(256, 128);
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#8a7660';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // brindle patches
  const patches = ['#6e5d4c', '#5c4d3e', '#7d6a56', '#524437'];
  for (let i = 0; i < 90; i++) {
    ctx.fillStyle = patches[i % patches.length];
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const w = 6 + Math.random() * 22;
    const h = 3 + Math.random() * 7;
    ctx.globalAlpha = 0.5 + Math.random() * 0.4;
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // the dark mask — one deep band like her face
  const mask = ctx.createLinearGradient(0, 30, 0, 78);
  mask.addColorStop(0, 'rgba(35,28,22,0)');
  mask.addColorStop(0.5, 'rgba(35,28,22,0.75)');
  mask.addColorStop(1, 'rgba(35,28,22,0)');
  ctx.fillStyle = mask;
  ctx.fillRect(0, 30, canvas.width, 48);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
