import io from 'socket.io-client'

const token = JSON.parse(localStorage.getItem(`tokenGeneral`))
const host = 'https://stagingapi.trangbeautycenter.com/mng-app'
const socket = io(host, {
      query: {
        accessToken: token
      },
      transports: ['websocket']
    });

export  {socket}