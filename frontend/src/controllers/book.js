import axios from "axios";
const url = "http://127.0.0.1:3000/graphql";

const getAll = async () => {
     const res = await axios.post(url, {
          query: `{
                              books {
                                   name
                                   genre
                                   author{
                                        id
                                        name
                                   }
                              }
                         }`,
     });
     return res.data.data.books;
};

const getById = async (id) => {
     const res = await axios.post(url, {
          query: `{
                              book(id: ${id}) {
                              name
                              author{
                                        name
                                   }
                              }
                         }`,
     });
     return res.data.data.books;
};

const create = async (name, genre, authorId) => {
     const res = await axios.post(url, {
          query: `
               mutation {
                    createBook(name: "${name}", genre: "${genre}", author_id: ${authorId}) {
                      id
                      name
                      genre
                      author_id
                    }
                  }           
          `,
     });
     console.log(">>>>>>");
     return res.data.data.books;
};

const update = async (id, name, genre, authorId) => {
     const res = await axios.post(url, {
          query: `mutation {
               updateBook(id: ${id}, name:"${name}", genre: "${genre}", author_id: ${authorId}) {
                 id
                 name
                 genre
                 author_id
               }
             }
             `,
     });
     return res.data.data.books;
};

const del = async (id) => {
     const res = await axios.post(url, {
          query: `
          mutation {
               deleteBook(id: ${id}) 
             }             
             `,
     });
     return res.data.data.books;
};

export default {
     getAll,
     getById,
     create,
     update,
     del,
};
