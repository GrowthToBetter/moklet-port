"use client";
import { FormButton } from "@/app/components/utils/Button";
import React, {  useState } from "react";
import { classFullPayload, userFullPayload } from "@/utils/relationsip";
import ModalSchool from "./modalSchool";

export default function AddGenre({ userData}:{dataSchool:classFullPayload[]; userData:userFullPayload}) {
  const [modal, setModal] = useState(false);
  return (
    <>
      <FormButton type="button" variant="base" onClick={() => setModal(true)}>
        Add Classes
      </FormButton>
      {modal && <ModalSchool userData={userData} setIsOpenModal={setModal} />}
    </>
  );
}
