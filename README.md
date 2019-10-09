# Intro to GraphQL

As I was learning GraphQL and having a hard time finding resources at the right level for me. I've
compiled this based on a number of other resources which can be found at the end of this README. Each of the resources
below have some great information and are worth checking out.

If you have suggestions or find any errors, please feel free to submit an Issue to this repo and I'll
do my best to get to it right away.

- [Part1: Setup](parts/setup.md)
- [Part2: The GraphQL Schema Language](parts/schemas1.md)
- [Part3: Simple Resolver Functions](parts/resolvers1.md)
- [Part4: Context: Connecting a Database](parts/context.md)
- [Part5: Defining Mutations](parts/schemas2.md)
- [Part6: Resolvers Part 2](parts/resolvers2.md)
- [Part7: Query Filters](parts/queryFilters.md)
- [Part8: Optimization using Data Loaders](parts/dataloaders.md)

## GraphQL vs REST

A number of other tutorials and resources cover the Why's; summarizing them we end up with

1. REST is not flexible when underlying data doesn't match what the client needs to request
   - https://jacobwgillespie.com/from-rest-to-graphql-b4e95e94c26b
   - https://engineering.fb.com/core-data/graphql-a-data-query-language/
2. RESTful design makes the client do many requests to fetch a single chunk of data
3. Lack of types in REST makes it difficult to form complex queries

### N+1 Query Problem

Major downside to avoid when designing a GraphQL API
- https://engineering.shopify.com/blogs/engineering/solving-the-n-1-problem-for-graphql-through-batching
- https://itnext.io/what-is-the-n-1-problem-in-graphql-dd4921cb3c1a
- https://medium.com/slite/avoiding-n-1-requests-in-graphql-including-within-subscriptions-f9d7867a257d


## Resources Used

- [mermelab.com](https://marmelab.com/blog/2017/09/03/dive-into-graphql.html)
- [medium.com](https://medium.com/naresh-bhatia/graphql-concepts-i-wish-someone-explained-to-me-a-year-ago-514d5b3c0eab)
- [graphqlmastery.com](https://graphqlmastery.com/blog/graphql-best-practices-for-graphql-schema-design)
- [apollographql.com](https://www.apollographql.com/docs/apollo-server/schema/schema/)
- [graphql.org](https://graphql.org/learn/execution/)
- [freecodecamp.org](https://www.freecodecamp.org/news/five-common-problems-in-graphql-apps-and-how-to-fix-them-ac74d37a293c/)
  - Use dataloaders to avoid making unnecessary db calls
- [prisma.io](https://www.prisma.io/forum/t/graphql-middleware-for-session-and-error-logging/4152)
  - How to wrap resolver functions to handle database sessions and logging