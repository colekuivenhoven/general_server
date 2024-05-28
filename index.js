const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Middleware
const corsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import Utils
const { print_connection } = require('./utilities/global');

// Ports
const express_port = 3040;
const socket_port = 3041;

// Routes
app.get('/', (req, res) => {
    print_connection('/', req);
    res.json({ message: `Hello from server!` });
});

// App listen
app.listen(express_port, () => {
    console.log(`Server is running on port: ${express_port}`);
});