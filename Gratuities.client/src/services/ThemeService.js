import { AppState } from "../AppState"
import { logger } from "../utils/Logger"

class ThemeService{
    toggleThemeDark(){
        let indexBody = document.getElementById('HTMLBody')
        indexBody.classList.remove('light')
        indexBody.classList.add('dark')
        AppState.theme = false
        logger.log('hello from the dark function')
    }
    toggleThemeLight(){
        let indexBody = document.getElementById('HTMLBody')
        indexBody.classList.remove('dark')
        indexBody.classList.add('light')
        AppState.theme = true
        logger.log('hello from the light function')
    }
}

export const themeService = new ThemeService