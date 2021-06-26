import io from 'socket.io-client'
import { tokenGeneral } from '../component/Token';

const token = tokenGeneral
const host = 'https://stagingapi.trangbeautycenter.com/mng-app'
const socket = io(host, {
      query: {
        accessToken: token
      },
      transports: ['websocket']
    });

export  {socket}