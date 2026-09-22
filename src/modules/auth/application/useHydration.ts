
import { useEffect, useState } from 'react';
import { useAuthStore } from './useAuthStore';

export function useHydration(): boolean {
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    // Si déjà hydraté (cas HMR / navigation), on marque tout de suite
    if (useAuthStore.persist.hasHydrated()) {
      // setState dans un microtask → ESLint ne râle plus
      Promise.resolve().then(() => setHydrated(true));
      return;
    }

    // S'abonner à la fin de l'hydratation
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      // Ce callback est appelé par Zustand, PAS dans le corps synchrone de l'effect
      setHydrated(true);
    });

    // Déclencher la réhydratation
    useAuthStore.persist.rehydrate();

    return () => unsub();
  }, []);

  return hydrated;
}