import { useMemo } from 'react';
import classNames from 'classnames';
import { Trash2 } from 'lucide-react';
import {} from '@bamboo/components';
import { SelectorToolOptions, SelectorToolState } from '../../hooks';

export interface SelectorToolProps {
  state: SelectorToolState;
  options?: SelectorToolOptions;
  delete: () => void;
}

export const Selector = ({ state, options }: SelectorToolProps) => {
  const size = 24;

  const headerTop = useMemo(() => {
    const top = state.y - size + 2;
    const bottom = state.y + (state.height || 0) - 2;
    return top - 10 < 0 ? bottom : top;
  }, [state.y, state.height]);

  const isHeaderBottom = useMemo(() => {
    const top = state.y - size;
    return top - 10 < 0;
  }, [state.y]);

  const isFooterTop = useMemo(() => {
    const height =
      state.selectedNode?.renderer?.window.innerHeight ||
      (document.querySelector('.bm-canvas') as HTMLElement)?.offsetHeight ||
      0;
    const bottom = state.y + state.height + size;
    return bottom + 10 >= height;
  }, [state.selectedNode, state.y, state.height]);

  const footerTop = useMemo(() => {
    const top = state.y - size + 2;
    const bottom = state.y + state.height - 2;
    return isFooterTop ? top : bottom;
  }, [state.y, state.height]);

  return (
    <>
      {/* 选择边框 */}
      <div
        className="bm-selector-tool"
        style={{
          transform: `translate(${state.x}px, ${state.y}px)`,
          width: `${state.width}px`,
          height: `${state.height}px`,
          visibility: state.visible ? 'visible' : 'hidden',
          display: state.selectedNode ? 'block' : 'none',
        }}
      ></div>

      {/* 选择提示 */}
      {state.selectedNode && (
        <>
          <div
            className={`bm-selector-header-popover ${isHeaderBottom ? 'bottom' : ''}`}
            style={{
              transform: `translate(${state.x}px, ${headerTop}px)`,
              minWidth: `${state.width}px`,
              visibility: state.visible ? 'visible' : 'hidden',
            }}
          >
            <div className="bm-selector-actions">
              <div className="bm-selector-action-item" style={{ padding: '0 8px' }}>
                {state.selectedNode?.name}
              </div>
            </div>
          </div>
          <div
            className={classNames('bm-selector-footer-popover', { top: isFooterTop })}
            style={{
              transform: `translate(${state.x}px, ${footerTop}px)`,
              minWidth: state.width + 'px',
              visibility: state.visible ? 'visible' : 'hidden',
            }}
          >
            <div className="bm-selector-actions">
              {!options?.isCoverAction && (
                <div className="bm-selector-action-item" v-if="state.selectedNode?.allowDelete">
                  <i className="">
                    <Trash2 size={16} />
                  </i>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Selector;
