export const load = async ({ locals }) => {
  if (locals.user) {
    return {
      email: locals.user.email
    };
  }
};
