const getNameInitial = (name: string) => {
  const words = name.split(" ");

  if (words.length === 1) return words[0].charAt(0);
  return words[0].charAt(0) + words[words.length - 1].charAt(0);
}

export { getNameInitial }