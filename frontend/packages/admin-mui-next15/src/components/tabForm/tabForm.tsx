import React, { forwardRef, memo, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { FormConfig } from '../../index';
import { FormView } from './formView';
import { TabView } from './tabView';
import { FormRefType } from './types';

// ----------------------------------------------------------------------

const TabForm = memo(
  forwardRef(function DealFormView(
    {
      tabConfig,
      tabId,
      handleTabChange,
    }: {
      tabId: string;
      tabConfig: {
        id: string;
        label: string;
        node: FormConfig;
      }[];
      handleTabChange: (tabId: string) => void;
    },
    ref
  ) {
    const formMapRef = useRef<Record<PropertyKey, FormRefType>>({});
    const [errorResult, setErrRes] = useState<boolean[]>([]);
    const validate = async (formArr: FormRefType[]) => {
      let checkArr = formArr!.map((item) => {
        return item!.trigger();
      });
      const resArr = await Promise.all(checkArr);
      setErrRes(resArr);
      if (
        resArr.some((item) => {
          return !item;
        })
      ) {
        return false;
      }
      return true;
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          validate,
          getTabFormRef: () => {
            return formMapRef.current;
          },
        };
      },
      [tabConfig]
    );
    const tabsNode = useMemo(() => {
      let result: {
        id: string;
        label: string;
        node: React.ReactNode;
      }[] = [];
      for (let i in tabConfig) {
        const item = tabConfig[i];
        result.push({
          id: item.id,
          label: item.label,
          node: <FormView id={item.id} formRef={formMapRef} formConfig={item.node} />,
        });
      }
      return result;
    }, [tabConfig]);
    return (
      <TabView
        errorResult={errorResult}
        tabId={tabId}
        handleTabChange={handleTabChange}
        tabs={tabsNode}
        variant="scrollable"
        scrollButtons="auto"
      />
    );
  })
);
export default TabForm;
