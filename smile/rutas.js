import $ from 'jquery';
import { Notificacion, wiPath, wiAnimate } from './widev.js';

// =============================================
// SISTEMA DE ROUTING SPA - ULTRA OPTIMIZADO
// =============================================

class WiRouter {
  constructor() {
    this.ruta = {};
    this.currentRoute = null;
    this.contentContainer = '#wiMainContent';
    this.isNavigating = false;
  }

  register(path, module) {
    this.ruta[path] = module;
  }

  async navigate(path, addToHistory = true) {
    if (this.isNavigating) return;
    this.isNavigating = true;

    // Usar wiPath.clean para normalizar
    const normalizedPath = wiPath.clean(path);

    if (!this.ruta[normalizedPath]) {
      console.warn(`Ruta no encontrada: ${normalizedPath}`);
      Notificacion('Página no encontrada', 'error', 2000);
      this.isNavigating = false;
      return;
    }

    try {
      this.updateActiveNav(normalizedPath);

      // Cargar módulo
      const moduleLoader = this.ruta[normalizedPath];
      const module = typeof moduleLoader === 'function' ? await moduleLoader() : moduleLoader;
      const content = await module.render();

      // Usar wiAnimate.fade para transición
      await wiAnimate.fade(this.contentContainer, content);

      // Actualizar título
      const pageName = normalizedPath.replace('/', '').replace(/^(\w)/, c => c.toUpperCase()) || 'Hora';
      document.title = `${pageName} - Wihope`;

      // Inicializar módulo
      if (module.init) module.init();

      // Actualizar URL usando wiPath.update
      if (addToHistory) {
        wiPath.update(normalizedPath);
      }

      this.currentRoute = normalizedPath;
    } catch (error) {
      console.error('Error al navegar:', error);
      Notificacion('Error al cargar la página', 'error', 2000);
    } finally {
      this.isNavigating = false;
    }
  }

  updateActiveNav(path) {
    const page = path.replace('/', '') || 'hora';
    $('.winav_item').removeClass('active');
    $(`.winav_item[data-page="${page}"]`).addClass('active');
  }

  async prefetch(path) {
    const normalizedPath = wiPath.clean(path);
    
    if (!this.ruta[normalizedPath] || typeof this.ruta[normalizedPath] !== 'function') {
      return;
    }

    console.log(`⚡ Prefetching: ${normalizedPath}`);
    try {
      const module = await this.ruta[normalizedPath]();
      this.ruta[normalizedPath] = module;
    } catch (e) {
      console.warn(`Error prefetching ${normalizedPath}`, e);
    }
  }

  init() {
    // Clicks en navegación
    $(document).on('click', '.winav_item', (e) => {
      e.preventDefault();
      const page = $(e.currentTarget).data('page');
      const path = page === 'hora' ? '/' : `/${page}`;
      this.navigate(path);
    });

    // Prefetch al pasar el mouse
    $(document).on('mouseenter', '.winav_item', (e) => {
      const page = $(e.currentTarget).data('page');
      const path = page === 'hora' ? '/' : `/${page}`;
      this.prefetch(path);
    });

    // Botón atrás/adelante
    window.addEventListener('popstate', (e) => {
      const path = e.state?.path || wiPath.clean(window.location.pathname);
      this.navigate(path, false);
    });

    // Cargar ruta inicial
    const initialPath = wiPath.clean(window.location.pathname);
    this.navigate(initialPath, false);
  }
}

export const rutas = new WiRouter();
