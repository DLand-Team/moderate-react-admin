import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingPage = () => {
	const navigate = useNavigate();
	useEffect(() => {
		navigate(-1);
	}, []);
	return <div></div>;
};

export default LoadingPage;
