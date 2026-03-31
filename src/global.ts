export {};

declare global {
  interface Window {
    rootList: string[];
<<<<<<< Updated upstream:webapp/src/global.ts
    __nativeCallbacks?: Record<string, (result: any) => void>;
=======
>>>>>>> Stashed changes:src/global.ts
  }
}
