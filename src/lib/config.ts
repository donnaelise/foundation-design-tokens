export type TokenConfig = {
  meta: {
    title: string;
  };

  colour: {
    brand: {
      primary: string;
      primaryDark: string;
      primaryLight: string;
      accent: string;
    };

    neutral: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };

    semantic: {
      background: string;
      surface: string;
      text: string;
      mutedText: string;
      border: string;
    };
  };

  shape: {
    radius: number; // px
  };

  typography: {
    fontFamily: string;
    baseSizePx: number;
  };
};

export const defaultConfig: TokenConfig = {
  meta: { title: "Token Studio" },
  colour: {
    primary: "#1D4ED8",
    background: "#FFFFFF",
    text: "#111827",
  },
  typography: {
    fontFamily: "system-ui",
    baseSizePx: 16,
  },
};