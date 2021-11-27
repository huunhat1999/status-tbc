import io from 'socket.io-client'
import {token,host} from '../component/Token'

const socket = io(host, {
      query: {
        accessToken: token
      },
      transports: ['websocket']
    });

export  {socket}