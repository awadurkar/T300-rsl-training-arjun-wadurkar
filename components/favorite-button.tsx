"use client";

import { useEffect, useState } from "react";

export function FavoriteButton({ projectId }: { projectId: string }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(window.localStorage.getItem("project-explorer-favorites") ?? "[]") as string[];
    setFavorite(favorites.includes(projectId));
  }, [projectId]);

  function toggleFavorite() {
    const favorites = JSON.parse(window.localStorage.getItem("project-explorer-favorites") ?? "[]") as string[];
    const next = favorite ? favorites.filter((id) => id !== projectId) : [...new Set([...favorites, projectId])];
    window.localStorage.setItem("project-explorer-favorites", JSON.stringify(next));
    setFavorite(!favorite);
  }

  return (
    <button
      className={`grid size-[31px] place-items-center rounded-lg border text-lg transition-colors ${favorite ? "border-amber-200 bg-amber-50 text-amber-500" : "border-line bg-surface text-muted hover:border-accent hover:text-accent"}`}
      onClick={toggleFavorite}
      aria-pressed={favorite}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      title={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      {favorite ? "★" : "☆"}
    </button>
  );
}
