import type { StockMovement } from '../domain/StockMovement';

/**
 * Échappe une valeur CSV : si elle contient `,` `"` ou un saut de ligne,
 * on l'entoure de guillemets et on double les guillemets internes.
 */
function escapeCsv(value: string | number | undefined | null): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function movementsToCsv(
  movements: StockMovement[],
  productName: string
): string {
  const header = ['Date', 'Type', 'Quantité', 'Observation'];

  const rows = movements.map((m) => [
    new Date(m.data).toLocaleString('fr-FR'),
    m.tipo === 'ENTRADA' ? 'Entrée' : 'Sortie',
    m.quantidade,
    m.observacao ?? '',
  ]);

  const lines = [header, ...rows].map((row) =>
    row.map(escapeCsv).join(',')
  );

  // BOM UTF-8 pour qu'Excel ouvre correctement les accents
  return '\uFEFF' + lines.join('\n');
}

export function downloadCsv(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportMovementsToCsv(
  movements: StockMovement[],
  productName: string
): void {
  const csv = movementsToCsv(movements, productName);
  const safeName = productName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const date = new Date().toISOString().slice(0, 10);
  downloadCsv(csv, `mouvements-${safeName}-${date}.csv`);
}