import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Character } from "@/models/Character";
import Image from "next/image";

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({
  character,
}: CharacterCardProps): JSX.Element {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square w-full overflow-hidden">
        <Image
          src={character.image || "/placeholder.svg"}
          alt={character.name}
          className="h-full w-full object-cover transition-all hover:scale-105"
          width={300}
          height={300}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="p-3">
        <h3 className="font-semibold">{character.name}</h3>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            {character.species}
          </Badge>
          <Badge
            variant={
              character.status === "Alive"
                ? "default"
                : character.status === "Dead"
                ? "destructive"
                : "secondary"
            }
            className="text-xs"
          >
            {character.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
