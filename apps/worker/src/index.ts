import {PrismaClient} from "@repo/db"; 
import {Kafka} from 'kafkajs'; 
import {KAFKA_TOPIC_NAME} from '@repo/utils'; 

const client = new PrismaClient(); 

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
            console.log(message.value?.toString()); 
            if(message.value?.toString() == undefined){
                return; 
            }
            const parsedBody = JSON.parse(message.value?.toString()); 
            const {zapRunId, stage} = parsedBody;
            
            const zapRunDetails = await client.zapRun.findFirst({
                where: {
                    id: zapRunId
                }, 
                include: {
                    zap: {
                        include: {
                            actions: {
                                include: {
                                    action: true
                                }
                            }
                        }
                    }
                }
            }); 

            const currentAction = zapRunDetails?.zap.actions.find((x)=> x.sortingOrder == stage); 

            if(!currentAction){
                console.log('current action not found'); 
                return; 
            }

            const zapRunMetadata = zapRunDetails?.metadata; 
            console.log(zapRunMetadata); 


            await new Promise((r) => setTimeout(r, 500)); 

            const lastStage = (zapRunDetails?.zap.actions.length || 1) - 1; 
            if(lastStage != stage){
                console.log("pushing back to queue"); 
                await producer.send({
                    topic: KAFKA_TOPIC_NAME, 
                    messages: [{
                        value: JSON.stringify({
                            stage: stage + 1, 
                            zapRunId
                        })
                    }]
                })
            }

            console.log("processing done"); 
            await consumer.commitOffsets([{
                topic: KAFKA_TOPIC_NAME, 
                partition: partition, 
                offset: (parseInt(message.offset)+1).toString()
            }])
        }
    }); 
}

main(); 