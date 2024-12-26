
import Hero from "./components/Hero";
import prisma from "@/lib/prisma";
import { FileFullPayload, userFullPayload } from "@/utils/relationsip";
import { nextGetServerSession } from "@/lib/authOption";
import { PageContainer } from "@/app/components/layout/PageContainer";

export default async function Karya(){
    const session = await nextGetServerSession();
  const getFile = await prisma.fileWork.findMany({
    where: { AND: [{ NOT: { status: "DENIED" } }, { NOT: { status: "PENDING" } }] },
  });
  const getCurrentUser = await prisma.user.findFirst({
    where: { id: session?.user?.id },
  });
  const getGenre = await prisma.genre.findMany();
    return(
        <PageContainer>
            <Hero currentUser={getCurrentUser as userFullPayload} session={session} ListData={getFile as FileFullPayload[]} genre={getGenre} />
        </PageContainer>
    )
}