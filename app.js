const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000
const app = express()
const restaurantList = require('./restaurant.json')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id === Number(req.params.restaurant_id))
  res.render('show', { restaurant })
})
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
  const en_restaurants = restaurantList.results.filter(restaurant => restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { restaurants, en_restaurants, keyword })
})
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})