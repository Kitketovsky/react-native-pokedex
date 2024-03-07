import { useEffect, useState } from "react";

interface Query<T> {
  loading: boolean;
  error: string | {} | null;
  data: T | null;
  fetched: boolean;
}

interface Props {
  url: string;
  blocked?: boolean;
}

export function useQuery<Data>({ url, blocked = false }: Props) {
  const [state, setState] = useState<Query<Data>>({
    loading: true,
    error: null,
    data: null,
    fetched: false,
  });

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    if (!blocked) {
      fetch(url, {
        headers,
      })
        .then((res) => res.json())
        .then((data) => setState((prev) => ({ ...prev, data, error: null })))
        .catch((error) => setState((prev) => ({ ...prev, data: null, error })))
        .finally(() => {
          setState((prev) => ({ ...prev, loading: false, fetched: true }));
        });
    }
  }, [blocked, url]);

  function setData(data: Data) {
    setState((prev) => ({ ...prev, data }));
  }

  return { ...state, setData };
}
