import { QueryResolvers } from ':types/schema';
import { getItem } from ':clients/aws/DynamoDB';

const resolver: QueryResolvers['movie'] = async (_source, args) => {
  const { createdAt, id } = args;
  const { Item = null } = await getItem({
    Key: {
      createdAt: {
        N: createdAt,
      },
      id: {
        S: id,
      },
    },
    TableName: 'movies',
  });
  return (
    Item && {
      createdAt: Item.createdAt.N,
      id: Item.id.S,
      title: Item.title.S,
    }
  );
};

export default resolver;
