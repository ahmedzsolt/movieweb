import { createContext } from "react";
import type { ContextTypes } from "../types/types";

const MovieContext = createContext<ContextTypes | null>(null);

export default MovieContext;
