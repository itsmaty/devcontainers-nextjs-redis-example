'use server';

import { createClient } from 'redis';

// async server component
export default async function Home() {

//Connect to redis trough docker network
//Should be done with an .env file
const client = await createClient({
  url: 'redis://dbredis:6379'
})
  .on('error', err => console.log('Redis Client Error', err))
  .connect();

await client.set('name', 'John');

// retrive name from redis db
const name = await client.get('name');
await client.disconnect();

// output name on page
  return (
    <div>
      Welcome, {name}
    </div>

  );
}
