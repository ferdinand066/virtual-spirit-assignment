import AvatarGroupImage from "../components/avatar-group/avatar-group-image/avatar-group-image";
import { fireEvent, render, waitFor, screen, cleanup } from "@testing-library/react";
import { getNameInitial } from "../utils/function";
import { persons } from "../data/person";
import AvatarGroup from "../components/avatar-group/avatar-group";
import { AvatarSize } from "../types/avatar-group-image";


describe("Test Avatar Group Image Component", () => {
  test("should render an image if it loads successfully", () => {
    const image = {
      id: "1",
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80',
      placeholder: getNameInitial('Joseph Gonzalez'),
    };

    const { getByRole } = render(
      <AvatarGroupImage image={image} size="xs" />
    );

    const component = getByRole("avatar-image");

    expect(component).toBeInTheDocument();

    expect(component.className.includes('avatar-group-image')).toBe(true);
    expect(component.className.includes('avatar-group-text')).toBe(false);

    cleanup();
  });

  test("should render a placeholder div if it fails to load the image", async () => {
    const image = {
      id: "1",
      imageUrl: "invalid-url",
      placeholder: getNameInitial('Joseph Gonzalez'),
    };

    render(
      <AvatarGroupImage image={image} size="xs" />
    );

    await waitFor(() => {
      const img = screen.getByRole('avatar-image');
      fireEvent.error(img);
    });

    const component = screen.getByRole("avatar-image");

    expect(component.className.includes('avatar-group-image')).toBe(false);
    expect(component.className.includes('avatar-group-text')).toBe(true);

    cleanup();
  });

  test("should render images with the same number according to the parameters given",  () => {
    const images = persons.map((person) => ({
      ...person,
      placeholder: getNameInitial(person.name)
    }));

    const maxLength = 2;

    render(
      <AvatarGroup images={images} maxLength={maxLength} size="xs" />
    );

    const avatarImageComponents = screen.getAllByRole("avatar-image");
    const totalRemainingPeopleComponent = screen.getByRole("total-remaining-people");

    expect(avatarImageComponents.length === maxLength).toBe(true);
    expect(totalRemainingPeopleComponent).toHaveTextContent(`+${images.length - maxLength}`);
    cleanup();

  });

  test("should render images with the same size according to the size parameter given", () => {
    const images = persons.map((person) => ({
      ...person,
      placeholder: getNameInitial(person.name)
    }));

    const sizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg'];

    sizes.forEach(size => {
      render(
        <AvatarGroup images={images} maxLength={2} size={size} />
      );

      const avatarImageComponents = screen.getAllByRole("avatar-image");
      const filteredAvatarImageComponents = avatarImageComponents.filter((component) => component.className.includes(`image-${size}`));

      expect(filteredAvatarImageComponents.length).toBe(avatarImageComponents.length);
      cleanup();
    });

    cleanup();
  });

  test('should component match snapshots', () => {
    const images = persons.map((person) => ({
      ...person,
      placeholder: getNameInitial(person.name)
    }));

    const { container } = render(
      <AvatarGroup images={images} maxLength={2} size="xs" />
    );

    expect(container).toMatchSnapshot();
  });
});
