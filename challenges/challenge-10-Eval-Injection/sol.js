
// no eval for user controlled but maybe strict whitelists may work
app.post('/process-data', (req, res) => {
    const { data } = req.body;

    // allow only numbers + basic math operators
    if (!/^[0-9+\-*/().\s]+$/.test(data)) {
        return res.status(400).send({ error: 'Invalid input' });
    }

    try {
        const result = Function('"use strict"; return (' + data + ')')();
        res.send({ result });
    } catch (err) {
        res.status(400).send({ error: 'Invalid expression' });
    }
});
