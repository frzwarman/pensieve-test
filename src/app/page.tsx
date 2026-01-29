import { Suspense } from "react";
import HomeClient from "./HomeClient";

export default function Home() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <HomeClient />
    </Suspense>
  );
}
