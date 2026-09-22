import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('affiche le texte passé en children', () => {
    render(<Button>Cliquer</Button>);
    expect(screen.getByText('Cliquer')).toBeInTheDocument();
  });

  it('appelle onClick quand cliqué', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Cliquer</Button>);
    fireEvent.click(screen.getByText('Cliquer'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('est désactivé si disabled', () => {
    render(<Button disabled>Cliquer</Button>);
    expect(screen.getByText('Cliquer')).toBeDisabled();
  });

  it('applique la variante primary par défaut', () => {
    render(<Button>Cliquer</Button>);
    expect(screen.getByText('Cliquer').className).toContain('bg-orange-600');
  });

  it('applique la variante danger si spécifiée', () => {
    render(<Button variant="danger">Supprimer</Button>);
    expect(screen.getByText('Supprimer').className).toContain('bg-red-600');
  });
});