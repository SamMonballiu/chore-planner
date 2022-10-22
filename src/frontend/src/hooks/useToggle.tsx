import { useState } from "react";

export function useToggle(initial: boolean): [value: boolean, toggle: () => void] {
  const [value, setValue] = useState<boolean>(initial);

  const toggle = () => setValue(!value);

  return [value, toggle];
}
