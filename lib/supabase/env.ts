import { getCloudflareContext } from "@opennextjs/cloudflare";

// Helper to access environment variables safely on both Node.js (local dev) and Cloudflare Workers (runtime)
function getEnvValue(key: string): string | undefined {
  // 1. Try standard process.env
  if (process.env[key]) {
    return process.env[key];
  }

  // 2. Try Cloudflare Context (for runtime variables in OpenNext Worker)
  try {
    const { env } = getCloudflareContext();
    if (env && (env as any)[key]) {
      return (env as any)[key] as string;
    }
  } catch (e) {
    // Context not available (e.g. during build or local dev)
  }

  return undefined;
}

export function getSupabaseEnv() {
  const url = getEnvValue("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = getEnvValue("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!url || !anonKey) {
    throw new Error(
      "Supabase environment variables are missing. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  return { url, anonKey };
}

export function getServiceRoleKey() {
  const key = getEnvValue("SUPABASE_SERVICE_ROLE_KEY");
  if (!key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing.");
  }
  return key;
}
