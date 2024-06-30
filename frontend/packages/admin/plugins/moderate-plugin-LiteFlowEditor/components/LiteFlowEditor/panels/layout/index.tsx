import React from 'react';
import { Graph } from '@antv/x6';
import { SplitBox } from '@antv/x6-react-components';
import { useGraphWrapper } from '../../hooks';
import '@antv/x6-react-components/es/split-box/style/index.css';
import styles from './index.module.scss';

interface ISubComponentProps {
  flowGraph: Graph;
}

interface IProps {
  flowGraph: Graph | undefined;
  SideBar: React.FC<ISubComponentProps>;
  ToolBar: React.FC<ISubComponentProps>;
  SettingBar: React.FC<ISubComponentProps>;
}

const Layout: React.FC<IProps> = (props) => {
  const { flowGraph, SideBar, ToolBar, SettingBar } = props;

  const wrapperRef = useGraphWrapper();

  const handleResize = () => {
    if (flowGraph && wrapperRef && wrapperRef.current) {
      const width = wrapperRef.current.clientWidth;
      const height = wrapperRef.current.clientHeight;
      flowGraph.resize(width, height);
    }
  };

  let sideBar, toolBar, settingBar;
  if (flowGraph) {
    sideBar = <SideBar flowGraph={flowGraph} />;
    toolBar = <ToolBar flowGraph={flowGraph} />;
    settingBar = <SettingBar flowGraph={flowGraph} />;
  }

  return (
    <div className={styles.liteflowEditorLayoutContainer}>
      <div className={styles.liteflowEditorToolBar}>{toolBar}</div>
      <SplitBox
        split={'vertical'}
        minSize={50}
        maxSize={500}
        defaultSize={260}
        primary="first"
        onResizing={handleResize}
      >
        <div className={styles.liteflowEditorSideBar}>{sideBar}</div>
        <SplitBox
          split={'vertical'}
          minSize={50}
          maxSize={500}
          defaultSize={260}
          primary="second"
          onResizing={handleResize}
        >
          {props.children}
          <div className={styles.liteflowEditorSettingBar}>{settingBar}</div>
        </SplitBox>
      </SplitBox>
    </div>
  );
};

export default Layout;
