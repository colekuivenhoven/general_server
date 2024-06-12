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

// Import Routes
// const userRoutes = require('./services/users/users.routes');
// const commentRoutes = require('./services/comments/comments.routes');
//const thingRoutes = require('./services/things/things.routes');
const insightsRoutes = require('./services/insights/insights.routes');

// Import Utils
const { print_connection } = require('./utilities/global');
const db = require('./database/db');

// Ports
const express_port = 3040;
const socket_port = 3041;

// Database Connection
// db().then(() => {

//     // Routes
//     app.get('/', (req, res) => {
//         print_connection('/', req);
//         res.json({ message: `Hello from server!`, data: 'Test1' });
//     });

//     // app.use('/users', userRoutes);
//     // app.use('/comments', commentRoutes);
//     app.use('/things', thingRoutes);
//     app.use('/insights', insightsRoutes);
// });
// Routes
app.get('/', (req, res) => {
    print_connection('/', req);
    res.json({ message: `Hello from server!`, data: 'Test1' });
});

app.use('/insights', insightsRoutes);

// App listen
app.listen(express_port, () => {
    console.log(`Server is running on port: ${express_port}`);
});