const PATHS = new Map().set('static', '/static').set('api', '/api');

const ROUTES = new Map().set('home', { path: '/', nav: false });

const COLORS = new Map()
  .set('background', '#333333')
  .set('tag-discipline', '#BE79D7')
  .set('tag-category', '#96E2D1')
  .set('tag-role', '#B8E986')
  .set('tag-skill', '#4A90E2')
  .set('tag-location', '#FFE194')
  .set('tag-rate', '#ffbc00')
  .set('tag-inactive', '#C4C4C4')
  .set('tag-default', '#E8E8E8');

const API_KEYS = new Map()
  .set('google-api', process.env.REACT_APP_GOOGLE_API_KEY)
  .set('google-sign-in', '988394247599-reaj9p23813vln1hfthc26kencsjerii');

const FIREBASE = new Map()
  .set('config', {
    apiKey: 'AIzaSyDazvyybJmssoCAIQ5pzwQhSJd_LOkFDzQ',
    authDomain: 'scorching-fire-8072.firebaseapp.com',
    databaseURL: 'https://scorching-fire-8072.firebaseio.com',
    projectId: 'scorching-fire-8072',
    storageBucket: 'scorching-fire-8072.appspot.com',
    messagingSenderId: '500917944104'
  })
  .set('rrfConfig', {
    userProfile: 'users',
    enableLogging: false
  });

export { PATHS, ROUTES, COLORS, API_KEYS, FIREBASE };
