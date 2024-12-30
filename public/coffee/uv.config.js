/*global Ultraviolet*/
self.__uv$config = {
  prefix: '/~/',
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: '/coffee/uv.handler.js',
  client: '/coffee/uv.client.js',
  bundle: '/coffee/uv.bundle.js',
  config: '/coffee/uv.config.js',
  sw: '/coffee/uv.sw.js'
}
