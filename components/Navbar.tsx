import Link from "next/link";
import React from "react";
import Image from "next/image";
import { NavLinks } from "@/constants";
import AuthProvider from "./AuthProvider";
import { getCurrentUser } from "@/lib/session";
import ProfileMenu from "./ProfileMenu";
import Button from "./Button";

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <nav className="flexBetween navbar mx-auto max-w-screen-xl">
      <div className="flex-1  flex flexStart gap-10">
        <Link href={"/"}>
          <Image
            src="/Owaisibble.png"
            width={150}
            height={35}
            className="w-[120px] md:w-[150px]"
            alt="owaisibble"
          />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-2 md:gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <Link href={"/create-project"}>
              <Button title="share work" />
            </Link>
          </>
        ) : (
          <AuthProvider />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
