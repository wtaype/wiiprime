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
  }

  register(path, module) {
    this.ruta[path] = module;
  }

  async navigate(path, addToHistory = true) {
    if (this.isNavigating) return;
    this.isNavigating = true;

    let normalizedPath = wiPath.clean(path);
    if (normalizedPath === '/') normalizedPath = this.defaultRoute;

    const moduleLoader = this.ruta[normalizedPath];
    if (!moduleLoader) {
      console.warn(`Ruta no encontrada: ${normalizedPath}`);
      Notificacion('Página no encontrada', 'error', 2000);
      this.isNavigating = false;
      return;
    }

    try {
      this.updateActiveNav(normalizedPath);

      // ✅ Cargar módulo (lazy o ya cargado)
      const module = typeof moduleLoader === 'function' ? await moduleLoader() : moduleLoader;
      
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
      console.log(`${normalizedPath}`);
    } catch (error) {console.error('Error:', error); Notificacion('Error al cargar la página', 'error', 2000); } 
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

    console.log(`${normalizedPath}`);
    try {
      const module = await this.ruta[normalizedPath]();
      this.ruta[normalizedPath] = module;
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
