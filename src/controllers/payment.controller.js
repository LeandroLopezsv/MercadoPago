import mercadopago from "mercadopago";
import {MERCADOPAGO_API_KEY} from "../config.js";

export const createOrder = async (req, res)=> {

mercadopago.configure({
    access_token: MERCADOPAGO_API_KEY,
});

const result = await mercadopago.preferences.create({
    items:[
       { 
        title:"Laptop",
        unit_price: 450000,
        currency_id: "ARS",
        quantity: 1,
        }],
    
    back_urls: {
            success: "http://localhost:3003/success", 
            failure: "http://localhost:3003/failure", 
            pending: "http://localhost:3003/pending", 

    },
    notification_url: " https://7561-200-50-184-81.sa.ngrok.io/webhook", 

   })

console.log(result)

 res.send(result.body)
};

export const receiveWebhook = async (req, res) => {
const payment = req.query
try{
    if (payment.type === "payment"){

    const data = await mercadopago.payment.findById(payment['data.id']);
    console.log(data);
    /// guardar en DB///
    }
    res.sendSatus(204);
} catch (error){
    console.log(error);
    return res.sendStatus(500).json ({ error: error.message});
    }
};

