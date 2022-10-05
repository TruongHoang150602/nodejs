const express = require('express');
const $ = require( "jquery" );
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const SortMiddleware = require('./app/middleware/SortMiddleware');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const { type } = require('os');



app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(SortMiddleware);

db.connect();
app.use(express.json());
// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field,sort) =>{

                const SortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'bi bi-chevron-expand',
                    asc: 'bi bi-sort-alpha-down',
                    desc:'bi bi-sort-alpha-down-alt',
                }
                const types = {
                    default: 'asc',
                    asc: 'desc',
                    desc:'asc',
                }
                const icon = icons[SortType];
                const type = types[SortType];
                return `<a href="?_sort&column=${field}&type=${type}">
                <i class="${icon}"></i>
                </a> `
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);
// method

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
