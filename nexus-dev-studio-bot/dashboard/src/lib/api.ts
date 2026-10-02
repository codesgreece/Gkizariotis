async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    let message = 'Request failed';
    try {
      const body = (await response.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
}

export const api = {
  me: () => request<import('../types').AuthUser>('/api/auth/me'),
  logout: () => request<{ ok: boolean }>('/api/auth/logout', { method: 'POST' }),
  guilds: () =>
    request<{ guilds: import('../types').GuildSummary[] }>('/api/guilds'),
  overview: (guildId: string) =>
    request<import('../types').GuildOverview>(`/api/guilds/${guildId}/overview`),
};
