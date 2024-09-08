import Link from "next/link";
import React, { MouseEventHandler } from "react";

type FooterElement = {
  firstText: string;
  secondText: string;
  link?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
  isborderTop?: boolean;
};

const FooterElement: React.FC<FooterElement> = ({
  firstText,
  secondText,
  link = "#",
  onClick,
  isborderTop = false,
}) => {
  return (
    <label
      className="d-flex justify-content-center gap-2 form-text pt-1 w-100"
      style={{ borderTop: `${isborderTop ? "solid 1px #ddd" : ""}` }}
    >
      <span> {`${firstText} ?`}</span>
      <Link type="submit" href={link} onClick={onClick}>
        {secondText}
      </Link>
    </label>
  );
};

export default FooterElement;
