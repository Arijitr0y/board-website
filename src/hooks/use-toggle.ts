
'use client';

import { useState, useCallback } from 'react';

// A simple hook for toggling a boolean value.
export const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState(state => !state), []);

  return [state, toggle];
};
