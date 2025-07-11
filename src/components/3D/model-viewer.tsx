import React, { useEffect, useState } from "react";

export function ModelViewer({ src }: { src: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    import("@google/model-viewer");
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    // @ts-ignore
    <model-viewer
      src={src}
      alt="A 3D model"
      auto-rotate
      camera-controls
      style={{ width: "100%", height: "100%" }}
      ar
    />
  );
}
