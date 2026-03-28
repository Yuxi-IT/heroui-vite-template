/**
 * Unified native bridge — works with both Android JavascriptInterface and iOS WKScriptMessageHandler.
 *
 * Android: window.NativeBridge.methodName(args...)  (sync methods return directly)
 * iOS:     window.webkit.messageHandlers.NativeBridge.postMessage({method, args, callbackId})
 *
 * For async results, C# calls window.__nativeCallbacks[callbackId](result) to resolve the Promise.
 */

let callbackSeq = 0;

function isAndroid(): boolean {
  return typeof (window as any).NativeBridge !== 'undefined';
}

function isIos(): boolean {
  return typeof (window as any).webkit?.messageHandlers?.NativeBridge !== 'undefined';
}

/** Fire-and-forget call — no return value */
function invoke(method: string, ...args: unknown[]): void {
  if (isAndroid()) {
    const bridge = (window as any).NativeBridge;
    bridge[method]?.(...args.map(a => (a === undefined || a === null) ? '' : String(a)));
  } else if (isIos()) {
    (window as any).webkit.messageHandlers.NativeBridge.postMessage({ method, args });
  }
}

/** Sync call — Android only, returns value directly */
function invokeSync<T = string>(method: string, ...args: unknown[]): T | undefined {
  if (isAndroid()) {
    const bridge = (window as any).NativeBridge;
    return bridge[method]?.(...args.map(a => (a === undefined || a === null) ? '' : String(a)));
  }
  return undefined;
}

/** Async call — returns a Promise resolved by C# via __nativeCallbacks */
function invokeAsync<T = string>(method: string, ...args: unknown[]): Promise<T> {
  return new Promise((resolve) => {
    const callbackId = `__cb_${++callbackSeq}_${Date.now()}`;

    if (!window.__nativeCallbacks) {
      window.__nativeCallbacks = {};
    }
    window.__nativeCallbacks[callbackId] = (result: any) => {
      delete window.__nativeCallbacks![callbackId];
      resolve(result as T);
    };

    if (isAndroid()) {
      const bridge = (window as any).NativeBridge;
      bridge[method]?.(callbackId);
    } else if (isIos()) {
      (window as any).webkit.messageHandlers.NativeBridge.postMessage({ method, args, callbackId });
    }
  });
}

export const AppBridgeNative = {
  showToast(message: string, duration?: string | number) {
    invoke('showToast', message, String(duration ?? 'short'));
  },

  copyToClipboard(text: string) {
    invoke('copyToClipboard', text);
  },

  async getFromClipboard(): Promise<string> {
    return await invokeAsync<string>('getFromClipboard');
  },

  sendNotification(title: string, message: string, id?: number, route?: string) {
    invoke('sendNotification', title, message, id ?? 0, route ?? '');
  },

  shareText(text: string) {
    invoke('shareText', text);
  },

  shareUri(uri: string) {
    invoke('shareUri', uri);
  },

  shareImage(imagePath: string, _title?: string) {
    invoke('shareImage', imagePath);
  },

  saveImage(base64: string) {
    invoke('saveImage', base64);
  },

  saveFile(base64: string, fileName?: string) {
    invoke('saveFile', base64, fileName ?? 'download');
  },

  async getStatusBarHeight(): Promise<number> {
    if (isAndroid()) {
      return invokeSync<number>('getStatusBarHeight') ?? 0;
    }
    const result = await invokeAsync<string>('getStatusBarHeight');
    return parseInt(result, 10) || 0;
  },
};
