//Set up express
const express = require(`express`);
const app = express();
//Include the file system functions
const fs =require(`fs`);
//Include and set the hbs (handlebars) view engine
const hbs = require(`hbs`)
app.set(`view engine`,`hbs`)
//register the location of partial snippets for the view engine
hbs.registerPartials(__dirname + `/views/partials`,(err)=>{})
//Uses extended url capability
app.use(express.urlencoded({extended:true}));
//add the static asset folder
app.use(express.static(`${__dirname}/public`));
//allow express json functionality
app.use(express.json())

hbs.registerHelper('colorGrid', function (size){
    let grid = '';
    for (let i = 0; i < size; i++){
        grid += '<div class="row">';
        for (let x = 0; x < size; x++){
            var color = ((1<<24)*Math.random()|0).toString(16);
            grid += `<div class="col color-cell" style="background-color: #${color};">`;
            grid += `<span class="blkfont">#${color}</span>`;
            grid += `<span class="whtefont">#${color}</span>`;
            grid += '</div>';
        }
        grid += '</div>';
    }
    return new hbs.handlebars.SafeString(grid);
});

//putting numbers into drop down
app.get('/',(req, res) => {
    var numbers = [3, 4, 5, 10, 20];
    res.render('index',{ numbers });
});

//getting selected number
app.post('/', (req,res) =>{
    var size = parseInt(req.body.selectNumber);
    res.render('index', { numbers: [3,4,5,10,20], size: size })
});

//server start
app.listen(3000, ()=>{
    console.log('Server is running on Port 3000');
})