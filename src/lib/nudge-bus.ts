/* Tiny coordinator so only one on-screen nudge speaks at a time.
   The Lego guide and the roaming prompts both claim this before
   showing a bubble, so they never overlap or talk over each other. */

let owner: string | null = null;
const listeners = new Set<() => void>();

export const nudgeBus = {
  /* Try to claim the stage. Returns true if granted. */
  claim(id: string): boolean {
    if (owner && owner !== id) return false;
    owner = id;
    return true;
  },
  /* Release the stage if this id holds it. */
  release(id: string) {
    if (owner === id) {
      owner = null;
      listeners.forEach((fn) => fn());
    }
  },
  isFree(id: string) {
    return owner === null || owner === id;
  },
  /* Notified when the stage frees up, so a waiter can retry. */
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
