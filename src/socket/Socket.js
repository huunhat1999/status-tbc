import io from 'socket.io-client'

// const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTVjNjI3ZjUzMWM4MzAwMTM0ZDJlY2MiLCJlbXBsb3llZUNvZGUiOiJERVZfVSIsImVtcGxveWVlSWQiOiI2MTVjNjIxZTUzMWM4MzAwMTM0ZDJlY2IiLCJuYW1lIjoiRGV2IEFjY291bnQiLCJ1c2VyTmFtZSI6ImRldmFjYyIsInVzZXJUeXBlIjoiY2xpZW50IiwiYnJhbmNoQ29kZUFyciI6WyJDTjMyIiwiQkgiXSwiYXBwTmFtZSI6Ik1OR19BUFAiLCJpYXQiOjE2MzY5Njc1MDIsImV4cCI6NDc5MDU2NzUwMn0.2oLm_rnWPigZRpo6upLSAVC0eVG5knl4IT3BT5ZfiyU'
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmZkMTY4ZDE0YmI3ZDI1ZGNlNDc1ZDIiLCJlbXBsb3llZUNvZGUiOiJURUNILjAyIiwiZW1wbG95ZWVJZCI6IjVmZmQxNWQzMTRiYjdkMjVkY2U0NzVkMCIsImVtYWlsIjoidHJhbmh1dW5oYXQyMkBnbWFpbC5jb20iLCJuYW1lIjoiVHLhuqduIE5o4bqtdCIsInVzZXJOYW1lIjoibmhhdHRoIiwidXNlclR5cGUiOiJjbGllbnQiLCJicmFuY2hDb2RlQXJyIjpbIkNhblRob0JyYW5jaCIsIkdaUlpxTVJSIiwiVHNHZ0pubWgiXSwiYXBwTmFtZSI6IkJJX0FQUCIsImlhdCI6MTYzNzA0MzczOSwiZXhwIjoxNjM3MTMwMTM5fQ.dZM7QFFIov3dLrE4ALPJJwUXVtRCTBi0_n7AF0-fV_0'
const host = 'https://stagingapi.trangbeautycenter.com/mng-app'
// const host = 'https://api.trangbeautycenter.com/mng-app'
const socket = io(host, {
      query: {
        accessToken: token
      },
      transports: ['websocket']
    });

export  {socket}