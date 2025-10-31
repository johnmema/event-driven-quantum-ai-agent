"use client";

import { FC } from "react";
import { Button } from "../button";

interface Props {
  targetId: string;
  title: string;
}

const HeaderNavigationLink: FC<Props> = ({ targetId, title }) => {
  const handleScroll = () => {
    const el = document.getElementById(targetId);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button variant="navigationHeader" onClick={handleScroll}>
      {title}
    </Button>
  );
};

export default HeaderNavigationLink;
