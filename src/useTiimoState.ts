import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { RepeatOption, Tab, Task, TimeOfDay, TimerState } from './model';
import { DEFAULT_MARKER, DEFAULT_REPEAT } from './model';
const EMPTY_TIMER: TimerState = {
    taskId: null,
    remainingSec: 0,
    running: false,
    endsAt: null,
    startedAt: null,
};
let sequence = 0;
const nextId = () => `t${(sequence += 1)}`;
function seedTasks(): Task[] {
    return [];
}
export function useTiimoState() {
    const [tasks, setTasks] = useState<Task[]>(seedTasks);
    const [timer, setTimer] = useState<TimerState>(EMPTY_TIMER);
    const [tab, setTab] = useState<Tab>('today');
    const endsAtRef = useRef<number | null>(null);
    useEffect(() => {
        endsAtRef.current = timer.endsAt;
    }, [timer.endsAt]);
    useEffect(() => {
        if (!timer.running || timer.endsAt === null)
            return;
        const id = setInterval(() => {
            const endsAt = endsAtRef.current;
            if (endsAt === null)
                return;
            const remaining = Math.max(0, Math.round((endsAt - Date.now()) / 1000));
            setTimer((prev) => (prev.running ? { ...prev, remainingSec: remaining } : prev));
        }, 250);
        return () => clearInterval(id);
    }, [timer.running, timer.endsAt]);
    const createTask = useCallback((title: string, durationMin: number, timeOfDay: TimeOfDay, repeat: RepeatOption = DEFAULT_REPEAT) => {
        const clean = title.trim();
        if (!clean)
            return;
        setTasks((prev) => [
            ...prev,
            { id: nextId(), title: clean, durationMin, timeOfDay, repeat, done: false, marker: DEFAULT_MARKER },
        ]);
    }, []);
    const updateTask = useCallback((id: string, patch: Partial<Omit<Task, 'id'>>) => {
        setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...patch } : task)));
    }, []);
    const setCompleted = useCallback((id: string, done: boolean) => {
        setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, done } : task)));
        setTimer((prev) => (prev.taskId === id ? EMPTY_TIMER : prev));
    }, []);
    const deleteTask = useCallback((id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
        setTimer((prev) => (prev.taskId === id ? EMPTY_TIMER : prev));
    }, []);
    const startFocus = useCallback((id: string) => {
        const task = tasks.find((item) => item.id === id);
        if (!task)
            return;
        const remainingSec = task.durationMin * 60;
        const startedAt = Date.now();
        setTimer({
            taskId: id,
            remainingSec,
            running: true,
            endsAt: startedAt + remainingSec * 1000,
            startedAt,
        });
        setTab('focus');
    }, [tasks]);
    const toggleTimer = useCallback(() => {
        setTimer((prev) => {
            if (prev.taskId === null)
                return prev;
            if (prev.running) {
                return { ...prev, running: false, endsAt: null };
            }
            const endsAt = Date.now() + prev.remainingSec * 1000;
            return { ...prev, running: true, endsAt };
        });
    }, []);
    const activeTask = useMemo(() => (timer.taskId === null ? null : tasks.find((task) => task.id === timer.taskId) ?? null), [timer.taskId, tasks]);
    return {
        tasks,
        timer,
        activeTask,
        tab,
        setTab,
        createTask,
        updateTask,
        setCompleted,
        deleteTask,
        startFocus,
        toggleTimer,
    };
}
