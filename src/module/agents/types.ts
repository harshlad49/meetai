import { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from './routers/_app';

type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"];
