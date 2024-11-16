import {PrismaClient} from "@repo/db"; 
import {Kafka} from 'kafkajs'; 
import {KAFKA_TOPIC_NAME} from '@repo/utils'; 

const prismaClient = new PrismaClient(); 

const kafka = new Kafka({
    clientId: "worker", 
    brokers: ['localhost:9092']
}); 

async function main(){
    const consumer = await kafka.consumer({groupId: "main-worker"}); 
    await consumer.connect(); 

    const producer = await kafka.producer(); 
    await producer.connect(); 

    await consumer.subscribe({topic: KAFKA_TOPIC_NAME, fromBeginning: true}); 
    await consumer.run({
        autoCommit: false, 
        eachMessage: async ({topic, partition, message}) => {
            console.log(topic); 
            console.log(partition); 
            console.log(message); 
        }
    })
}

main(); 