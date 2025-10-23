import { use } from "react";
import { PageMiddleContent, PageWrapper } from "@/components/PageWrapper";
import { TeamList, TeamMember } from "@/components/ui/Team";
import {
  getWordPressMediaById,
  type WordPressAcfContent,
} from "@/lib/fetchContent";
import { teamMembers } from "@/data/teamMembers";
import { getGitHubWorkflowBuild, getWordpressApiUrl } from "@/lib/environment";
import { TeamMember as TeamMemberAcf } from "@/types/types";

export async function fetchPageContentByFile(): Promise<TeamMemberAcf[]> {
  let data: TeamMemberAcf[] = teamMembers;
  if (!getGitHubWorkflowBuild()) {
    const url = `${getWordpressApiUrl()}/team`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Fehler beim Laden von Content`);
    }
    const apiData = (await res.json()) as WordPressAcfContent<TeamMemberAcf>[];
    data = apiData.map((entry) => entry.acf);
    if (!data) {
      throw new Error(`Kein Content für  gefunden`);
    }
  }
  return data;
}

export default function Team() {
  const members = use(fetchPageContentByFile());
  return (
    <PageWrapper context={{ id: 243, type: "my-page" }}>
      <PageMiddleContent>
        <TeamList description="Lorem Ipsum" headline="Unser Team">
          {members.map((member) => {
            const attachment = use(getWordPressMediaById(member.image));
            const imageUrl = attachment.media_details.sizes.medium.source_url;

            return (
              <TeamMember
                bio={member.bio}
                image={{ url: imageUrl }}
                key={member.name}
                name={member.name}
                role={member.position}
              />
            );
          })}
        </TeamList>
      </PageMiddleContent>
    </PageWrapper>
  );
}
