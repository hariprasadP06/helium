// import { serve } from "@hono/node-server";
// import { Hono } from "Hono";

// const app = new Hono();

// const reminders: string[] = [];
// app.get("/health", (context) => {
//   const req = context.req;
//   return context.json({ message: "Hello World" }, 200);
// });

// app.get("/reminders", (context) => {
//   return context.json(reminders, 200);
// });

// app.post("/reminders", async (context) => {
//   const body = await context.req.json();

//   const reminder = body.reminder;

//   reminders.push(reminder);

//   return context.json(reminder, 201);
// });

// serve(app);

// console.log("server is running on http://localhost:3000");

import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/generate", (c) => {
  const val: string = Math.random().toString();
  return c.json({ value: val }, 200);
});

app.get("current-date", (c) => {
  const date = new Date();
  return c.json({ date: date.toISOString() }, 200);
});

app.get("/environment", (c) => {
  const ver = process.version;
  const platform = process.platform;
  return c.json({ version: ver, platform: platform }, 200);
});

app.get("/echo", (c) => {
  const queryParams = c.req.query(); // Get all query parameters
  return c.json({ received: queryParams });
});

const numbers: number[] = []; // Define an array to store data

app.post("/store-number", async (c) => {
  const body = await c.req.json();
  const number = body.number;

  numbers.push(number);

  return c.json({ number: number }, 201);
});
serve(app);

app.get("/numbers", (c) => {
  return c.json(numbers, 200);
});

console.log("server is running on http://localhost:3000");
