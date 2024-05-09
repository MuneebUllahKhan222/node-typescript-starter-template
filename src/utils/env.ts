const isBoolean = (value: any) =>
  ["true", "false"].includes(value) ? JSON.parse(value) : value;

const getEnv = (name:any):any => isBoolean(process.env[name]);

// export { getEnv, envConfig };
export { getEnv };
