// components/paginator.tsx
import { Button } from "@/components/ui/button";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Paginator({
  currentPage,
  totalPages,
  onPageChange,
}: PaginatorProps) {
  const goToPrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <Button
        variant="outline"
        onClick={goToPrevious}
        disabled={currentPage === 1}
      >
        Anterior
      </Button>
      <span className="text-sm text-muted-foreground">
        Página {currentPage} de {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={goToNext}
        disabled={currentPage === totalPages}
      >
        Próxima
      </Button>
    </div>
  );
}
