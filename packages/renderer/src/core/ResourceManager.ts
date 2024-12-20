export type Resource = JSResource | CSSResource;
export type ResourceType = 'js' | 'css';

/**
 * JS资源
 */
export interface JSResource {
  type: 'js';
  url: string;
  load?: (ev: Event) => void;
}

/**
 * CSS资源
 */
export interface CSSResource {
  type: 'css';
  url: string;
}

export class ResourceManager {
  /**
   * 已加载的资源 - url
   */
  private assets: Record<string, boolean> = {};

  isLoad(url: string) {
    return this.assets[url];
  }

  async fetchAsset(resource: Resource): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let element: HTMLScriptElement | HTMLLinkElement;
      const { type, url } = resource;
      if (type === 'js') {
        element = document.createElement('script');
        element.src = url;
        element.onload = (e) => {
          resource.load?.(e);
          resolve(true);
        };
        element.onerror = () => reject(`Failed to load asset: ${url}`);
      } else if (type === 'css') {
        element = document.createElement('link');
        element.href = url;
        element.rel = 'stylesheet';
        element.onload = () => resolve(true);
        element.onerror = () => reject(`Failed to load asset: ${url}`);
      }
      element! && document.head.appendChild(element);
    });
  }

  async loadAsset(resource: Resource) {
    if (!this.assets[resource.url]) {
      this.assets[resource.url] = await this.fetchAsset(resource);
    }
    return this.assets[resource.url];
  }

  async loadAssets(resources: Resource[]) {
    const loadPromises: Promise<boolean>[] = [];
    resources.forEach((item) => {
      loadPromises.push(this.loadAsset(item));
    });
    return Promise.all(loadPromises);
  }
}
