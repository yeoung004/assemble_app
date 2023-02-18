import { NOTIFICATION_KEY } from "../Components/AsyncKeys/userKey"
import {
    getDataFromStorage,
    removeDataFromStorage,
    saveDataInStorage
} from "../Components/Common/Common"

export const saveNotifications = (notifications) => {
    saveDataInStorage(NOTIFICATION_KEY, { ...notifications })
};

export const getNotifications = async () => {
    return await getDataFromStorage(NOTIFICATION_KEY)
}

export const removeANotification = (notifications) => {
    saveNotifications(notifications)
}

export const resetNotification = () => {
    removeDataFromStorage(NOTIFICATION_KEY);
}

export const notificationHandler = async (payload) => {
    let temp = { ...payload }
    const notifications = await getNotifications()

    if (notifications) {
        temp = { ...temp, ...notifications }
    }
    saveNotifications(temp);
}