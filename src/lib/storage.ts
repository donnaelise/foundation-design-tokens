import { defaultConfig, type TokenConfig } from "@/lib/config";

const INDEX_KEY = "ts:index"; // list of saved ids
const ITEM_PREFIX = "ts:item:";

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function createId() {
  // simple id that’s stable enough for local usage
  return Math.random().toString(36).slice(2, 8) + "-" + Date.now().toString(36);
}

export function saveConfig(id: string, config: TokenConfig) {
  localStorage.setItem(ITEM_PREFIX + id, JSON.stringify(config));

  const index = safeJsonParse<string[]>(localStorage.getItem(INDEX_KEY)) ?? [];
  if (!index.includes(id)) {
    index.unshift(id);
    localStorage.setItem(INDEX_KEY, JSON.stringify(index.slice(0, 50)));
  }
}

export function loadConfig(id: string): TokenConfig | null {
  try {
    const raw = localStorage.getItem(ITEM_PREFIX + id);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<TokenConfig>;
    return normaliseConfig(parsed);
  } catch {
    return null;
  }
}

export function listSavedIds(): string[] {
  return safeJsonParse<string[]>(localStorage.getItem(INDEX_KEY)) ?? [];
}



function normaliseConfig(partial: Partial<TokenConfig>): TokenConfig {
  return {
    ...defaultConfig,
    ...partial,
    meta: { ...defaultConfig.meta, ...(partial.meta ?? {}) },
    typography: { ...defaultConfig.typography, ...(partial.typography ?? {}) },
    shape: { ...defaultConfig.shape, ...(partial.shape ?? {}) },
    effects: { ...defaultConfig.effects, ...(partial.effects ?? {}) },
    components: { ...defaultConfig.components, ...(partial.components ?? {}) },
    colour: {
      ...defaultConfig.colour,
      ...(partial.colour ?? {}),
      brand: { ...defaultConfig.colour.brand, ...(partial.colour?.brand ?? {}) },
      neutral: { ...defaultConfig.colour.neutral, ...(partial.colour?.neutral ?? {}) },
      semantic: { ...defaultConfig.colour.semantic, ...(partial.colour?.semantic ?? {}) }
    }
  };
}