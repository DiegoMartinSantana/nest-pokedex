export const EnvConfig= ()=>({
enviroment:process.env.NODE_ENV || 'development',
mongodb:process.env.MONGODB || 'mongodb://:KXvUERqjjlWAgCpDzVqrXspXGXXeuquV@autorack.proxy.rlwy.net:39605',
defaultLimit:+process.env.DEFAULT_LIMIT || 10,
port:process.env.PORT || 3000,
})

