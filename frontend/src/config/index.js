import dev from './dev';
import prod from './prod';

export default {
  API_HTTP_ROOT: process.env.NODE_ENV === 'production'
    ? prod.HTTP_API_ROOT
    : dev.HTTP_API_ROOT,
  API_WEB_SOCKET_ROOT: process.env.NODE_ENV === 'production'
    ? prod.API_WEB_SOCKET_ROOT
    : dev.API_WEB_SOCKET_ROOT
};
