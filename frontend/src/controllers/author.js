import axios from "axios";
const url = "http://127.0.0.1:3000/graphql";

const getAll = async () => {
     const res = await axios.post(url, {
          query: `{
               authors{
                 id
                 name
                 book{
                   name
                 }
               }
             }`,
     });
     return res.data.data.authors;
};

const getById = async (id) => {
     const res = await axios.post(url, {
          query: `{
               author(id: ${id}) {
                    name
                    book{
                      name
                    }
                              }
                         }`,
     });
     return res.data.data.books;
};

const create = async (name, age) => {
     const res = await axios.post(url, {
          query: `{
               mutation {
                    createAuthor(name: "${name}", age: ${age}) {
                         id
                         name
                    }
                  }           
          }`,
     });
     return res.data.data.books;
};

const update = async (id, name, age) => {
     const res = await axios.post(url, {
          query: `mutation {
               updateBook(id: ${id}, name:"${name}", age: ${age}) {
                 id
                 name
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
               deleteAuthor(id: ${id}) 
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
