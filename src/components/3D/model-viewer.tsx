import "@google/model-viewer";

export function ModelViewer({ src }: { src: string }) {
  console.log(src);
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
