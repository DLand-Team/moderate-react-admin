import { TabsTypeMap } from '@mui/material';

export interface TabViewPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}
export interface TabViewItem {
  id?: string;
  label: string;
  node: React.ReactNode;
  Node?: () => React.ReactNode;
}

export interface TabViewProps extends Partial<TabsTypeMap['props']> {
  tabs: TabViewItem[];
  tabId: string;
  handleTabChange: (tabId: string) => void;
  errorResult: boolean[];
}
