"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Episode } from "@/models/Episode";
import { ArrowRight, Eye, Heart } from "lucide-react";
import Link from "next/link";
import { JSX } from "react/jsx-dev-runtime";

interface EpisodesCardProps {
  episode: Episode;
  isFavorite: boolean;
  isWatched: boolean;
  onFavoriteToggle: () => void;
  onWatchedToggle: () => void;
}

export default function EpisodesCard({
  episode,
  isFavorite,
  isWatched,
  onFavoriteToggle,
  onWatchedToggle,
}: EpisodesCardProps): JSX.Element {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle>{episode.name}</CardTitle>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <Badge variant="outline" className="text-xs">
            {episode.episode}
          </Badge>
          {isWatched && (
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            >
              Assistido
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex gap-2">
            <span className="text-muted-foreground">Data de exibição:</span>
            <span>{episode.air_date}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground">
              Personagens presentes:
            </span>
            <span>{episode.characters.length}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onFavoriteToggle}
            className={isFavorite ? "text-pink-500" : "text-muted-foreground"}
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onWatchedToggle}
            className={isWatched ? "text-green-500" : "text-muted-foreground"}
          >
            <Eye className="h-4 w-4" />
            <span className="sr-only">
              {isWatched ? "Mark as unwatched" : "Mark as watched"}
            </span>
          </Button>
        </div>
        <Button asChild variant="ghost" size="sm" className="gap-1">
          <Link href={`/episode/${episode.id}`}>
            Detalhes
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
