export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || `HTTP ${res.status}`);
    }

    if (res.status === 204) return null as T;
    return res.json();
}

export function cn(...classes: (string | undefined | false | null)[]) {
    return classes.filter(Boolean).join(' ');
}
