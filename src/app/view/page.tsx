"use client";

import { useEffect, useState } from "react";
import { listSavedIds } from "@/lib/storage";

export default function ViewIndexPage() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(listSavedIds());
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ marginTop: 0 }}>Saved styleguides</h1>
      <p style={{ opacity: 0.8 }}>These are saved locally in this browser.</p>

      {ids.length ? (
        <ul style={{ paddingLeft: 18 }}>
          {ids.map((id) => (
            <li key={id}>
              <a href={`/view/${id}`}>{id}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved guides yet. Go back to the editor and click “Save”.</p>
      )}
    </div>
  );
}