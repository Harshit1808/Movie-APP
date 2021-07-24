// majority code 
//dependencies--express
const express=require('express') 
const request=require('request')
const app=express()

//Middlewares
app.set("view engine" , "ejs")


/* Routing
*/
app.get('/', (req,res)=>{

    //res.send('Home Page')
    res.render("home")
})

app.get('/dummy', (req,res)=>{

    //res.send('Home Page')
    res.render("dummy")
})
app.get('/home', (req,res)=>{

    //res.send('Home Page')
    res.render("home")
})
app.get('/about', (req,res)=>{

    res.send('About page')
   // res.render("home")
})


app.get('/student/:rollno', (req,res)=>{

console.log(req.params)
//Template string in js,use back ticks
    res.send(`result of some student with roll no ${req.params.rollno} `)
})

app.get('/result', (req,res)=>{

    console.log(req.query)

        //res.send(`You searched for movie name ${req.query.movieName} `)
    const url=` http://www.omdbapi.com/?apikey=20313fd6&s=${req.query.movieName} `
    request(url,function(error, response, body) {
        if(!error && response.statusCode===200) {
            const data=JSON.parse(body)
            //res.send(data)

            res.render('result', {moviesDump:data})
        } else {
            res.send('Something went wrong')
        }
    })
    })

    
app.get('/result/:id', (req,res)=>{

    //console.log(req.query)

        //res.send(`You searched for movie name ${req.query.movieName} `)
    const url=`http://www.omdbapi.com/?apikey=20313fd6&i=${req.params.id}`
    request(url,function(error, response, body) {
        if(!error && response.statusCode===200) {
            const data=JSON.parse(body)
           // res.send(data)

            res.render('detail', {data :data})
        } else {
            res.send('Something went wrong')
        }
    })
    })

    app.get('*', (req,res)=>{

        res.send('404 not found')
    })
    

app.listen(1000, ()=>{

    console.log("Server has started")
})