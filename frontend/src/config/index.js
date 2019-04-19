import dev from './dev';
import prod from './prod';

export default {
  WEB_SOCKET_ROOT: process.env.NODE_ENV === 'production'
    ? prod.WEB_SOCKET_ROOT
    : dev.WEB_SOCKET_ROOT
};
