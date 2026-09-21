import type { ReactNode } from "react";
import { MotionProvider } from "@/components/motion-provider";

export default function Template({ children }: Readonly<{ children: ReactNode }>) {
  return <MotionProvider>{children}</MotionProvider>;
}
