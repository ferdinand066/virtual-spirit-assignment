import { useState } from "react";
import { AvatarGroupImageModel, AvatarSize } from "../../../types/avatar-group-image";
import styles from "../avatar-group.module.css";
import classNames from "classnames";

type AvatarGroupImageProps = {
  image: AvatarGroupImageModel;
  size: AvatarSize;
};

export default function AvatarGroupImage({
  image,
  size,
}: AvatarGroupImageProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  const imageClasses = classNames(
    styles["avatar-group-image"],
    styles["avatar-group-container-child"],
    styles[`image-${size}`]
  );

  const placeholderClasses = classNames(
    styles["avatar-group-text"],
    styles["avatar-group-container-child"], 
    styles[`image-${size}`],
  );

  return (
    <>
      {isImageLoaded ? (
        <img
          role="avatar-image"
          key={image.id}
          src={image.imageUrl ?? ""}
          alt={image.placeholder}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(false)}
          className={imageClasses}
        />
      ) : (
        <div
          role="avatar-image"
          className={placeholderClasses}
        >
          {image.placeholder}
        </div>
      )}
    </>
  );
}
