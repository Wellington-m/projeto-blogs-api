module.exports = {
  findAllResult: [
    {
      id: 1,
      name: 'Inovação',
    },
    {
      id: 2,
      name: 'Escola',
    },
  ],
  createResult: {
    id: 3,
    name: 'Teste',
  },
  postResult: {
    id: 1,
    title: 'Fórmula 1',
    content: 'O campeão do ano!',
    userId: 1,
    published: '2023-06-15',
    updated: '2023-06-15',
  },
  allPosts: [
    {
      id: 1,
      title: 'Post do Ano',
      content: 'Melhor post do ano',
      userId: 1,
      published: '2011-08-01',
      updated: '2011-08-01',
      user: {
        id: 1,
        displayName: "Lewis Hamilton",
        email: "lewishamilton@gmail.com",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      categories: [
        {
          id: 1,
          name: "Inovação"
        }
      ]
    },
    {
      id: 2,
      title: "Vamos que vamos",
      content: "Foguete não tem ré",
      userId: 1,
      published: "2011-08-01",
      updated: "2011-08-01",
      user: {
        id: 1,
        displayName: "Lewis Hamilton",
        email: "lewishamilton@gmail.com",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      categories: [
        {
          id: 2,
          name: "Escola"
        }
      ]
    },
  ]
};
