import type { ContextTypes } from '../types/types';
import { createContext } from 'react';

const MovieContext: React.Context<ContextTypes | null> = createContext(null);

export default MovieContext;