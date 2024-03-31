self.__uv$config = {
    prefix: '/~/',
    bare: 'https://tomp.app',
    
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/coffee/handler.js',
    client: '/coffee/client.js',
    bundle: '/coffee/bundle.js',
    config: '/coffee/config.js',
    sw: '/coffee/sw.js',
};
