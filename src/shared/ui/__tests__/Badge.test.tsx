import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';

describe('Badge', () => {
  it('affiche le contenu', () => {
    render(<Badge>Actif</Badge>);
    expect(screen.getByText('Actif')).toBeInTheDocument();
  });

  it('applique la variante success', () => {
    render(<Badge variant="success">OK</Badge>);
    expect(screen.getByText('OK').className).toContain('bg-green-100');
  });

  it('applique la variante danger', () => {
    render(<Badge variant="danger">Erreur</Badge>);
    expect(screen.getByText('Erreur').className).toContain('bg-red-100');
  });
});