/* eslint-disable @typescript-eslint/no-var-requires */

const findKey = require('lodash/findKey');
const flatMap = require('lodash/flatMap');
const get = require('lodash/get');

function getAssociations(resources) {
  const distributions = resources.filter(
    ({ Type }) => Type === 'AWS::CloudFront::Distribution'
  );
  return flatMap(distributions, (distribution) => {
    const associations = get(
      distribution,
      'Properties.DistributionConfig.DefaultCacheBehavior.LambdaFunctionAssociations',
      []
    );
    const cacheBehaviors = get(
      distribution,
      'Properties.DistributionConfig.CacheBehaviors',
      []
    );
    return associations.concat(
      flatMap(cacheBehaviors, (cacheBehavior) =>
        get(cacheBehavior, 'LambdaFunctionAssociations', [])
      )
    );
  });
}

function getVersion(resources, arn) {
  const key = findKey(resources, {
    Type: 'AWS::Lambda::Version',
    Properties: {
      FunctionName: {
        Ref: arn,
      },
    },
  });
  return key
    ? {
        'Fn::Join': [
          '',
          [
            { 'Fn::GetAtt': [arn, 'Arn'] },
            ':',
            { 'Fn::GetAtt': [key, 'Version'] },
          ],
        ],
      }
    : undefined;
}

class UpdateFunctionVersions {
  constructor(serverless) {
    this.hooks = {
      'before:package:finalize': this.updateFunctionVersion.bind(this),
    };
    this.serverless = serverless;
  }

  updateFunctionVersion() {
    const compiledResources = this.serverless.service.provider
      .compiledCloudFormationTemplate.Resources;
    const resources = this.serverless.service.resources.Resources;
    const associations = getAssociations(resources);
    associations.forEach((association) => {
      const arn = association.LambdaFunctionARN;
      const version = getVersion(compiledResources, arn);
      if (arn && version) {
        // eslint-disable-next-line no-param-reassign
        association.LambdaFunctionARN = version;
      }
    });
  }
}

module.exports = UpdateFunctionVersions;
