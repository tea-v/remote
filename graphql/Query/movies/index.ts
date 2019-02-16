import { IFieldResolver } from 'graphql-tools';

import { query } from ':clients/aws/DynamoDB';

type Args = {
  after?: string;
  first?: number;
  releaseYear?: number;
};

const currentYear = new Date().getFullYear();

const resolver: IFieldResolver<any, any> = async (_source, args: Args) => {
  const { after, first = 20, releaseYear = currentYear } = args;
  const { Items, LastEvaluatedKey } = await query({
    ExpressionAttributeValues: {
      ':releaseYear': releaseYear,
    },
    Limit: first,
    KeyConditionExpression: 'ReleaseYear = :releaseYear',
    ScanIndexForward: false,
    TableName: 'Movies',
    ...(after && {
      ExclusiveStartKey: { CreatedAt: after },
    }),
  });
  const edges = (Items || []).map((item) => {});
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
