import { useRef } from 'react';
import { Renderer } from '@bamboo/renderer';

export interface SandboxProps {
  src: string;
  done: (iframeWindow: Window, renderer: Renderer) => void;
}

export const Sandbox = ({ src, done }: SandboxProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  window.addEventListener('renderDone', (data) => {
    const { detail } = data as CustomEvent;
    if (!iframeRef.current?.contentWindow) {
      return;
    }
    done(iframeRef.current.contentWindow!, detail.renderer);
  });

  return <iframe ref={iframeRef} src={src} className="bm-canvas-sandbox"></iframe>;
};
