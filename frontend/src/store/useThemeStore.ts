import { create } from "zustand";

type ThemeStoreProps = {
    theme: string,
    setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeStoreProps>((set) => ({
    theme: localStorage.getItem("pern-theme") || "forest",
    setTheme: (theme: string) => {
        localStorage.setItem("pern-theme", theme);
        set({ theme });
    }
}));