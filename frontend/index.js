main();

async function main() {
    const tokenResponse = await fetch('http://localhost:3000/client_token');
    const token = await tokenResponse.text();
    const dropin = await braintree.dropin.create({
        authorization: token,
        container: '#dropin-container',
    });
    const form = document.getElementById('donate-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const payload = await dropin.requestPaymentMethod();
        document.getElementById('nonce').value = payload.nonce;
        form.submit()
    });
}


