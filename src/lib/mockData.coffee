getRequests = [
  {
    id: '123456789012345678901001'
    name: 'JoBossy'
    img: 'http://graph.facebook.com/johnsonhsgoh/picture'
  }
  {
    id: '123456789012345678901002'
    name: 'McBossy'
    img: 'http://graph.facebook.com/manchoy.kau/picture'
  }
]

getAccesses = [
  {
    id: '123456789012345678901101'
    name: 'Login'
  }
  {
    id: '123456789012345678901102'
    name: 'View profile'
  }
  {
    id: '123456789012345678901103'
    name: 'Check credits'
  }
  {
    id: '123456789012345678901104'
    name: 'Access admin area'
  }
]

getAccessGroups = [
  {
    id: '123456789012345678901201'
    name: 'Player'
  }
  {
    id: '123456789012345678901202'
    name: 'VIP Player'
  }
  {
    id: '123456789012345678901203'
    name: 'Affiliates'
  }
  {
    id: '123456789012345678901204'
    name: 'Administrator'
  }
]
  
module.exports =
  getRequests: getRequests
  getAccesses: getAccesses
  getAccessGroups: getAccessGroups