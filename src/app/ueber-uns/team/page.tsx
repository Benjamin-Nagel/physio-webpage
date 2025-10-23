import { use } from "react";
import { PageMiddleContent, PageWrapper } from "@/components/PageWrapper";
import { TeamList, TeamMember } from "@/components/ui/Team";
import {
	getWordPressMediaById,
	type WordPressAcfContent,
} from "@/lib/fetchContent";

type WordPressTeamMemberAcf = {
	name: string;
	funktion: string;
	image: number;
};

const wordPressUrl = "http://localhost:8080/wp-json/wp/v2";

export async function fetchPageContentByFile(): Promise<
	WordPressAcfContent<WordPressTeamMemberAcf>[]
> {
	const url = `${wordPressUrl}/team`;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Fehler beim Laden von Content`);
	const data =
		(await res.json()) as WordPressAcfContent<WordPressTeamMemberAcf>[];
	if (!data) throw new Error(`Kein Content für  gefunden`);
	return data;
}

export default function Team() {
	const members = use(fetchPageContentByFile());
	return (
		<PageWrapper context={{ id: 243, type: "my-page" }}>
			<PageMiddleContent>
				<TeamList description="Lorem Ipsum" headline="Unser Team">
					{members.map((member) => {
						const attachment = use(getWordPressMediaById(member.acf.image));
						const imageUrl = attachment.media_details.sizes.medium.source_url;

						return (
							<TeamMember
								bio=""
								image={{ url: imageUrl }}
								key={member.acf.name}
								name={member.acf.name}
								role={member.acf.funktion}
							/>
						);
					})}
				</TeamList>
			</PageMiddleContent>
		</PageWrapper>
	);
}
