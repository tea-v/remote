import { IFieldResolver } from 'graphql-tools';

import { MoviesConnection, MoviesQueryArgs } from ':types/schema';
import { query } from ':clients/aws/DynamoDB';

const CURRENT_YEAR = new Date().getFullYear();
const LIMIT = 20;

const resolver: IFieldResolver<any, any> = async (
  _source,
  args: MoviesQueryArgs
): Promise<MoviesConnection> => {
  const { after, first, releaseYear } = args;
  const { Items, LastEvaluatedKey } = await query({
    ExpressionAttributeValues: {
      ':releaseYear': releaseYear || CURRENT_YEAR,
    },
    Limit: first || LIMIT,
    KeyConditionExpression: 'ReleaseYear = :releaseYear',
    ScanIndexForward: false,
    TableName: 'Movies',
    ...(after && {
      ExclusiveStartKey: { CreatedAt: after },
    }),
  });
  const edges = (Items || []).map(({ CreatedAt, Title }) => ({
    cursor: CreatedAt,
    node: {
      createdAt: CreatedAt,
      id: CreatedAt,
      title: Title,
    },
  }));
  const pageInfo = {
    endCursor: LastEvaluatedKey && LastEvaluatedKey.CreatedAt,
    hasNextPage: !!LastEvaluatedKey,
    hasPreviousPage: !!after,
    startCursor: after,
  };
  return {
    edges,
    pageInfo,
  };
};

export default resolver;
