/* eslint-disable @typescript-eslint/no-explicit-any */
// Stub for Convex generated dataModel — replace with real generated file when Convex is set up

export type Doc<TableName extends string> = TableName extends "trials"
  ? {
      _id: any;
      _creationTime: number;
      serviceName: string;
      serviceUrl: string;
      userEmail: string;
      trialDays: number;
      status: string;
      agentEmail?: string;
      signupDate?: number;
      cancelBy?: number;
      canceledDate?: number;
      difficultyScore?: number;
      cancellationSteps?: number;
      cancellationNotes?: string;
      agentLog?: string;
      cardLastFour?: string;
      cardToken?: string;
    }
  : Record<string, any>;
