"use client";

import { SectionCards } from "@/src/shadcn/components/sectionCards";
import { Input } from "@/src/shadcn/components/ui/input";
import Link from "next/link";
import { useEffect } from "react";

const TestView = () => {
	useEffect(() => {
		debugger;
	}, []);
	return (
		<div>
            123
			<Input />
			<Link href="/dashboard/hello">Go to Hello</Link>
			<SectionCards />
		</div>
	);
};
// ;

export default TestView;
