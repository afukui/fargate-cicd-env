# Docker Build and Run

```shell
SECRET=YOUR_SECRET_ACCEESS_KEY
KEY=YOUR_ACCESS_KEY
REGION=YOUR_DEFAULT_REGION

docker build -t fargatecicdenvstack .
docker run -it --rm -e AWS_SECRET_ACCESS_KEY=$SECRET -e AWS_ACCESS_KEY_ID=$KEY -e AWS_DEFAULT_REGION=$REGION fargatecicdenvstack:latest cdk synth FargateCicdEnvStack
docker run -it --rm -e AWS_SECRET_ACCESS_KEY=$SECRET -e AWS_ACCESS_KEY_ID=$KEY -e AWS_DEFAULT_REGION=$REGION fargatecicdenvstack:latest cdk synth deploy
```

cdk eploy will show preview.

```
This deployment will make potentially sensitive changes according to your current security approval level (--require-approval broadening).
Please confirm you intend to make the following modifications:

IAM Statement Changes
┌───┬───────────────────────────────────────────────┬────────┬──────────────────────┬───────────────────────────────────────────────┬───────────┐
│   │ Resource                                      │ Effect │ Action               │ Principal                                     │ Condition │
├───┼───────────────────────────────────────────────┼────────┼──────────────────────┼───────────────────────────────────────────────┼───────────┤
│ + │ ${MyFargateService/Logging/LogGroup.Arn}      │ Allow  │ logs:CreateLogStream │ AWS:${MyFargateService/TaskDef/ExecutionRole} │           │
│   │                                               │        │ logs:PutLogEvents    │                                               │           │
├───┼───────────────────────────────────────────────┼────────┼──────────────────────┼───────────────────────────────────────────────┼───────────┤
├───┼───────────────────────────────────────────────┼────────┼──────────────────────┼───────────────────────────────────────────────┼───────────┤
│ + │ ${MyFargateService/TaskDef/TaskRole.Arn}      │ Allow  │ sts:AssumeRole       │ Service:ecs-tasks.amazonaws.com               │           │
└───┴───────────────────────────────────────────────┴────────┴──────────────────────┴───────────────────────────────────────────────┴───────────┘
Security Group Changes
┌───┬───────────────────────────────────────────────────┬─────┬────────────┬───────────────────────────────────────────────────┐
│   │ Group                                             │ Dir │ Protocol   │ Peer                                              │
├───┼───────────────────────────────────────────────────┼─────┼────────────┼───────────────────────────────────────────────────┤
│ + │ ${MyFargateService/LB/SecurityGroup.GroupId}      │ In  │ TCP 80     │ Everyone (IPv4)                                   │
│ + │ ${MyFargateService/LB/SecurityGroup.GroupId}      │ Out │ TCP 80     │ ${MyFargateService/Service/SecurityGroup.GroupId} │
├───┼───────────────────────────────────────────────────┼─────┼────────────┼───────────────────────────────────────────────────┤
│ + │ ${MyFargateService/Service/SecurityGroup.GroupId} │ In  │ TCP 80     │ ${MyFargateService/LB/SecurityGroup.GroupId}      │
│ + │ ${MyFargateService/Service/SecurityGroup.GroupId} │ Out │ Everything │ Everyone (IPv4)                                   │
└───┴───────────────────────────────────────────────────┴─────┴────────────┴───────────────────────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See http://bit.ly/cdk-2EhF7Np)

Do you wish to deploy these changes (y/n)? 
```

# Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
