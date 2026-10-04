# MongoDB collections

members: { name, nameNormalized, active, createdAt, updatedAt }
events: { title, recipient, target, deadline, status, notes, createdAt, updatedAt, createdBy }
payments: { eventId, memberId, amount, date, note, createdAt, updatedAt, createdBy }
adminRoles: { userId, role: owner|admin, active, createdAt, updatedAt, grantedBy }
activity: { actorId, action, entity, entityId, metadata, createdAt }

Server functions must verify the Better Auth session and an active adminRoles document before touching private collections. The public checker should only query an aggregate projection: member identity + event count + total contributed + current-event participation. Never return payment documents to the public route.