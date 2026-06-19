import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "@shared/mobile/storage";

// ─── Types ────────────────────────────────────────────────────

export type Priority = "none" | "low" | "medium" | "high";
export type TaskLevel = 0 | 1 | 2;

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Stage {
  id: string;
  name: string;
  color: string;
  order: number;
}

export interface Section {
  id: string;
  projectId: string;
  name: string;
  order: number;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  archived: boolean;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId?: string;
  sectionId?: string;
  parentId?: string;
  level: TaskLevel;
  stageId: string;
  tags: string[];
  priority: Priority;
  dueDate?: string;
  dueTime?: string;
  completedAt?: string;
  createdAt: string;
  order: number;
}

// ─── Default seed data ────────────────────────────────────────

const DEFAULT_STAGES: Stage[] = [
  { id: "stage-backlog", name: "Backlog", color: "#6b7280", order: 0 },
  { id: "stage-inprogress", name: "In Progress", color: "#a855f7", order: 1 },
  { id: "stage-done", name: "Done", color: "#22c55e", order: 2 },
];

const DEFAULT_PROJECT: Project = {
  id: "project-default",
  name: "My Tasks",
  color: "#a855f7",
  archived: false,
  createdAt: new Date().toISOString(),
};

const DEFAULT_SECTION: Section = {
  id: "section-default",
  projectId: "project-default",
  name: "General",
  order: 0,
};

const DEFAULT_TAGS: Tag[] = [
  { id: "tag-work", name: "Work", color: "#3b82f6" },
  { id: "tag-personal", name: "Personal", color: "#ec4899" },
  { id: "tag-urgent", name: "Urgent", color: "#ef4444" },
];

// ─── Store ────────────────────────────────────────────────────

interface TaskStore {
  projects: Project[];
  sections: Section[];
  stages: Stage[];
  tags: Tag[];
  tasks: Task[];

  // Projects
  addProject: (name: string, color?: string) => Project;
  updateProject: (id: string, patch: Partial<Omit<Project, "id">>) => void;
  archiveProject: (id: string) => void;
  deleteProject: (id: string) => void;

  // Sections
  addSection: (projectId: string, name: string) => Section;
  updateSection: (id: string, patch: Partial<Omit<Section, "id">>) => void;
  deleteSection: (id: string) => void;

  // Stages
  addStage: (name: string, color?: string) => Stage;
  updateStage: (id: string, patch: Partial<Omit<Stage, "id">>) => void;
  deleteStage: (id: string) => void;
  reorderStages: (orderedIds: string[]) => void;

  // Tags
  addTag: (name: string, color?: string) => Tag;
  updateTag: (id: string, patch: Partial<Omit<Tag, "id">>) => void;
  deleteTag: (id: string) => void;

  // Tasks
  addTask: (task: Omit<Task, "id" | "createdAt" | "order">) => Task;
  updateTask: (id: string, patch: Partial<Omit<Task, "id">>) => void;
  completeTask: (id: string) => void;
  uncompleteTask: (id: string) => void;
  deleteTask: (id: string) => void;
  reorderTasks: (taskIds: string[]) => void;

  // Selectors (computed helpers)
  getTasksByProject: (projectId: string) => Task[];
  getTasksByParent: (parentId: string | undefined) => Task[];
  getInboxTasks: () => Task[];
  getTodayTasks: () => Task[];
  getUpcomingTasks: () => Task[];
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      projects: [DEFAULT_PROJECT],
      sections: [DEFAULT_SECTION],
      stages: DEFAULT_STAGES,
      tags: DEFAULT_TAGS,
      tasks: [],

      // ── Projects ──────────────────────────────────────────

