
const pathsConfig = {
      auth: {
        signIn: '/auth/sign-in',
        signUp: '/auth/sign-up',
        forgotPassword: '/auth/forgot-password',
        resetPassword: '/auth/reset-password',
        twoFactor: '/auth/two-factor',
      },
      app: {
        home: '/home',
        account: '/home/account',
        preferences: '/home/preferences',
      },
      admin: {
        root: '/admin',
        users: '/admin/users',
      },
    orgs: {
      root: '/orgs',
      create: '/orgs/create',
      detail: (slug: string) => `/orgs/${slug}`,
      members: (slug: string) => `/orgs/${slug}/members`,
      memberDetail: (slug: string, memberId: string) =>
        `/orgs/${slug}/members/${memberId}`,
      invite: (slug: string) => `/orgs/${slug}/invitations/create`,
      invitations: (slug: string) => `/orgs/${slug}/invitations`,
      roles: (slug: string) => `/orgs/${slug}/roles`,
      createRole: (slug: string) => `/orgs/${slug}/roles/create`,
      editRole: (slug: string, roleId: string) => `/orgs/${slug}/roles/${roleId}`,
      settings: (slug: string) => `/orgs/${slug}/settings`,
      acceptInvitation: (invitationId: string) => `/orgs/accept/${invitationId}`,
      teams: (slug: string) => `/orgs/${slug}/teams`,
      createTeam: (slug: string) => `/orgs/${slug}/teams/create`,
      teamDetail: (slug: string, teamId: string) => `/orgs/${slug}/teams/${teamId}`,
    },
  };

  export default pathsConfig;