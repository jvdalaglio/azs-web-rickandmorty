"use client";

import { Button } from "@/components/ui/button";
import { EyeOff, HeartOff } from "lucide-react";

export default function EpisodeDetailsSkeleton(): JSX.Element {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-1 text-sm bg-gray-300 rounded w-20 h-5"></div>{" "}
          {/* Voltar */}
          <div className="h-10 bg-gray-300 rounded w-64 mt-2"></div>{" "}
          {/* Título */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <div className="h-6 w-20 bg-gray-300 rounded"></div>
            <div className="h-5 w-36 bg-gray-300 rounded"></div>
            <div className="h-5 w-28 bg-gray-300 rounded"></div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            <EyeOff className="mr-2 h-4 w-4" />
            Loading...
          </Button>
          <Button variant="outline" size="sm" disabled>
            <HeartOff className="mr-2 h-4 w-4" />
            Loading...
          </Button>
        </div>
      </div>

      {/* Personagens */}
      <div className="space-y-4">
        <div className="h-8 w-40 bg-gray-300 rounded animate-pulse"></div>{" "}
        {/* Título Personagens */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded border border-gray-300 p-4 shadow animate-pulse"
            >
              <div className="aspect-square bg-gray-300 rounded mb-3"></div>{" "}
              {/* Imagem */}
              <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>{" "}
              {/* Nome */}
              <div className="flex gap-2">
                <div className="h-5 w-12 bg-gray-300 rounded"></div>{" "}
                {/* Badge */}
                <div className="h-5 w-12 bg-gray-300 rounded"></div>{" "}
                {/* Badge */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
