import {useEffect, useRef} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const CONFIG_CACHE = new Map();

const DEFAULT_PALETTE = [
  [33, 66, 231],
  [3, 181, 237],
  [85, 138, 255],
  [107, 123, 255],
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function loadConfig(configSrc) {
  if (!configSrc) {
    return Promise.resolve(null);
  }

  if (!CONFIG_CACHE.has(configSrc)) {
    CONFIG_CACHE.set(
      configSrc,
      fetch(configSrc)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to load scene config: ${response.status}`);
          }
          return response.json();
        })
        .catch(() => null),
    );
  }

  return CONFIG_CACHE.get(configSrc);
}

function createBlobs(width, height, palette) {
  const blobCount = clamp(Math.round(width / 320), 4, 8);
  const maxSize = Math.max(width, height);

  return Array.from({length: blobCount}).map((_, index) => {
    const color = palette[index % palette.length];
    return {
      color,
      x: Math.random() * width,
      y: Math.random() * height,
      radius: maxSize * (0.38 + Math.random() * 0.2),
      phase: Math.random() * Math.PI * 2,
      drift: 0.38 + Math.random() * 0.72,
      wobble: 0.09 + Math.random() * 0.14,
      dirX: Math.random() > 0.5 ? 1 : -1,
      dirY: Math.random() > 0.5 ? 1 : -1,
    };
  });
}

function drawFrame(ctx, width, height, blobs, time, blur, intensity, reducedMotion) {
  ctx.clearRect(0, 0, width, height);

  ctx.save();
  ctx.filter = `blur(${blur}px)`;
  ctx.globalCompositeOperation = 'source-over';

  blobs.forEach((blob) => {
    const motionFactor = reducedMotion ? 0.38 : 1;
    const x =
      blob.x +
      Math.sin(time * blob.drift + blob.phase) * width * blob.wobble * blob.dirX * motionFactor;
    const y =
      blob.y +
      Math.cos(time * blob.drift * 0.9 + blob.phase) * height * blob.wobble * blob.dirY * motionFactor;

    const radius = blob.radius * (0.84 + Math.sin(time * 0.55 + blob.phase) * 0.16);
    const [r, g, b] = blob.color;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.34 * intensity})`);
    gradient.addColorStop(0.58, `rgba(${r}, ${g}, ${b}, ${0.2 * intensity})`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

export default function AnimatedGradientCanvas({
  className,
  configSrc = '/animations/aleks.json.txt',
  palette = DEFAULT_PALETTE,
  intensity = 1,
  blur = 88,
}) {
  const sceneRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    if (!scene || !canvas) {
      return undefined;
    }

    const ctx = canvas.getContext('2d', {alpha: true});
    if (!ctx) {
      return undefined;
    }

    let width = 0;
    let height = 0;
    let animationFrame = null;
    let startTime = null;
    let flowSpeed = 0.12;
    let blobs = [];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const nextWidth = Math.max(1, Math.round(scene.clientWidth));
      const nextHeight = Math.max(1, Math.round(scene.clientHeight));
      const dpr = clamp(window.devicePixelRatio || 1, 1, 1.8);

      width = nextWidth;
      height = nextHeight;

      canvas.width = Math.round(nextWidth * dpr);
      canvas.height = Math.round(nextHeight * dpr);
      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      blobs = createBlobs(nextWidth, nextHeight, palette);
    };

    const render = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = (timestamp - startTime) * 0.001 * flowSpeed;
      drawFrame(ctx, width, height, blobs, elapsed, blur, intensity, prefersReducedMotion);
      animationFrame = window.requestAnimationFrame(render);
    };

    loadConfig(configSrc).then((config) => {
      const flowField = config?.history?.find(
        (layer) => layer?.layerType === 'effect' && layer?.type === 'flowField',
      );
      if (typeof flowField?.speed === 'number') {
        flowSpeed = clamp(flowField.speed * 2.3, 0.1, 0.44);
      } else if (prefersReducedMotion) {
        flowSpeed = 0.06;
      }
    });

    const observer = new ResizeObserver(resize);
    observer.observe(scene);
    resize();
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [blur, configSrc, intensity, palette]);

  return (
    <div aria-hidden="true" className={clsx(styles.scene, className)} ref={sceneRef}>
      <canvas className={styles.canvas} ref={canvasRef} />
    </div>
  );
}
