import { AvatarGroupImageModel } from "../../types/avatar-group-image";
import AvatarGroupImage from "./avatar-group-image/avatar-group-image";
import styles from "./avatar-group.module.css";

type AvatarGroupProps = {
  maxLength: number;
  size: "xs" | "sm" | "md" | "lg";
  images: AvatarGroupImageModel[];
};

export default function AvatarGroup({
  maxLength,
  size,
  images,
}: AvatarGroupProps) {
  return (
    <div className={styles["avatar-group-container"]}>
      {images
        .filter((_, index) => index < maxLength)
        .map((image) => (
          <AvatarGroupImage key={image.id} image={image} size={size} />
        ))}
        {
          images.length > maxLength && <div role="total-remaining-people" className={`${styles['avatar-group-text']} ${styles[`image-${size}`]}`}>{`+${images.length - maxLength}`}</div>
        }
    </div>
  );
}
