"use client";

import { routerHelper } from "@/src/service";
import { Button } from "@/src/shadcn/components/ui/button";
import { Input } from "@/src/shadcn/components/ui/input";

const HelloView = () => {
	return (
		<div>
			<div>
				<Button
					onClick={() => {
						routerHelper.junpTo("test");
					}}
				>
					Go to Test Page
				</Button>
			</div>
			<Input />
		</div>
	);
};

export default HelloView;
