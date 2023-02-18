import { ref, set } from 'firebase/database'
import axios from 'axios'
import { IP_ADDRESS } from '../config/key'
import { notificationHandler } from './notification'
import moment from 'moment'

export const assembleHandler = (users) => {
    notificationHandler(users)
}

export const assembleUser = async (fireDatabase, COWORKERID, USERID, senderName) => {
    const payload = {
        method: 'ASSEMBLE',
        senderName
    }
    try {
        await axios.post(
            IP_ADDRESS + '/users/request/assemble',
            {SENDERID:USERID, RECEIVERID:COWORKERID}
        )
        await set(ref(fireDatabase, `request/${COWORKERID}/${USERID}/${moment.utc().format()}`), payload)
        console.log('we sent a request')
    } catch (err) {
        console.log("assembleUser", err)
    }
}