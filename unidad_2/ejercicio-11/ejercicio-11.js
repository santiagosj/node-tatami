const http = require('http')
const fs =require('fs')
const url=require('url');

const mime = {
    'html' : 'text/html',
    'css'  : 'text/css',
    'jpg'  : 'image/jpg',
    'ico'  : 'image/x-icon',
    'mp3'  :	'audio/mpeg3',
    'mp4'  : 'video/mp4'
}

const server = http.createServer((req, res)=>{
    let urlObj = url.parse(req.url)
    let path = `unidad_2/ejercicio-11/static${urlObj.pathname}`
    
    try{
        if(path === 'unidad_2/ejercicio-11/static/') path = 'unidad_2/ejercicio-11/static/index.html'

        if(fs.existsSync){
            fs.readFile(path,(err, data)=>{
                if(err){
                    res.writeHead(500,{'Content-Type': 'text/plain'});
                    res.write('Algo malió sal')
                    res.end()
                }else{
                    let vec = path.split('.');
                    let extension = vec[vec.length - 1]
                    let mimeFile = mime[extension]
        
                    res.writeHead(200,{'Content-Type': mimeFile})
                    res.write(data)
                    res.end()
                }
                
            })
        }else{
            
            res.writeHead(404,{'Content-Type': 'text/html'})
            res.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>')
            res.end();
        }


    }catch(err){
        console.log(err)
    }

})

const port = 8888 || process.env.PORT

server.listen(port)

console.log(`Servidor web escuchando en http://localhost:${port}/`)
