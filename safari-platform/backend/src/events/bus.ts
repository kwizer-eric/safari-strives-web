type Handler<T> = (payload: T) => void | Promise<void>;

export type DomainEventMap = {
  "application.submitted": { applicationId: string; applicantId: string };
  "session.scheduled": { sessionId: string; mentorId: string };
  "user.registered": { userId: string; email: string };
};

class EventBus {
  private handlers: {
    [K in keyof DomainEventMap]?: Handler<DomainEventMap[K]>[];
  } = {};

  on<K extends keyof DomainEventMap>(
    event: K,
    handler: Handler<DomainEventMap[K]>,
  ) {
    const list = this.handlers[event] ?? [];
    list.push(handler);
    this.handlers[event] = list;
  }

  async emit<K extends keyof DomainEventMap>(
    event: K,
    payload: DomainEventMap[K],
  ) {
    const list = this.handlers[event] ?? [];
    await Promise.all(list.map((h) => Promise.resolve(h(payload))));
  }
}

export const events = new EventBus();
