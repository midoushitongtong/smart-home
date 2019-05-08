import { Context } from "egg";

module.exports = () => {
  return async function errorHandler(ctx: Context, next: any) {
    return new Promise(resolve => {
      setTimeout(async () => {
        try {
          await next();
        } catch (error) {
          ctx.body = error;
        }
        resolve();
      }, 500);
    });
  };
};
