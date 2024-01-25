"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payStack = void 0;
const payStack = async (request, response) => {
    try {
        const https = require("https");
        let { email, amount } = request.body;
        amount = amount * 100;
        console.log(request.body);
        const params = JSON.stringify({
            email,
            amount
        });
        const options = {
            hostname: "api.paystack.co",
            port: 443,
            path: "/transaction/initialize",
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        };
        const req = https
            .request(options, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                response.send(data);
                console.log(JSON.parse(data));
            });
        })
            .on("error", (error) => {
            console.error(error);
        });
        req.write(params);
        req.end();
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.payStack = payStack;
