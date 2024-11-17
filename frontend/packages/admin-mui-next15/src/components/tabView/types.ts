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
}

export interface TabViewProps extends Partial<TabsTypeMap> {
  tabs: TabViewItem[];
}
