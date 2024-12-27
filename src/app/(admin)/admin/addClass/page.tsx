import React from "react";
import AdminHeaders from "../components/main/AdminHeaders";
import prisma from "@/lib/prisma";
import Table from "./components/tableSchool";
import { userFullPayload } from "@/utils/relationsip";
import { nextGetServerSession } from "@/lib/authOption";
import { SectionContainer } from "@/app/components/layout/SectionContainer";

export default async function teamData() {
  const dataSchool = await prisma.classes.findMany();
  const session = await nextGetServerSession();
  const userData = await prisma.user.findFirst({
    where: {
      id: session?.user?.id,
    },
    include: {
      userAuth: true,
    },
  });
  return (
    <SectionContainer>
      <AdminHeaders data="Data Class" />
      <Table userData={userData as userFullPayload} dataSchool={dataSchool} />
    </SectionContainer>
  );
}
