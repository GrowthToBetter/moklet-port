"use client";

import { SectionContainer } from "@/app/components/layout/SectionContainer";
import { buttonVariants } from "@/app/components/ui/button";
import { SectionTitle } from "@/app/components/ui/SectionTitle";
import { Body3, H1 } from "@/app/components/ui/text";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

export const Custom: FC = () => {
  return (
    <SectionContainer id="custom">
      <div className="flex w-full flex-col-reverse items-end justify-between gap-y-24 lg:flex-row lg:gap-0">
        <div className="w-full lg:max-w-[46%]">
          <SectionTitle>Ajukan</SectionTitle>
          <H1 className="mb-[1.375rem] text-black">
            Ajukan Product Anda Untuk Kami Validasi
          </H1>
          <Body3 className="mb-12 text-neutral-500">
            Kami menyediakan plartform untuk mewadahi product yang kalian buat. 
            Sebagai loncatan bagi anda untuk meraih hal yang lebih tinggi, anda akan dikenal dan diberi kesempatan
            untuk merealisasikan impian anda.
          </Body3>
          <Link
            href={"/AjukanKarya"}
            className={buttonVariants({
              variant: "default",
              className: "w-full sm:w-fit",
            })}
          >
            Ajukan Sekarang <ArrowRight />
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
};
