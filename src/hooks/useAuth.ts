import { useAuthStore } from '@/stores/auth.store';

export function useAuth() {
  const { token, isAuthenticated, user, login, logout, loadFromStorage, setUser } = useAuthStore();

  return {
    token,
    isAuthenticated,
    user,
    login,
    logout,
    setUser,
    initializeAuth: loadFromStorage,
  };
}

export type UseAuthReturn = ReturnType<typeof useAuth>;
