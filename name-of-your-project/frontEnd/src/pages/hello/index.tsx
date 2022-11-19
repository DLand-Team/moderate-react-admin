import "react";
import styles from "./index.module.scss";
import Card from "./components/card";
import { Image } from "antd";
import helloImg from "@/assets/imgs/dland.png";

export default (props) => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>Moderate admin</div>
      <div className={styles.infoBoard}>
        <Card />
        <div
          style={{
            boxSizing: "border-box",
            width: "100%",
            padding: "40px",
            backgroundColor: "var(--color-fill-2)",
            display: "flex",
            justifyContent: "start",
            color: "black",
            alignItems: "center",
          }}
        >
          <Image width={200} src={helloImg} />
          <h3
            style={{
              fontWeight: "bold",
              marginLeft: "50px",
            }}
          >
            技术交流群，有问题就问，提供强有力的技术支持～～～
          </h3>
        </div>
      </div>
    </div>
  );
};
