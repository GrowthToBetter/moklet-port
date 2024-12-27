"use client";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import { classFullPayload, userFullPayload } from "@/utils/relationsip";
import AddSchool from "./addSchool";
import ModalSchool from "./modalSchool";
import { deleteClass } from "@/utils/server-action/userGetServerSession";

export default function Table({ dataSchool, userData }: { userData: userFullPayload; dataSchool: classFullPayload[] }) {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<classFullPayload | null>(null);
  const [loader, setLoader] = useState(true);
  const columns: TableColumn<classFullPayload>[] = [
    {
      name: "Class ",
      selector: (row) => row.class,
      sortable: true,
    },
    {
      name: "Major ",
      selector: (row) => row.major,
      sortable: true,
    },
    {
      name: "Detail ",
      selector: (row) => row.number,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-x-3">
          <button onClick={() => EditUser(row)} title="Edit" className="p-2 bg-blue-900 text-white rounded-lg hover:scale-110 active:scale-105 duration-150">
            edit
          </button>
          <button onClick={() => DeleteUserById(row.id)} title="Delete" className="p-2.5 bg-red-500 text-white rounded-md hover:scale-110 active:scale-105 duration-150">
            delete
          </button>
        </div>
      ),
    },
  ];
  const EditUser = async (data: classFullPayload) => {
    setModal(true);
    setModalData(data);
  };

  const DeleteUserById = async (id: string) => {
    if (!confirm("Anda yakin ingin menghapus user ini?")) return;
    const toastId = toast.loading("Loading...");
    const result = await deleteClass(id);
    if (result) {
      toast.success(`${result.class} succes to remove`, { id: toastId });
    }
  };

  useEffect(() => {
    setLoader(false);
  }, []);
  if (loader) return <div>Loading</div>;
  return (
    <>
      <section className="min-w-[1440px] max-w-full min-h-full w-full bg-[#F6F6F6] p-4 outline outline-1 outline-slate-200 ml-6">
        <div className="flex justify-end items-center">
          <AddSchool dataSchool={dataSchool} userData={userData}/>
        </div>
        <div className="w-full border-b-2 border-black "></div>
        <div className="mt-6">
          <DataTable data={dataSchool} columns={columns} />
        </div>
        {modal && <ModalSchool userData={userData} setIsOpenModal={setModal} data={modalData} />}
      </section>
    </>
  );
}
