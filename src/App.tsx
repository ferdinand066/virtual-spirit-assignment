import AvatarGroup from "./components/avatar-group/avatar-group";
import { persons } from "./data/person";
import { getNameInitial } from "./utils/function";

export default function App() {
  const avatarGroupImages = persons.map((person) => ({
    id: person.id,
    imageUrl: person.imageUrl,
    placeholder: getNameInitial(person.name),
  }));

  return (
    <>
      <div className="container">
        <AvatarGroup maxLength={2} size="xs" images={avatarGroupImages} />
      </div>
    </>
  );
}
