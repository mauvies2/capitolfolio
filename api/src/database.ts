import mongoose, { ConnectOptions } from 'mongoose'
import config from './config/default'

(async () => {
    try {
        const mongooseOptions: ConnectOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
            // user: config.MONGO_USER,
            // pass: config.MONGO_PASSWORD
        }
        const db = await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`, mongooseOptions)
        console.log('Database is connected to:', db.connection.name)
    } catch(error){
        console.log(error)
    }
})()


