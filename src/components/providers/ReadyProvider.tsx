"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";

type ReadyContextValue = {
  /** True once the preloader has finished and the page may animate in. */
  ready: boolean;
  setReady: (value: boolean) => void;
};

const ReadyContext = createContext<ReadyContextValue>({
  ready: false,
  setReady: () => undefined,
});

export function useReady() {
  return useContext(ReadyContext);
}

export function Providers({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const value = useMemo(() => ({ ready, setReady }), [ready]);

  return (
    <MotionConfig reducedMotion="user">
      <ReadyContext.Provider value={value}>{children}</ReadyContext.Provider>
    </MotionConfig>
  );
}
