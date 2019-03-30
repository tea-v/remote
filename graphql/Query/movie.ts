import DynamoDB from ':clients/aws/DynamoDB';
import { QueryResolvers } from ':types/schema';

const resolver: QueryResolvers['movie'] = async (_source, args) => {
  const { createdAt, id } = args;
  const { Item = null } = await DynamoDB.get({
    Key: {
      createdAt: {
        N: createdAt,
      },
      id: {
        S: id,
      },
    },
    TableName: 'movies',
  }).promise();
  return (
    Item && {
      createdAt: Item.createdAt.N,
      id: Item.id.S,
      title: Item.title.S,
    }
  );
};

export default resolver;
