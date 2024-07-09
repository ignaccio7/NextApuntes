// [1,2,3,4,5,6,7]
// [1,2,3,...,6,7]

export function generatePaginationNumbers(currentPage: number, totalPages: number) {
  // Si el numbero total de paginas es 7 o menos
  // vamos a mostrar todas las paginas sin puntos suspensivos
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Si la pagina esta entre las 3 primeras
  // [1,2,3,...,6,7]
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // Si la pagina esta entre las 3 ultimos
  // [1,2,...5,6,7]
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // Si la pagina esta en algun lugar por la mitad
  // [1,...,4,5,6,...,7]
  if (currentPage < totalPages -2 && currentPage > 3) {
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }
}
