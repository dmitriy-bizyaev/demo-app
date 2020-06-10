import mongoose from 'mongoose';

export async function connect(url: string) {
    await mongoose.connect(url, { useNewUrlParser: true });
}

export async function disconnect() {
    await mongoose.disconnect();
}

export * from './models';
