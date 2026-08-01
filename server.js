import { randomUUID } from "node:crypto";
import { createServer } from "node:http";

let posts = [
  {
    id: randomUUID(),
    title: "Aprendendo Node",
    author: "Joao",
  },
];

const server = createServer((request, response) => {

  // GET
  if (request.method === "GET" && request.url === "/posts") {
    console.log("Servidor funcionando");
    
    // Retornando a lista convertida para string/JSON
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(posts));
    
  } 
  
  // POST
  else if (request.method === "POST" && request.url === "/posts") {
    console.log("POST Acionado");

    const listaChunk = []

    request.on("data", (chunk) => {
        console.log(chunk)
        listaChunk.push(chunk)
    })

    request.on("end", (callback) => {
        const body = JSON.parse(listaChunk.join(""))
        const post = {id: randomUUID(), ...body}
        posts.push(post)

        response.writeHead(201, { "Content-Type": "text/plain" });
        response.end("Post criado com sucesso");
    })

  } 

  // DELETE
  else if (request.method === "DELETE" && request.url.startsWith("/posts/")) {
    const id = request.url.split("/")[2]

    posts = posts.filter((p) => p.id !== id)

    response.writeHead(204)
    response.end()
  }
  
  else {
    // Tentando acessar uma rota inexistente
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Essa rota não existe !");
  }

});

server.listen(3333);
