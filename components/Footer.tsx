import React from "react";
import Image from "next/image";
import { footerLinks } from "@/constants";
import Link from "next/link";

type ColumProps = {
  title: string;
  links: Array<string>;
};
const FooterColumn = ({ title, links }: ColumProps) => {
  return (
    <div className="footer_column">
      <h4 className="font-semibold">{title}</h4>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <Link href="/" key={link}>
            {link}
          </Link>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer flexStart ">
      <div className="flex flex-col gap-12 w-full  mx-auto max-w-screen-xl">
        <div className="flex items-start flex-col">
          <Image
            src="/Owaisibble-purple.png"
            alt="owaisibble"
            width={200}
            height={100}
            className="bg-transparent w-[120px] md:w-[150px]"
          />
          <p className=" text-start text-small font-normal max-w-xs mt-5">
            Owaisibble is the world leading community for creatives to share,
            grow & get hired
          </p>
        </div>
        <div className=" flex flex-wrap gap-12">
          <FooterColumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />
          <div className=" flex flex-col flex-wrap gap-4">
            <FooterColumn
              title={footerLinks[1].title}
              links={footerLinks[1].links}
            />
            <FooterColumn
              title={footerLinks[2].title}
              links={footerLinks[2].links}
            />
          </div>
          <FooterColumn
            title={footerLinks[3].title}
            links={footerLinks[3].links}
          />
          <div className=" flex flex-col flex-wrap gap-4">
            <FooterColumn
              title={footerLinks[4].title}
              links={footerLinks[4].links}
            />
            <FooterColumn
              title={footerLinks[5].title}
              links={footerLinks[5].links}
            />
          </div>
          <FooterColumn
            title={footerLinks[6].title}
            links={footerLinks[6].links}
          />
        </div>
      </div>
      <div className="flexBetween w-full footer_copyright mx-auto max-w-screen-xl">
        <p>@ 2023, Owaisibble, All rights are reserved</p>
        <p className="text-gray">
          <span className="text-black font-semibold">10283</span> projects
          submitted
        </p>
      </div>
    </footer>
  );
};

export default Footer;
