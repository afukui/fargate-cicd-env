#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');
import { FargateCicdEnvStack } from '../lib/fargate-cicd-env-stack';

const app = new cdk.App();
new FargateCicdEnvStack(app, 'FargateCicdEnvStack');
app.run();
