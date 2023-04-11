import { AppState } from "../AppState"
import { api } from "./AxiosService"

class ThemeService {
    toggleThemeDark() {
        AppState.account.theme = false

    }
    toggleThemeLight() {
        AppState.account.theme = true
    }

    async toggleTheme() {
        const res = await api.put('account', { theme: (!AppState.account.theme) })
        AppState.account.theme = res.data.theme
        if (AppState.account.theme) {
            this.toggleThemeLight()
        } else if (!AppState.account.theme) {
            this.toggleThemeDark()
        }
    }
}

export const themeService = new ThemeService