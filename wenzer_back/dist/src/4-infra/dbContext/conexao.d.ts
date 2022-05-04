declare let connection: any;
declare const queryPromise: (sql: any, object?: any) => Promise<unknown>;
export { queryPromise, connection };
