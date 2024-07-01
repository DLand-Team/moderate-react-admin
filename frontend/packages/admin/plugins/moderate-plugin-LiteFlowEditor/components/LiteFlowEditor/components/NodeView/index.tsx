import { Node } from '@antv/x6';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';

import styles from './index.module.scss';

const NodeView = (props:PropsWithChildren<{ icon: string; node: Node }>) => {
  const { icon, children } = props;
  return (
    <div className={classNames(styles.liteflowShapeWrapper)}>
      <img className={styles.liteflowShapeSvg} src={icon}></img>
      { children }
    </div>
  );
};

export default NodeView;
