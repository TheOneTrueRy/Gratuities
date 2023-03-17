import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ThemeService {
    toggleThemeDark() {
        let indexBody = document.getElementById('HTMLBody')
        indexBody.classList.remove('light')
        indexBody.classList.add('dark')
        AppState.account.theme = false

    }
    toggleThemeLight() {
        let indexBody = document.getElementById('HTMLBody')
        indexBody.classList.remove('dark')
        indexBody.classList.add('light')
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