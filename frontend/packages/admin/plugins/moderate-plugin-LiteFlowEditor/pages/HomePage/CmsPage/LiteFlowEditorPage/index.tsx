import LiteFlowEditor from "plugins/moderate-plugin-LiteFlowEditor/components/LiteFlowEditor";
const PdfPage = () => {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				overflow: "auto",
			}}
		>
			<LiteFlowEditor />
		</div>
	);
};

export default PdfPage;
