import { useEffect, useState } from "react";

export function useLocalStorageList(key: string) {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) setList(JSON.parse(stored));
  }, [key]);

  const toggleItem = (id: string) => {
    const newList = list.includes(id)
      ? list.filter((item) => item !== id)
      : [...list, id];

    setList(newList);
    localStorage.setItem(key, JSON.stringify(newList));
  };

  return { list, toggleItem };
}
