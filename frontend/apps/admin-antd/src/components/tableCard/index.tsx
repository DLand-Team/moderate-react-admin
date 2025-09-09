import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, ButtonProps, Card, Tooltip } from "antd";
import {
  CSSProperties,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
} from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

export interface TableCardProps {
  className?: string;
  style?: CSSProperties;
  title?: string;
  desc?: string;
  buttonList: {
    title: string;
    icon?: ReactElement<any>;
    handleClick?: MouseEventHandler<HTMLElement>;
    option?: ButtonProps;
  }[];
}

const TableCard = (props: PropsWithChildren<TableCardProps>) => {
  const {
    title,
    desc,
    buttonList = [],
    children,
    className,
    style = {},
  } = props;
  return (
    <Card
      className={classNames([className, styles.container])}
      style={style}
      styles={{
        header: {
          height: "50px",
          display: "flex",
          alignItems: "center",
        },
      }}
      title={
        <div
          style={{
            position: "relative",
            height: "50px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {title}
          {desc && (
            <Tooltip title={desc} placement="rightTop">
              <QuestionCircleOutlined style={{ marginLeft: 8 }} />
            </Tooltip>
          )}
          <div className={styles.titleWapper}>
            <div>
              {buttonList.map((item, index) => {
                const { icon, title, handleClick, option = {} } = item;
                return (
                  <Button
                    key={index}
                    type="primary"
                    onClick={handleClick}
                    icon={icon}
                    {...option}
                    style={{
                      marginLeft: "12px",
                    }}
                  >
                    {title}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      }
    >
      {children}
    </Card>
  );
};

export default TableCard;
