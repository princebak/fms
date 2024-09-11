import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const SubscribButton = ({ closeModal }: any) => {
  const router = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault();

    closeModal();
    router.push("/payment");
  };

  return (
    <Link
      className="btn btn-success d-flex gap-1"
      href="#"
      onClick={handleClick}
    >
      <div style={{ width: "25px", cursor: "pointer" }}>
        <Image
          src="/images/subscription.png"
          width={100}
          height={100}
          alt="subscription"
        />
      </div>
      <label style={{ cursor: "pointer" }}>Subscribe</label>
    </Link>
  );
};

export default SubscribButton;
