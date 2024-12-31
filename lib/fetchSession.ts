export const fetchSession = async (): Promise<string> => {
  try {
    const res = await fetch("/api/session");
    if (!res.ok) {
      throw new Error("Failed to fetch session");
    }

    const session = await res.json();
    return session.user.username;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
};
