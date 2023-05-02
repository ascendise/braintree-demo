import express from 'express';
import { Request } from 'express';
import bodyParser from 'body-parser';
import braintree from 'braintree'; 
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID!,
  publicKey: process.env.PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!
});

app.get('/client_token', async (req, res) => {
  const response = await gateway.clientToken.generate({})
  res.send(response.clientToken);
});

app.post('/donate', async (req, res) => {
  await gateway.transaction.sale({
    amount: req.body.amount,
    paymentMethodNonce: req.body.paymentNonce
  });
  res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
