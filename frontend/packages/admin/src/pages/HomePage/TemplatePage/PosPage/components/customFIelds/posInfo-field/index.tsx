import { Form, FormInstance, Select } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFlat } from "src/service";
import { PosItem } from "src/service/stores/posStore/model";

// Filter `option.label` match the user type `input`
const filterOption = (
    input: string,
    option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const FieldRenderPosInfo = ({
    formIns,
}: {
    formIns: FormInstance<PosItem>;
}) => {
    const { posType, officeOwner, agentOrAirline } = formIns.getFieldsValue();
    const [value, setValue] = useState("");
    const [_, setIsSlect] = useState(false);
    const { locationList, getLocationListAct } = useFlat("commonStore");
    const { t } = useTranslation(["pos"]);

    const { getAgencyDataAct } = useFlat("posStore");
    useEffect(() => {
        getLocationListAct();
    }, []);
    let locationType =
        {
            C: "CITY",
            N: "COUNTRY",
            W: "WORLD",
        }[posType] || "";
    let dataSource =
        locationType in locationList
            ? locationList[locationType].map((item) => {
                  return {
                      label: item,
                      value: item,
                  };
              })
            : [];
    let locationListTemp =
        locationType in locationList ? locationList[locationType] : [];
    const [optionData, setOptionData] = useState<
        {
            label: string;
            value: string;
        }[]
    >([]);
    const onChange = () => {};
    const onSearch = async (value: string) => {
        if (value) {
            if (["I", "T"].includes(posType)) {
                const { payload } = await getAgencyDataAct({
                    posType,
                    posInfo: value,
                    officeOwner,
                    agentOrAirline,
                });
                ;
                setOptionData(
                    payload.map((item) => {
                        return {
                            label: item,
                            value: item,
                        };
                    })
                );
            } else {
                let dataTemp;
                dataTemp = dataSource.filter((item) => {
                    let targetValue = item.value;
                    return (
                        targetValue.toLowerCase().indexOf(value.toLowerCase()) >
                        -1
                    );
                });
                setOptionData(dataTemp);
            }
        } else {
            setOptionData([]);
        }
    };
    return (
        <Form.Item
            rules={[
                {
                    required: true,
                    message: (
                        <div>
                            {t`posPage.placeholder_input` + t`posPage.posInfo`}
                        </div>
                    ),
                },
                {
                    pattern: /^[A-Za-z0-9]+$/,
                    message: <div>{t`posPage.rule_posInfo_1`}</div>,
                },
                {
                    max: 9,
                    message: <div>{t`posPage.rule_posInfo_2`}</div>,
                },
            ]}
            name={"posInfo"}
            style={{
                margin: 0,
            }}
        >
            <Select
                showSearch
                placeholder={t`posPage.placeholder_input`}
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                onSelect={(value) => {
                    setValue(value);
                    setIsSlect(true);
                }}
                filterOption={filterOption}
                onBlur={() => {
                    !locationListTemp.length &&
                        formIns.setFieldsValue({
                            ["posInfo"]: value,
                        });
                    setIsSlect(false);
                }}
                options={optionData}
            />
        </Form.Item>
    );
};

export default FieldRenderPosInfo;
