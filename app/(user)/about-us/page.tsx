import { Suspense } from "react";
export default function AboutPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<main>The Default About Page</main>{" "}
		</Suspense>
	);
}
