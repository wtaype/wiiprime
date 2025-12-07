import $ from 'jquery';
import { Notificacion, wiPath, wiAnimate} from './widev.js';

let app = 'WiiPrime';
class WiRouter {
  constructor() {
    this.ruta = {};
    this.defaultRoute = '/hora';
    this.currentRoute = null;
    this.contentContainer = '#wiMainContent';
    this.isNavigating = false;
    this.prefetchCache = new Set();
    this.moduleCache = new Map(); // ✅ Cache de módulos cargados
  }

  register(path, module) {
    this.ruta[path] = module;
  }

  async navigate(path, addToHistory = true) {
    if (this.isNavigating) return;
    this.isNavigating = true;

    let normalizedPath = wiPath.clean(path);
    if (normalizedPath === '/') normalizedPath = this.defaultRoute;

    let moduleLoader = this.ruta[normalizedPath];
    if (!moduleLoader) moduleLoader = () => import('./pages/404.js');

    try {
      this.updateActiveNav(normalizedPath);

      let module;
      if (this.moduleCache.has(normalizedPath)) {
        module = this.moduleCache.get(normalizedPath); // 0ms - Instantáneo
        console.log('⚡Desde cache: ' + normalizedPath);
      } else {
        module = typeof moduleLoader === 'function' ? await moduleLoader() : moduleLoader; // 80-150ms solo primera vez
        this.moduleCache.set(normalizedPath, module); // Guardar para próximas veces
        console.log('✅ Primera Vez: '+ normalizedPath); 
      }
      
      const content = await module.render();
      await wiAnimate.fade(this.contentContainer, content);

      const pageName = normalizedPath.replace('/', '').replace(/^(\w)/, c => c.toUpperCase()) || 'Hora';
      document.title = `${pageName} - ${app}`;

      if (module.init) module.init();

      if (addToHistory) {
        const urlPath = normalizedPath === this.defaultRoute ? '/' : normalizedPath;
        wiPath.update(urlPath, document.title);
      }

      this.currentRoute = normalizedPath;
    } catch (e) {console.error(e)} 
    finally {this.isNavigating = false;}
  }

  updateActiveNav(path) {
    const page = path.replace('/', '') || 'hora';
    $('.winav_item').removeClass('active');
    $(`.winav_item[data-page="${page}"]`).addClass('active');
  }

  async prefetch(path) {
    let normalizedPath = wiPath.clean(path);
    if (normalizedPath === '/') normalizedPath = this.defaultRoute;
    
    if (this.prefetchCache.has(normalizedPath) || typeof this.ruta[normalizedPath] !== 'function') return;

    console.log(`⚡ Prefetch: ${normalizedPath}`);
    try {
      const module = await this.ruta[normalizedPath]();
      this.moduleCache.set(normalizedPath, module); // ✅ Guardar en cache
      this.prefetchCache.add(normalizedPath);
    } catch (e) {console.warn(`Prefetch error: ${normalizedPath}`); }
  }

  init() {
    $(document).on('click', '.winav_item', (e) => {
      e.preventDefault();
      const page = $(e.currentTarget).data('page');
      this.navigate(page === 'hora' ? '/' : `/${page}`);
    });

    window.addEventListener('popstate', (e) => {
      this.navigate(e.state?.path || wiPath.current, false);
    });

    this.navigate(wiPath.current, false);
  }
}

export const rutas = new WiRouter();