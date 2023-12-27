"use client";

import classNames from "classnames";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import React from "react";

const navdata2 = [
  {
    name: "뮤지컬",
    link: "/musical",
  },
  {
    name: "콘서트",
    link: "/concert",
  },
  {
    name: "연극",
    link: "/play",
  },
  {
    name: "클래식",
    link: "/classic",
  },
  {
    name: "스포츠",
    link: "/sports",
  },
];

const NavTab = () => {
  const { id } = useParams();

  return (
    <div className="flex gap-8">
      {navdata2.map((item, index) => (
        <Link
          href={`${item.link}`}
          key={index}
          className={classNames("hover:text-primary hover:font-bold", {
            "text-primary font-bold": id === item.link.replace("/", ""),
          })}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default NavTab;
