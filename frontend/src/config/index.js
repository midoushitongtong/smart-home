import dev from './dev';
import prod from './prod';

export default {
  API_HTTP_ROOT: process.env.NODE_ENV === 'production'
    ? prod.API_HTTP_ROOT
    : dev.API_HTTP_ROOT,
  API_WEB_SOCKET_ROOT: process.env.NODE_ENV === 'production'
    ? prod.API_WEB_SOCKET_ROOT
    : dev.API_WEB_SOCKET_ROOT
};
