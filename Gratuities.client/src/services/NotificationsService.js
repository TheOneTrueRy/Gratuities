import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class NotificationsService {

    async findNotifications() {
        let foundReviewNotifications = AppState.myReviews.filter(r => r.isOpened == false)
        let foundTipsNotifications = AppState.receivedTips.filter(r => r.isOpened == false)

        AppState.notifications = [...foundReviewNotifications, ...foundTipsNotifications]
        this.sortNotifications()
    }

    sortNotifications() {
        AppState.notifications.sort(function (a, b) { return new Date(a.createdAt) - new Date(b.createdAt) })
    }

    async clearNotifications() {
        const res = await api.delete('account/notifications')
        AppState.notifications = []
    }
}

export const notificationsService = new NotificationsService();