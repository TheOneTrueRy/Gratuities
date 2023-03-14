import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class NotificationsService {

    async findNotifications(profileId) {
        let foundReviewNotifications = AppState.reviews.filter(r => r.isOpened == false && r.reviewedId == profileId)
        let foundTipsNotifications = AppState.receivedTips.filter(r => r.isOpened == false)

        AppState.notifications = [...foundReviewNotifications, ...foundTipsNotifications]
    }

    async clearNotifications() {
        const res = await api.delete('account/notifications')
        AppState.notifications = []
    }
}

export const notificationsService = new NotificationsService();