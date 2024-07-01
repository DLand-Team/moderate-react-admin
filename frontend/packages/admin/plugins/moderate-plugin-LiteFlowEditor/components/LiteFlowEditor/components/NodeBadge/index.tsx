import React from 'react';
import { Node } from '@antv/x6';
import classNames from 'classnames';
import { NODE_TYPE_INTERMEDIATE_END, NodeTypeEnum, ConditionTypeEnum } from '../../constant';
import { getIconByType } from '../../cells';
import styles from './index.module.scss';

const NodeBadge: React.FC<{ node: Node }> = (props) => {
  const { node } = props;
  const { model } = node.getData();
  let badge = null
  if (model) {
    const currentModel = model.proxy || model;
    if (
      currentModel.type !== node.shape &&
      currentModel.type !== NodeTypeEnum.COMMON &&
      currentModel.type !== ConditionTypeEnum.CHAIN &&
      NODE_TYPE_INTERMEDIATE_END !== node.shape
    ) {
      badge = (
        <div className={classNames(styles.liteflowShapeBadgeWrapper)}>
          <img className={styles.liteflowShapeBadgeSvg} src={getIconByType(currentModel.type)}></img>
        </div>
      );
    }
  }
  return badge;
};

export default NodeBadge;
