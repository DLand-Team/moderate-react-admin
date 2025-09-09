import { Col, Row } from "antd";
import { useEffect } from "react";
import { useFlat } from "src/service";
import PluginCard from "../components/card";
let temp = [
  {
    name: "moderate-plugin-pdf",
    gitee: "https://gitee.com/qanglee/moderate-plugin-pdf.git",
    cover:
      "https://qiniu.moderate.run/plugins/moderate-plugin-pdf/QQ20210214-140334%E7%9A%84%E5%89%AF%E6%9C%AC.png",
    desc: "支持pdf预览",
    author: {
      name: "闲D阿强",
      avatar: "https://qiniu.moderate.run/plugins/moderate-plugin-pdf/test.gif",
    },
    isInstalled: true,
  },
  {
    name: "moderate-plugin-markdown",
    gitee: "https://gitee.com/qanglee/moderate-plugin-markdown.git",
    cover:
      "https://qiniu.moderate.run/plugins/moderate-plugins-mardown/mdplugin.gif",
    desc: "支持MarkDown预览",
    author: {
      name: "闲D阿强",
      avatar: "https://qiniu.moderate.run/plugins/moderate-plugin-pdf/test.gif",
    },
    isInstalled: true,
  },
  {
    name: "moderate-plugin-winbox",
    gitee: "https://gitee.com/qanglee/moderate-plugin-winbox.git",
    cover:
      "https://qiniu.moderate.run/plugins/moderate-plugin-winbox/Google%20Chrome.gif",
    desc: "winbox继承，实现更自由，实用的Modal框",
    author: {
      name: "闲D阿强",
      avatar: "https://qiniu.moderate.run/plugins/moderate-plugin-pdf/test.gif",
    },
    isInstalled: true,
  },
  {
    name: "moderate-plugin-music",
    gitee: "https://gitee.com/qanglee/moderate-plugin-music.git",
    cover:
      "https://qiniu.moderate.run/plugins/moderate-plugin-music/player/music.gif",
    desc: "深红老师的酷炫的音乐播放器，你值得拥有～",
    author: {
      name: "Crimson",
      avatar:
        "https://qiniu.moderate.run/plugins/moderate-plugin-music/b_2e4d73c5ccab4bdc2d18ede66749cff3.jpg",
    },
    isInstalled: true,
  },
  {
    name: "moderate-plugin-rive",
    gitee: "https://gitee.com/qanglee/moderate-plugin-rive.git",
    cover: "https://qiniu.moderate.run/plugins/moderate-plugin-rive/rive.gif",
    desc: "酷炫的动画，使用Rive轻松实现～",
    author: {
      name: "闲D阿强",
      avatar: "https://qiniu.moderate.run/plugins/moderate-plugin-pdf/test.gif",
    },
    isInstalled: true,
  },
  {
    name: "moderate-plugin-layout-wind",
    gitee: "https://gitee.com/qanglee/moderate-plugin-layout-wind.git",
    cover:
      "https://qiniu.moderate.run/plugins/moderate-plugin-layout-wind/wind.gif",
    desc: "官方布局-Wind",
    author: {
      name: "闲D阿强",
      avatar: "https://qiniu.moderate.run/plugins/moderate-plugin-pdf/test.gif",
    },
    isInstalled: true,
  },
  {
    name: "moderate-plugin-layout-rain",
    gitee: "https://gitee.com/qanglee/moderate-plugin-layout-rain.git",
    cover:
      "https://qiniu.moderate.run/plugins/moderate-plugin-layout-wind/rain.gif",
    desc: "官方布局-Rain",
    author: {
      name: "闲D阿强",
      avatar: "https://qiniu.moderate.run/plugins/moderate-plugin-pdf/test.gif",
    },
    isInstalled: true,
  },
  {
    name: "moderate-plugin-shiki",
    gitee: "https://gitee.com/qanglee/moderate-plugin-shiki",
    cover: "https://qiniu.moderate.run/plugins/moderate-plugin-shiki/shiki.gif",
    desc: "shiki，一款精致的，面向未来的ai代码编辑器",
    author: {
      name: "一介",
      avatar:
        "https://qiniu.moderate.run/plugins/moderate-plugin-shiki/51358815.jpeg",
    },
    isInstalled: true,
  },
];
const PluginListPage = () => {
  const { getPluginListAct, pluginList } = useFlat("devStore");

  // useEffect(() => {
  // 	getPluginListAct();
  // }, []);

  return (
    <Row
      style={{
        paddingTop: "30px",
      }}
      gutter={[16, 26]}
      wrap={true}
    >
      {temp.map((item) => {
        return (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={8}
            xl={6}
            key={item.gitee}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PluginCard data={{ ...item, cover: "/logo.png" }} />
          </Col>
        );
      })}
    </Row>
  );
};

export default PluginListPage;
