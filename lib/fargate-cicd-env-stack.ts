import cdk = require('@aws-cdk/cdk');
import ec2 = require('@aws-cdk/aws-ec2');
import ecs = require('@aws-cdk/aws-ecs');
import { SubnetType } from '@aws-cdk/aws-ec2';

//import { AvailabilityZoneProvider } from '@aws-cdk/cdk';
//import s3 = require('@aws-cdk/aws-s3');
//import { SubnetType } from '@aws-cdk/aws-ec2';

export class FargateCicdEnvStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);    
        
    const vpc = new ec2.VpcNetwork(this, 'MyVpc', {
      maxAZs: 2, // Default is all AZs in region
      cidr: '10.0.0.0/16',
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'pub',
          subnetType: SubnetType.Public
        },
        {
          cidrMask: 24,
          name: 'pri',
          subnetType: SubnetType.Private
        }
      ]
    });
    
    const cluster = new ecs.Cluster(this, 'MyCluster', {
      vpc: vpc
    });
    
    // Create a load-balanced Fargate service and make it public
    new ecs.LoadBalancedFargateService(this, 'MyFargateService', {
      cluster: cluster,  // Required
      cpu: '512', // Default is 256
      desiredCount: 2,　//Default is 1
      image: ecs.ContainerImage.fromDockerHub('amazon/amazon-ecs-sample'), // Required
      memoryMiB: '1GB',  // Default is 512
      publicLoadBalancer: true,
    });    //create aws resources
  }
}

