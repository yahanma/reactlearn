#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdktsStack } from '../lib/cdkts-stack';

const app = new cdk.App();
new CdktsStack(app, 'CdktsStack', {
    env: {
        region: "us-east-1"
    }
});