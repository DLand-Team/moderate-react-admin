import {
  driver,
  type Config as DriverConfig,
  type State as DriverConfigState,
  type DriveStep,
} from 'driver.js';
import 'driver.js/dist/driver.css';
import { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { GuideApi } from './guideCoreProvider';

export type GuideApiX<T extends string = any> = ReturnType<typeof driver> & GuideApi<T>;
// ----------------------------------------------------------------------
type BeforeWorkFunction = (
  params:
    | {
        api: ReturnType<typeof driver>;
        config: any; // Replace 'any' with the actual type of config
        state: any; // Replace 'any' with the actual type of state
      }
    | undefined
) => void | Promise<void>;
type DriveStepEazy<T extends string = any> = Omit<DriveStep, 'popover'> & {
  popover?: Omit<Exclude<DriveStep['popover'], undefined>, 'onPopoverRender'>;
  beforeWork?: BeforeWorkFunction;
  id?: string;
  customPopRender?: ({
    config,
    state,
    api,
  }: {
    config: DriverEazyConfig<T>;
    state: DriverConfigState;
    api: ReturnType<typeof driver> & GuideApi<T>;
  }) => ReactElement;
};
export type DriverConfigBase = Omit<DriverConfig, 'popover'>;
export type DriverEazyConfig<T extends string = any> = Omit<DriverConfigBase, 'steps'> & {
  steps?: DriveStepEazy<T>[];
};
const preventScroll = (event: any) => {
  event.preventDefault();
};
function disableScroll() {
  window.addEventListener('wheel', preventScroll, { passive: false });
  window.addEventListener('touchmove', preventScroll, { passive: false });
}

function enableScroll() {
  window.removeEventListener('wheel', preventScroll);
  window.removeEventListener('touchmove', preventScroll);
}

// 推一下customRender是否存在
const driverPro = <T extends string = any>(
  props:
    | (Omit<DriverConfig, 'steps'> & {
        steps?: (DriveStep & {
          id?: T;
          beforeWork?: BeforeWorkFunction;
        })[];
      })
    | DriverEazyConfig<T>,
  api: GuideApi
) => {
  const { steps, onHighlighted, onDestroyed } = props;
  let ins: {
    current: ReturnType<typeof driver> & GuideApi;
  } = { current: {} as ReturnType<typeof driver> & GuideApi };

  props.onHighlighted = (...args) => {
    disableScroll();
    onHighlighted?.(...args);
    const svgElement = document.querySelector(
      'svg.driver-overlay.driver-overlay-animated'
    ) as HTMLElement;
    if (svgElement) {
      svgElement.style.pointerEvents = 'auto'; // 确保 SVG 本身可以接收事件
    }
  };

  props.onDestroyed = (...args) => {
    enableScroll();
    onDestroyed?.(...args);
  };
  steps?.forEach((item) => {
    if (!item.popover) {
      item.popover = {};
    }
    const { id: eleId, element } = item;
    if (!element && eleId) {
      item.element = `#${eleId}`;
    }
    if ('customPopRender' in item) {
      //@ts-ignore 类型守卫一波，当customRender存在，那么我们就自行的补上onPopoverRender
      item.popover.onPopoverRender = (popover, { config, state }) => {
        // 重置默认dom
        popover.wrapper.innerHTML = '';
        popover.wrapper.style.backgroundColor = 'transparent'; // 或者使用空字符串
        popover.wrapper.style.boxShadow = 'none';
        popover.wrapper.style.padding = '0px';
        const root = createRoot(popover.wrapper);

        const { customPopRender: CustomRender, beforeWork } = item;
        const callF = () => {
          CustomRender &&
            root.render(
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                }}
              >
                <CustomRender
                  api={ins.current as ReturnType<typeof driver> & GuideApi}
                  config={config}
                  state={state}
                />
              </div>
            );
        };
        if (beforeWork) {
          const result = beforeWork?.({
            api: ins.current as ReturnType<typeof driver>,
            config: config,
            state: state,
          });

          if (result instanceof Promise) {
            result.then(() => {
              callF();
            });
          } else {
            callF();
          }
        } else {
          callF();
        }
      };
    } else {
      item.beforeWork?.(undefined);
    }
  });
  ins.current = { ...driver(props), ...api };
  ins.current.getActiveElement;
  return ins.current as ReturnType<typeof driver>;
};

export default driverPro;
