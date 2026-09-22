import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from '../Input';

describe('Input', () => {
  it('affiche le label', () => {
    render(<Input label="Email" name="email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('affiche le message d\'erreur', () => {
    render(<Input label="Email" name="email" error="Email invalide" />);
    expect(screen.getByText('Email invalide')).toBeInTheDocument();
  });

  it('applique la bordure rouge en cas d\'erreur', () => {
    render(<Input label="Email" name="email" error="Erreur" />);
    expect(screen.getByLabelText('Email').className).toContain('border-red-500');
  });
});