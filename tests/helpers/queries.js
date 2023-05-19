module.exports = {
    insert: {
      user: {
        displayName: "Brett Wiltshire", 
        email: "brett@email.com",
        password: "123456",
        image: "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
      },
      categories: {
        name: "News",
      },
      blogPosts: {
        title: "Latest updates, August 1st", 
        content: "The whole text for the article goes here in this key",
        userId: 1,
        published: "2011-08-01 19:58:00",
        updated: "2011-08-01 19:58:51.947",
      },
      postCategories: {
        postId: 1,
        categoryId: 1,
      }
    },
    expect: {
      user: {
        id: 1,
        displayName: 'Brett Wiltshire',
        email: 'brett@email.com',
        password: '123456',
        image: 'http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png'
      },
      categories: {
        id: 1,
        name: 'News'
      },
      blogPosts: {
        general: {
          id: 1,
          title: 'Latest updates, August 1st',
          content: 'The whole text for the article goes here in this key',
          userId: 1,
        },
        published: 1312228680000,
        updated: 1312228732000
      },
      postCategories: {
        postId: 1,
        categoryId: 1,
      }
    }
  }