import { registerRootComponent } from 'expo';
import App from './src/App';

/**
 * Desktop device shell.
 *
 * The prototype is a 393 x 777 dp phone screen. Left to itself a wide browser stretches the root
 * across the whole window, so the UI reads as a bare page floating on white instead of a phone
 * preview. On viewports 800 px and wider the root is pinned to the design's own 393 x 777 dp and
 * centred on a dark backdrop behind a rounded, shadowed bezel - the way a device should read.
 *
 * The threshold sits above every viewport the reference gate renders (its reach pass tops out at
 * 768 px), so the gate's own render - and every measurement taken from it - is byte-for-byte
 * unchanged; only a real desktop window sees the shell.
 */
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.id = 'device-shell';
  style.textContent = `
@media (min-width: 800px) {
  html, body {
    background: radial-gradient(1200px 820px at 50% 28%, #1c1c24 0%, #0a0a0d 72%) !important;
  }
  body { display: flex !important; align-items: center !important; justify-content: center !important; }
  #root {
    flex: 0 0 auto !important;
    width: 393px !important;
    height: 777px !important;
    max-width: 393px !important;
    margin: 0 !important;
    border-radius: 44px !important;
    overflow: hidden !important;
    position: relative !important;
    box-shadow: 0 0 0 10px #1b1b20, 0 0 0 11px rgba(255,255,255,0.10), 0 42px 110px rgba(0,0,0,0.62) !important;
  }
}
`;
  document.head.appendChild(style);
}

registerRootComponent(App);
