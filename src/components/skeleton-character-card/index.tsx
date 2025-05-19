export default function CharacterCardSkeleton() {
  return (
    <div className="rounded border border-gray-300 p-0 shadow animate-pulse overflow-hidden">
      <div className="aspect-square bg-gray-300 rounded w-full mb-3"></div>{" "}
      {/* Imagem */}
      <div className="p-3">
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div> {/* Nome */}
        <div className="flex flex-wrap gap-2">
          <div className="h-4 w-12 bg-gray-300 rounded"></div> {/* Badge */}
          <div className="h-4 w-12 bg-gray-300 rounded"></div> {/* Badge */}
        </div>
      </div>
    </div>
  );
}
