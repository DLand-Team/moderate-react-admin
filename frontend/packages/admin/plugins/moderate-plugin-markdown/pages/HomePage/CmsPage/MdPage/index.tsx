import { useEffect, useState } from "react";
import { MdPreview } from "../../../../components/mdPreview";
import { http2 } from "src/common/http";
const PdfPage = () => {
	const [md, setMd] = useState("");
	useEffect(() => {
		http2.get<any, any>("/test.md").then((res) => {
			setMd(res);
		});
	}, []);
	return (
		<div>
			<MdPreview>{md}</MdPreview>
		</div>
	);
};

export default PdfPage;
