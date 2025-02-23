import { appConfig } from "@/config/app";
import { Icons } from "./icons";

export function Logo() {
  return (
    <>
      <Icons.logo className="h-8" />
      {/* <span className="font-bold">{appConfig.name}</span> */}
    </>
  );
}
