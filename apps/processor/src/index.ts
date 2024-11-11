import {PrismaClient} from '@repo/db'; 
import {Kafka} from 'kafkajs'; 
import {KAFKA_TOPIC_NAME} from "@repo/utils"; 

const client = new PrismaClient(); 
const kafka = new Kafka({
    clientId: "processor", 
    brokers: ["localhost:9092"]
}); 

async function main(){
    const producer = kafka.producer(); 
    await producer.connect(); 
    while(1){
        const pendingRuns = await client.zapRunOutbox.findMany({
            where: {}, 
            take: 10
        }); 
        console.log(pendingRuns); 

        await producer.send({
            topic: KAFKA_TOPIC_NAME, 
            messages: pendingRuns.map(run => {
                return {
                    value: JSON.stringify({zapRunId: run.zapRunId, stage: 0}), 
                    key: run.userId
                }; 
            })
        })

        await client.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRuns.map(x => x.id)
                }
            }
        }); 

        await new Promise(r => setTimeout(r, 2000)); 
    }

}

main(); 

