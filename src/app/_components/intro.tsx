'use client';
import { CMS_NAME } from "@/lib/constants";
import { ReactTyped } from "react-typed";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-evenly mt-12 mb-16 md:mb-12">
      <h1 className="text-10xl md:text-12xl font-semibold tracking-tighter leading-none md:pr-0 text-balance break-normal">
        BUSCO JUSTICIA POR
      </h1>
      <h4 className="text-right md:text-right font-bold text-7xl mt-5 md:mx-[150px] ">
      <ReactTyped strings={["Mi madre","Mi hija", "Mi hijo", "Mi esposa", "Mi padre", "Mi esposo"]} typeSpeed={200} loop />
      </h4>
    </section>
  );
}
