import type { User, Coursera } from "@prisma/client";
import { prisma } from "~/db.server";

export function getCourse({ type, name }: { type: string; name: string }) {
  return prisma.coursera.findFirst({ where: { type, name } });
}

export function getCourses() {
  return prisma.coursera.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

// export function createNote({
//   body,
//   title,
//   userId,
// }: Pick<Coursera, "body" | "title"> & {
//   userId: User["id"];
// }) {
//   return prisma.note.create({
//     data: {
//       title,
//       body,
//       user: {
//         connect: {
//           id: userId,
//         },
//       },
//     },
//   });
// }

// export function deleteNote({
//   id,
//   userId,
// }: Pick<Note, "id"> & { userId: User["id"] }) {
//   return prisma.note.deleteMany({
//     where: { id, userId },
//   });
// }
