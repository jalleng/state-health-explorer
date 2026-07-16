import { useMemo } from "react";

type Measure = {
  category: string;
  data_value: string | number;
  [key: string]: any;
};

export function useMeasures<T extends Measure>(
  data: T[],
  activeCategory: string,
  sortDir: string,
) {
  return useMemo(() => {
    const filtered =
      activeCategory === "All"
        ? data
        : data.filter((d) => d.category === activeCategory);

    return [...filtered].sort((a, b) => {
      const ascending = sortDir === "asc";
      return ascending
        ? Number(a.data_value) - Number(b.data_value)
        : Number(b.data_value) - Number(a.data_value);
    });
  }, [data, activeCategory, sortDir]);
}
