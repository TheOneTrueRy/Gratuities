import { AppState } from "../AppState"
import { logger } from "../utils/Logger"

class ThemeService{
    toggleThemeDark(){
        let indexBody = document.getElementById('HTMLBody')
        indexBody.classList.remove('light')
        indexBody.classList.add('dark')
        AppState.theme = false
        logger.log(AppState.theme)

    }
    toggleThemeLight(){
        let indexBody = document.getElementById('HTMLBody')
        indexBody.classList.remove('dark')
        indexBody.classList.add('light')
        AppState.theme = true
        logger.log(AppState.theme)
    }

    // themeCheckDark(){
    //     let eCardIndex = document.getElementsByClassName('ECARD')
    //     for (let i = 0; i < eCardIndex.length; i++) {
    //         const e = eCardIndex[i];
    //         e.classList.replace('employee-card' ,'employee-card-dark')
            
    //     }
    //     logger.log(eCardIndex)
    // }
}

export const themeService = new ThemeService