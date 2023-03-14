import { AppState } from "../AppState"
import { logger } from "../utils/Logger"

class ThemeService{
    toggleThemeDark(){
        let indexBody = document.getElementById('HTMLBody')
        indexBody.classList.remove('light')
        indexBody.classList.add('dark')
        AppState.theme = false
    }
    toggleThemeLight(){
        let indexBody = document.getElementById('HTMLBody')
        indexBody.classList.remove('dark')
        indexBody.classList.add('light')
        AppState.theme = true
    }
}

export const themeService = new ThemeService