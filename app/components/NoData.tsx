import Image from "next/image";
import React from "react";

const NoData = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Image src="/images/nodata.png" alt="No data." width={100} height={100} />
      <label>No Data.</label>
    </div>
  );
};

export default NoData;
