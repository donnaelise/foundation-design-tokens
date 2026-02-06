// src/lib/config.ts

export type ButtonStyle = "solid" | "outline" | "ghost";
export type ShadowIntensity = "none" | "soft" | "medium" | "strong";

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

      // Optional now, useful soon for badges
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };

  shape: {
    radiusPx: number; // px
  };

  effects: {
    shadow: ShadowIntensity;
  };

  components: {
    buttonStyle: ButtonStyle;
  };

  typography: {
    fontFamily: string;
    baseSizePx: number;
  };
};

export const defaultConfig: TokenConfig = {
  meta: { title: "Token Studio" },

  colour: {
    brand: {
      primary: "#D71DAF",
      primaryDark: "#A51686",
      primaryLight: "#F3B0E4",
      accent: "#C4A574"
    },

    neutral: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#E5E5E5",
      300: "#D4D4D4",
      400: "#A3A3A3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717"
    },

    semantic: {
      background: "#FFFFFF",
      surface: "#FFFFFF",
      text: "#111827",
      mutedText: "#6B7280",
      border: "#E5E7EB",

      success: "#16A34A",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6"
    }
  },

  shape: {
    radiusPx: 12
  },

  effects: {
    shadow: "soft"
  },

  components: {
    buttonStyle: "solid"
  },

  typography: {
    fontFamily: "system-ui",
    baseSizePx: 16
  }
};