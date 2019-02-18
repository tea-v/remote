/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */

const _ = require('lodash');

function getAssociations(resources) {
  const distributions = _.pickBy(resources, {
    Type: 'AWS::CloudFront::Distribution',
  });
  return _.flatMap(distributions, (distribution) => {
    const associations = _.get(
      distribution,
      'Properties.DistributionConfig.DefaultCacheBehavior.LambdaFunctionAssociations',
      []
    );
    const cacheBehaviors = _.get(
      distribution,
      'Properties.DistributionConfig.CacheBehaviors',
      []
    );
    return _.concat(
      associations,
      _.flatMap(cacheBehaviors, (cacheBehavior) =>
        _.get(cacheBehavior, 'LambdaFunctionAssociations', [])
      )
    );
  });
}

function getVersion(resources, arn) {
  const key = _.findKey(resources, {
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

class VersionFunctions {
  constructor(serverless, options) {
    this.hooks = {
      'before:package:finalize': this.updateFunctionVersion.bind(this),
    };
    this.options = options;
    this.serverless = serverless;
  }

  updateFunctionVersion() {
    const compiledResources = this.serverless.service.provider
      .compiledCloudFormationTemplate.Resources;
    const resources = this.serverless.service.resources.Resources;
    const associations = getAssociations(resources);
    _.forEach(associations, (association) => {
      const arn = association.LambdaFunctionARN;
      const version = getVersion(compiledResources, arn);
      if (arn && version) {
        // eslint-disable-next-line no-param-reassign
        association.LambdaFunctionARN = version;
      }
    });
  }
}

module.exports = VersionFunctions;
