import { nextGetServerSession } from "@/lib/authOption";
import Hero from "./components/Hero";
import { FileFullPayload, userFullPayload } from "@/utils/relationsip";
import prisma from "@/lib/prisma";
import { SectionContainer } from "@/app/components/layout/SectionContainer";

export default async function validasi(){
    const session = await nextGetServerSession();
    const getFile = await prisma.fileWork.findMany({
        where:{NOT:{ userClasses:"DELETE"}}
    })
    const currentUser = await prisma.user.findFirst({
        where:{id:session?.user?.id}
    })
    return (
        <SectionContainer>
            <Hero currentUser={currentUser as userFullPayload} ListData={getFile as FileFullPayload[]}/>
        </SectionContainer>
    )
}