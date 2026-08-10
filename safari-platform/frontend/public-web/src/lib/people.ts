import type { AboutPerson } from "@/types/content";
import { getApiBaseUrl } from "@/lib/api-base-url";

export type PersonRecord = {
  id: number;
  name: string;
  title: string | null;
  bio: string | null;
  photo_url: string | null;
  linkedin_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
};

export type PersonWrite = {
  name: string;
  title?: string | null;
  bio?: string | null;
  photo_url?: string | null;
  linkedin_url?: string | null;
  display_order?: number;
  is_active?: boolean;
};

export type PeopleKind = "board" | "team";

function adminHeaders(token: string): HeadersInit {
  return {
    "content-type": "application/json",
    authorization: `Bearer ${token}`,
  };
}

async function throwPeopleError(
  res: Response,
  fallback: string,
): Promise<never> {
  let detail = "";
  try {
    const body = (await res.json()) as { detail?: unknown };
    if (typeof body.detail === "string") detail = body.detail;
  } catch {
    /* non-JSON */
  }
  if (res.status === 401) {
    throw new Error(
      "Session expired or invalid. Sign out, sign in again, then save.",
    );
  }
  throw new Error(detail || `${fallback} (${res.status})`);
}

export function personToAboutPerson(person: PersonRecord): AboutPerson {
  return {
    id: String(person.id),
    name: person.name,
    role: person.title?.trim() || "",
    bio: person.bio?.trim() || "",
    location: "",
    image: person.photo_url?.trim() || "",
    imageAlt: `${person.name.trim()} portrait`,
    linkedin: person.linkedin_url?.trim() || "",
    featured: false,
  };
}

export function aboutPersonToWrite(
  person: AboutPerson,
  displayOrder: number,
): PersonWrite {
  return {
    name: person.name.trim(),
    title: person.role.trim() || null,
    bio: person.bio.trim() || null,
    photo_url: person.image.trim() || null,
    linkedin_url: person.linkedin?.trim() || null,
    display_order: displayOrder,
    is_active: true,
  };
}

export function parsePersonId(id: string): number | null {
  if (!/^\d+$/.test(id.trim())) return null;
  const n = Number(id);
  return Number.isFinite(n) ? n : null;
}

async function fetchPublicPeople(kind: PeopleKind): Promise<PersonRecord[]> {
  const url = `${getApiBaseUrl()}/people/${kind}`;
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { "content-type": "application/json" },
      cache: "no-store",
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(`[people] unreachable ${url}: ${detail}`);
    return [];
  }
  if (res.status === 404) return [];
  if (!res.ok) {
    console.error(`[people] request failed (${res.status}): /people/${kind}`);
    return [];
  }
  return (await res.json()) as PersonRecord[];
}

export async function listPublishedTeam(): Promise<AboutPerson[]> {
  const rows = await fetchPublicPeople("team");
  return rows.map(personToAboutPerson);
}

export async function listPublishedBoard(): Promise<AboutPerson[]> {
  const rows = await fetchPublicPeople("board");
  return rows.map(personToAboutPerson);
}

export async function listAdminPeople(
  token: string,
  kind: PeopleKind,
): Promise<AboutPerson[]> {
  const res = await fetch(`${getApiBaseUrl()}/admin/people/${kind}`, {
    cache: "no-store",
    headers: adminHeaders(token),
  });
  if (!res.ok) await throwPeopleError(res, `Failed to list ${kind}`);
  const rows = (await res.json()) as PersonRecord[];
  return rows.map(personToAboutPerson);
}

export async function createAdminPerson(
  token: string,
  kind: PeopleKind,
  body: PersonWrite,
): Promise<AboutPerson> {
  const res = await fetch(`${getApiBaseUrl()}/admin/people/${kind}`, {
    method: "POST",
    headers: adminHeaders(token),
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) await throwPeopleError(res, `Failed to create ${kind} member`);
  return personToAboutPerson((await res.json()) as PersonRecord);
}

export async function updateAdminPerson(
  token: string,
  kind: PeopleKind,
  memberId: number,
  body: PersonWrite,
): Promise<AboutPerson> {
  const res = await fetch(
    `${getApiBaseUrl()}/admin/people/${kind}/${memberId}`,
    {
      method: "PATCH",
      headers: adminHeaders(token),
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );
  if (!res.ok) await throwPeopleError(res, `Failed to update ${kind} member`);
  return personToAboutPerson((await res.json()) as PersonRecord);
}

export async function deleteAdminPerson(
  token: string,
  kind: PeopleKind,
  memberId: number,
): Promise<void> {
  const res = await fetch(
    `${getApiBaseUrl()}/admin/people/${kind}/${memberId}`,
    {
      method: "DELETE",
      headers: adminHeaders(token),
      cache: "no-store",
    },
  );
  if (!res.ok) await throwPeopleError(res, `Failed to delete ${kind} member`);
}

/** Sync local AboutPerson[] to people API (create/update/delete + reorder). */
export async function syncAdminPeopleList(
  token: string,
  kind: PeopleKind,
  next: AboutPerson[],
  previous: AboutPerson[],
): Promise<AboutPerson[]> {
  const prevIds = new Set(
    previous
      .map((p) => parsePersonId(p.id))
      .filter((id): id is number => id != null),
  );
  const nextIds = new Set(
    next
      .map((p) => parsePersonId(p.id))
      .filter((id): id is number => id != null),
  );

  for (const id of prevIds) {
    if (!nextIds.has(id)) {
      await deleteAdminPerson(token, kind, id);
    }
  }

  for (let index = 0; index < next.length; index += 1) {
    const person = next[index];
    const body = aboutPersonToWrite(person, index);
    const numericId = parsePersonId(person.id);
    if (numericId != null && prevIds.has(numericId)) {
      await updateAdminPerson(token, kind, numericId, body);
    } else {
      await createAdminPerson(token, kind, body);
    }
  }

  return listAdminPeople(token, kind);
}
