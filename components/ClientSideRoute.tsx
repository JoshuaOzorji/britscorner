"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface ClientSideRouteProps {
	href: string;
	children: ReactNode;
	className?: string;
}

const ClientSideRoute = ({
	href,
	children,
	className,
}: ClientSideRouteProps) => {
	return (
		<Link href={href} className={className}>
			{children}
		</Link>
	);
};

export default ClientSideRoute;
