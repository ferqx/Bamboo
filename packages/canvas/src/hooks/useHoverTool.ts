import { useState } from 'react';

export interface HoverToolState {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
}

/**
 * hover工具
 */
export function useHoverTool() {
  const [state, setState] = useState<HoverToolState>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  const clearHoverTool = () => {
    setState((pervState) => ({ ...pervState, visible: false, target: undefined }));
  };

  /**
   * 更新hover工具坐标
   */
  const updateHoverTool = (target?: HTMLElement) => {
    if (!target) {
      clearHoverTool();
      return;
    }

    let { y, x, height, width } = target.getBoundingClientRect();

    const _x = x < 0 ? 0 : x;

    const _y = y > target.ownerDocument.body.offsetWidth ? target.ownerDocument.body.offsetWidth : y;

    if (x < 0) {
      // 超出最左
      width = x < 0 ? width + x : width;
    } else if (x + width > target.ownerDocument.body.offsetWidth) {
      // 超出最右
      width = x + width > target.ownerDocument.body.offsetWidth ? target.ownerDocument.body.offsetWidth - x : width;
    } else {
      width = width;
    }

    setState((pervState) => ({ ...pervState, x: _x, y: _y, width, height, visible: true }));
  };

  return { state, updateHoverTool, clearHoverTool };
}
