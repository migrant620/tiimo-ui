import { registerRootComponent } from 'expo';
import App from './src/App';
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
