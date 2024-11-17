import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Unstable_Grid2';
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useFields, FormConfig } from '../../common/hooks/useFields';
import { useResponsive } from '../../common/hooks/useResponsive';
import { Tree, processRecordLoop } from '../tree';
import { cloneDeep } from 'lodash-es';
import { TreeItemProps } from '../tree/types';
// ----------------------------------------------------------------------

type Props = {
  formRef: MutableRefObject<any>;
  id: string;
  formConfig: FormConfig;
};

// ----------------------------------------------------------------------
const FormItemTe = ({ formRef, id, formConfig }: Props) => {
  const { formNode, methods } = useFields(formConfig, { formId: id });
  useEffect(() => {
    formRef.current[id] = methods;
  }, []);
  return formNode;
};
export const setDefault = (fields: FormConfig, defaltValues: Record<string, any>) => {
  if (defaltValues) {
    Object.entries(fields).forEach(([key, value]) => {
      if (value.type == 'checkbox') {
        value.defaultValue = defaltValues![key] ? true : false;
      } else {
        value.defaultValue = defaltValues![key] || value.defaultValue || '';
      }
    });
  }
};

export const useCreateTreeData = ({
  value = {},
  transfer,
  baseData,
}: {
  value?: any;
  transfer: any;
  baseData: any;
}): TreeItemProps => {
  const result = useMemo<TreeItemProps>(() => {
    if (value && Object.values(value).length) {
      value = transfer(cloneDeep(value));
      const loop = (base: any, v: any) => {
        base?.formConfig && setDefault(base?.formConfig!, v);
        if (base.sections) {
          base.sections.forEach((item: any) => {
            let valueTemp = v[item.name];
            if (item.type !== 'array') {
              valueTemp && loop(item, valueTemp);
            } else {
              item.sections = [];
              if (Array.isArray(valueTemp)) {
                valueTemp.forEach((itemChild: any) => {
                  let { formConfig, ...rest } = item.formCreater();
                  if (itemChild) {
                    setDefault(formConfig, itemChild);
                  }
                  let fields: TreeItemProps = {
                    ...rest,
                    active: false,
                    formConfig: formConfig,
                    onDelete: (id, listArr) => {
                      let targetId = listArr.findIndex((item) => {
                        return item.id == id;
                      });
                      listArr.splice(targetId, 1);
                    },
                  };
                  item!.sections?.push(fields);
                });
              }
            }
          });
        }
      };
      loop(baseData, value);
    }
    return baseData;
  }, [value, baseData]);

  return result;
};
export interface ActionBtn {
  name: any;
}
export function TreeForm({
  handleClick,
  treeConfig,
  actionBtnArr,
  transferResult,
  transferInput,
  value,
}: {
  value: any;
  actionBtnArr: ActionBtn[];
  handleClick: ({
    type,
    isSuccess,
    result,
  }: {
    type: any;
    isSuccess: boolean;
    result: any;
  }) => void;
  treeConfig: TreeItemProps;
  transferResult: any;
  transferInput: any;
}) {
  const mdUp = useResponsive('up', 'md');
  const allFormRef = useRef<{
    [key: string]: UseFormReturn<
      {
        [key: string]: any;
      },
      any,
      undefined
    >;
  }>({});

  const treeValue = useCreateTreeData({
    value,
    transfer: transferInput,
    baseData: treeConfig,
  });
  useEffect(() => {
    mockData.current = treeValue;
    update();
  }, [treeValue]);
  let mockData = useRef(treeValue);
  const [mockDataMeo, setMockDataMeo] = useState(treeValue);
  const record = useMemo<{ [key: string]: TreeItemProps }>(() => {
    let value = {};
    processRecordLoop(mockData.current, '0', value);
    return value;
  }, [mockDataMeo]);
  const update = () => {
    setMockDataMeo({ ...mockData.current });
  };

  const _handleSubmit = async () => {
    let result = {};
    const loop = (
      value: Record<string, any>,
      treeDataItem: TreeItemProps,
      id: string | number = 0
    ) => {
      let fromIns = allFormRef.current[id];
      if (fromIns) {
        Object.assign(value, fromIns.getValues());
        for (let i in treeDataItem.formConfig) {
          let current = treeDataItem.formConfig[i];
          if (
            current.isNotInForm &&
            treeDataItem.type !== 'array' &&
            treeDataItem.type !== 'object'
          ) {
            delete value[i];
          }
        }
      }
      if (treeDataItem.sections?.length) {
        treeDataItem.sections.forEach((item) => {
          if (item.type == 'array') {
            let current: any[] = (value[item.name || item.label] = []);
            item.sections?.forEach((item) => {
              let val = {};
              loop(val, item, item.id);
              current.push(val);
            });
          } else {
            if (item.judeShow && !item.judeShow()) {
              return;
            }
            let current = (value[item.name || item.label] = {});
            loop(current, item, item.id);
          }
        });
      }
    };
    loop(result, mockDataMeo);

    let isSuccess = true;
    // 校验
    for (let i in record) {
      if (allFormRef.current[i]) {
        const isRight = await allFormRef.current[i]?.trigger();
        record[i].isError = !isRight;
        if (!isRight) {
          isSuccess = false;
        }
        update();
      }
    }
    transferResult?.(result);
    return {
      isSuccess,
      result,
    };
  };

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Tree record={record} update={update} treeRoot={mockDataMeo} />
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}
          {Object.values(record).map((item) => {
            let active = item.isCurrent;
            return (
              <Box
                key={item.id}
                style={
                  active
                    ? {}
                    : {
                        display: 'none',
                      }
                }
              >
                {item.formConfig && (
                  <FormItemTe
                    formRef={allFormRef}
                    id={item.id!}
                    formConfig={item.formConfig}
                  ></FormItemTe>
                )}
              </Box>
            );
          })}
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={12} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flex: 1 }} />
        {actionBtnArr.map((item, key) => {
          return (
            <LoadingButton
              key={key}
              sx={{
                mr: 2,
              }}
              onClick={async () => {
                const { isSuccess, result } = await _handleSubmit();
                handleClick({ type: item.name, isSuccess, result });
              }}
              type="submit"
              variant="contained"
              size="large"
            >
              {item.name}
            </LoadingButton>
          );
        })}
      </Grid>
    </>
  );

  return (
    <Grid container>
      {renderDetails}
      {renderActions}
    </Grid>
  );
}
