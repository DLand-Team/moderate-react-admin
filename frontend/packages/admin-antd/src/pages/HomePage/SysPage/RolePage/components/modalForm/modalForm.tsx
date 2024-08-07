import { Button, Modal } from "antd";
import React, { useState } from "react";

const ModalForm = (props: {
	children: React.ReactNode;
	handleSubmit: () => void;
	handleCancel?: () => void;
}) => {
	const { children, handleSubmit, handleCancel } = props;
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		handleSubmit();
	};

	const handleCancelLocal = () => {
		setIsModalOpen(false);
		handleCancel?.();
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				修改权限
			</Button>
			<Modal
				title="修改权限"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancelLocal}
			>
				{children}
			</Modal>
		</>
	);
};

export default ModalForm;
