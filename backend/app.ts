import express from 'express';
import braintree from 'braintree'; 
import dotenv from 'dotenv';

dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID!,
  publicKey: process.env.PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!
});
const app = express();
const port = 3000;

app.get('/client_token', async (req, res) => {
  const response = await gateway.clientToken.generate({})
  res.send(response.clientToken);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

