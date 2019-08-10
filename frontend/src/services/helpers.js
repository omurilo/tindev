export function randomList(list) {
  const sortedList = list.sort(() => Math.random() * 1.5 - 0.5);

  return sortedList;
}