      addProject: (name, color = "#a855f7") => {
        const project: Project = {
          id: crypto.randomUUID(),
          name,
          color,
          archived: false,
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ projects: [...s.projects, project] }));
        return project;
      },

      updateProject: (id, patch) =>
        set((s) => ({
          projects: s.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),

      archiveProject: (id) =>
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === id ? { ...p, archived: true } : p
          ),
        })),

      deleteProject: (id) =>
        set((s) => ({
          projects: s.projects.filter((p) => p.id !== id),
          sections: s.sections.filter((sc) => sc.projectId !== id),
          tasks: s.tasks.filter((t) => t.projectId !== id),
        })),

      // ── Sections ──────────────────────────────────────────

      addSection: (projectId, name) => {
        const sections = get().sections.filter((s) => s.projectId === projectId);
        const section: Section = {
          id: crypto.randomUUID(),
          projectId,
          name,
          order: sections.length,
        };
        set((s) => ({ sections: [...s.sections, section] }));
        return section;
      },

      updateSection: (id, patch) =>
        set((s) => ({
          sections: s.sections.map((sc) =>
            sc.id === id ? { ...sc, ...patch } : sc
          ),
        })),

      deleteSection: (id) =>
        set((s) => ({
          sections: s.sections.filter((sc) => sc.id !== id),
          tasks: s.tasks.map((t) =>
            t.sectionId === id ? { ...t, sectionId: undefined } : t
          ),
        })),

      // ── Stages ──────────────────────────────────────────

      addStage: (name, color = "#6b7280") => {
        const stage: Stage = {
          id: crypto.randomUUID(),
          name,
          color,
          order: get().stages.length,
        };
        set((s) => ({ stages: [...s.stages, stage] }));
        return stage;
      },

      updateStage: (id, patch) =>
        set((s) => ({
          stages: s.stages.map((st) => (st.id === id ? { ...st, ...patch } : st)),
        })),

      deleteStage: (id) => {
        const fallback = get().stages.find((s) => s.id !== id);
        set((s) => ({
          stages: s.stages.filter((st) => st.id !== id),
          tasks: fallback
            ? s.tasks.map((t) =>
                t.stageId === id ? { ...t, stageId: fallback.id } : t
              )
            : s.tasks,
        }));
      },

      reorderStages: (orderedIds) =>
        set((s) => ({
          stages: orderedIds
            .map((id, i) => {
              const st = s.stages.find((x) => x.id === id);
              return st ? { ...st, order: i } : null;
            })
            .filter(Boolean) as Stage[],
        })),

      // ── Tags ──────────────────────────────────────────────

      addTag: (name, color = "#6b7280") => {
        const tag: Tag = { id: crypto.randomUUID(), name, color };
        set((s) => ({ tags: [...s.tags, tag] }));
        return tag;
      },

      updateTag: (id, patch) =>
        set((s) => ({
          tags: s.tags.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        })),

      deleteTag: (id) =>
        set((s) => ({
          tags: s.tags.filter((t) => t.id !== id),
          tasks: s.tasks.map((t) => ({
            ...t,
            tags: t.tags.filter((tid) => tid !== id),
          })),
        })),

      // ── Tasks ─────────────────────────────────────────────

      addTask: (taskData) => {
        const siblings = get().tasks.filter(
          (t) => t.parentId === taskData.parentId && t.projectId === taskData.projectId
        );
        const task: Task = {
          ...taskData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          order: siblings.length,
        };
        set((s) => ({ tasks: [...s.tasks, task] }));
        return task;
      },

      updateTask: (id, patch) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        })),

      completeTask: (id) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id ? { ...t, completedAt: new Date().toISOString() } : t
          ),
        })),

      uncompleteTask: (id) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id ? { ...t, completedAt: undefined } : t
          ),
        })),

      deleteTask: (id) =>
        set((s) => ({
          tasks: s.tasks.filter(
            (t) => t.id !== id && t.parentId !== id
          ),
        })),

      reorderTasks: (taskIds) =>
        set((s) => ({
          tasks: s.tasks.map((t) => {
            const idx = taskIds.indexOf(t.id);
            return idx !== -1 ? { ...t, order: idx } : t;
          }),
        })),

      // ── Selectors ─────────────────────────────────────────

      getTasksByProject: (projectId) =>
        get()
          .tasks.filter((t) => t.projectId === projectId && !t.parentId)
          .sort((a, b) => a.order - b.order),

      getTasksByParent: (parentId) =>
        get()
          .tasks.filter((t) => t.parentId === parentId)
          .sort((a, b) => a.order - b.order),

      getInboxTasks: () =>
        get()
          .tasks.filter((t) => !t.projectId && !t.parentId)
          .sort((a, b) => a.order - b.order),

      getTodayTasks: () => {
        const today = new Date().toISOString().split("T")[0];
        return get()
          .tasks.filter((t) => t.dueDate === today && !t.parentId)
          .sort((a, b) => a.order - b.order);
      },

      getUpcomingTasks: () => {
        const today = new Date().toISOString().split("T")[0];
        const sevenDays = new Date(Date.now() + 7 * 86400000)
          .toISOString()
          .split("T")[0];
        return get()
          .tasks.filter(
            (t) =>
              t.dueDate &&
              t.dueDate > today &&
              t.dueDate <= sevenDays &&
              !t.parentId
          )
          .sort((a, b) => (a.dueDate ?? "").localeCompare(b.dueDate ?? ""));
      },
    }),
    {
      name: "zendo_tasks",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
