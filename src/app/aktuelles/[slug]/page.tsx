import {
	PageBottomContent,
	PageMiddleContent,
	PageTopContent,
	PageWrapper,
} from "@/components/PageWrapper";

interface AktuellesParams {
	params: {
		slug: string;
	};
}

export async function generateStaticParams() {
	return [
		{
			slug: "hallo",
		},
	];
}

export default function AktuelleNachricht({ params }: AktuellesParams) {
	return (
		<PageWrapper context={{ id: 229, type: "my-page" }}>
			<PageTopContent>
				<h1>{params.slug}</h1>
			</PageTopContent>
			<PageMiddleContent></PageMiddleContent>
			<PageBottomContent></PageBottomContent>
		</PageWrapper>
	);
}
