import Image from "next/image";
import React from "react";

const TemplateImage = ({
  imageId,
  imagePath,
  defaultImagePath,
  imageStyle,
  imageName,
  setDefaultImageCallbak,
  handleImageChangeCallback,
}: any) => {
  return (
    <div className="position-relative w-100 h-100">
      <Image
        id={imageId}
        src={imagePath}
        width={100}
        height={100}
        onError={() => setDefaultImageCallbak(imageId, defaultImagePath)}
        style={{ objectFit: "cover", margin: "auto" }}
        alt="image"
      />
      <label
        htmlFor={imageName}
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          backgroundColor: "gray",
          borderRadius: "50%",
          margin: "5px",
          padding: "5px",
          width: "30px",
          height: "30px",
          cursor: "pointer",
          boxShadow: "0px 2px 4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
        }}
        title="Change this image"
      >
        <i className="fas fa-edit"></i>
      </label>
      <input
        id={imageName}
        type="file"
        name={imageName}
        onChange={(e) => handleImageChangeCallback(e, imageId)}
        style={{ visibility: "hidden" }}
        accept="image/*"
      />
    </div>
  );
};

export default TemplateImage;
