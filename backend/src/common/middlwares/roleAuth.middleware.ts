const roleAuth =
  (requiredRole: string) =>
  (next: any) =>
  (root: any, args: any, context: any, info: any) => {
    if (!context.role) {
      throw new Error("Unauthorized: No role provided");
    }

    if (context.role !== requiredRole) {
      throw new Error("Forbidden: Insufficient permissions");
    }

    return next(root, args, context, info);
  };

export default roleAuth;
