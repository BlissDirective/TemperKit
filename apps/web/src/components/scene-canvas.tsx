"use client";

import { ProductPedestal } from "@temperkit/runtime";
import type { SceneSpec } from "@temperkit/schema";
import { useEffect, useState } from "react";

export function SceneCanvas({
  spec,
  className,
}: {
  spec: SceneSpec;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid h-full min-h-[320px] place-items-center text-sm text-muted">
        Heating the studio…
      </div>
    );
  }

  return <ProductPedestal spec={spec} className={className} />;
}
