import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// How JavaScript Closures and Class Declarations Can Affect UI Animations

export function GridModal() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  class Person {
    constructor(
      public name: string,
      public age: number,
    ) {
      this.name = name;
      this.age = age;
    }
  }
  return (
    <>
      <div className="grid w-full grid-cols-3 gap-4 p-4">
        {Array.from({ length: 10 }).map((item, idx) => (
          <motion.div
            key={idx + 1}
            layoutId={`card-${idx + 1}`}
            onClick={() => setSelectedId(idx + 1)}
            className={`h-24 cursor-pointer rounded-md bg-green-500`}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
            />

            <motion.div
              layoutId={`card-${selectedId}`}
              className="fixed top-1/2 left-1/2 z-50 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl"
            >
              <h2 className="mb-2 text-xl font-bold text-red-500">Item {selectedId}</h2>
              <p>This is the expanded view.</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
