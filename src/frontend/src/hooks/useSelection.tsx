import React, { useState } from "react";

export function useSelection<T>(
  initialValue?: T
): [T | undefined, (value: T) => void, () => void] {
  const [selected, setSelected] = useState<T | undefined>(initialValue);

  const select = (value: T) => {
    setSelected(value);
  };

  const deselect = () => {
    setSelected(undefined);
  };

  return [selected, select, deselect];
}
