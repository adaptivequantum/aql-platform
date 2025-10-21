import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  sessions, InsertSession, Session,
  messages, InsertMessage, Message,
  assets, InsertAsset, Asset,
  projects, InsertProject, Project
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.id) {
    throw new Error("User ID is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      id: user.id,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role === undefined) {
      if (user.id === ENV.ownerId) {
        user.role = 'admin';
        values.role = 'admin';
        updateSet.role = 'admin';
      }
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUser(id: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Session management
export async function createSession(session: InsertSession): Promise<Session> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(sessions).values(session);
  return { ...session, id: session.id, createdAt: new Date(), updatedAt: new Date() } as Session;
}

export async function getSession(id: string): Promise<Session | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(sessions).where(eq(sessions.id, id)).limit(1);
  return result[0];
}

export async function getUserSessions(userId: string): Promise<Session[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(sessions).where(eq(sessions.userId, userId)).orderBy(desc(sessions.updatedAt));
}

export async function updateSessionTimestamp(id: string): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.update(sessions).set({ updatedAt: new Date() }).where(eq(sessions.id, id));
}

// Message management
export async function createMessage(message: InsertMessage): Promise<Message> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(messages).values(message);
  return { ...message, id: 0, createdAt: new Date() } as Message;
}

export async function getSessionMessages(sessionId: string): Promise<Message[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(messages).where(eq(messages.sessionId, sessionId)).orderBy(messages.createdAt);
}

// Asset management
export async function createAsset(asset: InsertAsset): Promise<Asset> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(assets).values(asset);
  return { ...asset, id: 0, createdAt: new Date() } as Asset;
}

export async function getUserAssets(userId: string, type?: 'image' | 'video'): Promise<Asset[]> {
  const db = await getDb();
  if (!db) return [];

  const conditions = type 
    ? and(eq(assets.userId, userId), eq(assets.type, type))
    : eq(assets.userId, userId);

  return db.select().from(assets).where(conditions).orderBy(desc(assets.createdAt));
}

// Project management
export async function createProject(project: InsertProject): Promise<Project> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(projects).values(project);
  return { 
    ...project, 
    id: 0, 
    isFavorite: project.isFavorite ?? false,
    createdAt: new Date(), 
    updatedAt: new Date() 
  } as Project;
}

export async function getUserProjects(userId: string): Promise<Project[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(projects).where(eq(projects.userId, userId)).orderBy(desc(projects.updatedAt));
}

export async function updateProject(id: number, updates: Partial<InsertProject>): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.update(projects).set({ ...updates, updatedAt: new Date() }).where(eq(projects.id, id));
}

export async function deleteProject(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.delete(projects).where(eq(projects.id, id));
}

