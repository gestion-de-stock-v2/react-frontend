export const ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password',
    changePassword: '/api/auth/change-password',
  },
  products: {
    list: '/api/produtos',
    detail: (id: number) => `/api/produtos/${id}`,
  },
  categories: {
    list: '/api/categorias',
    detail: (id: number) => `/api/categorias/${id}`,
  },
  suppliers: {
    list: '/api/fornecedores',
    detail: (id: number) => `/api/fornecedores/${id}`,
  },
  movements: {
    list: '/api/movimentacoes',
    create: '/api/movimentacoes',
  },
  users: {
    list: '/api/usuarios',
    detail: (id: number) => `/api/usuarios/${id}`,
  },
} as const;