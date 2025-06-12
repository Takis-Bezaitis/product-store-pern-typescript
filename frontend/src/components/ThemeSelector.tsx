import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

type themeOption = {
    name: string;
    label: string;
    colors: string[];
}

function ThemeSelector() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  return (
    <div className="dropdown dropdown-end">

      <button tabIndex={0} className="btn btn-ghost btn-circle">
          <PaletteIcon className="size-5" />
      </button>

      <div tabIndex={0} className="dropdown-content mt-2 shadow-2xl bg-base-200">
        {THEMES.map((themeOption: themeOption) => (
          <button key={themeOption.name}
            className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
              ${theme === themeOption.name ? 'bg-primary/10 text-primary' : 'hover:bg-case-content/5'}
              `}
            onClick={() => setTheme(themeOption.name)}
          >
            <PaletteIcon size={4} />
            <span className="text-sm font-medium">{themeOption.label}</span>
            <div className="flex">
              {themeOption.colors.map((color, i) => (
                <span key={i} className='size-2 rounded-full' style={{backgroundColor: color}}  />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ThemeSelector;