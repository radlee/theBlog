import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@ac-qtnzhwg-shard-00-00.uezdyo9.mongodb.net:27017,ac-qtnzhwg-shard-00-01.uezdyo9.mongodb.net:27017,ac-qtnzhwg-shard-00-02.uezdyo9.mongodb.net:27017/?ssl=true&replicaSet=atlas-c9p0l7-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database', error);
    }
}

export default Connection;