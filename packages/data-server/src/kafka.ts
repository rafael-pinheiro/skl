import { Kafka } from "kafkajs";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const kafka = new Kafka({
  clientId: "data-server",
  brokers: ["localhost:9092"],
});
db.serialize(() => {
  db.run("CREATE TABLE message (topic TEXT, partition INT, payload TEXT)");
});

async function startConsuming() {
  const consumer = kafka.consumer({ groupId: "data-server" });

  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic" });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      db.serialize(() => {
        db.run(
          "INSERT INTO message VALUES ($topic, $partition, json($payload))",
          {
            $topic: topic,
            $partition: partition,
            $payload: message.value.toString(),
          },
          function (error) {
            console.error(error);
            // db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
            //   console.log(row.id + ": " + row.info);
            // });
            db.all(
              "SELECT * FROM message WHERE payload -> '$.number' < 10",
              function (err, rows) {
                console.error(err);
                console.log(rows);
              }
            );
          }
        );
      });
    },
  });
}

startConsuming();

export const runSQL = (sql: string) => {
  console.log("run");
  return new Promise((accept, reject) => {
    console.log("promise");
    db.all(sql, (error, rows) => {
      console.log("all");
      if (error) {
        return reject(error);
      }

      return accept(rows);
    });
  });
};
