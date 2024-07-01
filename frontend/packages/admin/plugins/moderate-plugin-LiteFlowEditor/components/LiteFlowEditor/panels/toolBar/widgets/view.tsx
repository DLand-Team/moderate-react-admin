import { EyeOutlined } from "@ant-design/icons";
import { Graph } from "@antv/x6";
import React from "react";
import { Modal } from "antd";
import JsonView from "react-json-view";

import makeBtnWidget from "./common/makeBtnWidget";
import { useModel } from "../../../hooks";

interface IProps {
	flowGraph: Graph;
}

const View: React.FC<IProps> = makeBtnWidget({
	tooltip: "查看DSL",
	handler() {
		const model = useModel();
		Modal.info({
			title: "查看DSL",
			width: 1000,
			maskClosable: true,
			closable: true,
			content: (
				// @ts-ignore
				<JsonView
					name={null}
					collapsed={false}
					enableClipboard={true}
					displayDataTypes={false}
					displayObjectSize={false}
					src={JSON.parse(JSON.stringify(model.toJSON()))}
				/>
			),
		});
		console.log(JSON.stringify(model.toJSON(), null, 2));
	},
	getIcon() {
		return <EyeOutlined />;
	},
	disabled() {
		return false;
	},
});

export default View;
