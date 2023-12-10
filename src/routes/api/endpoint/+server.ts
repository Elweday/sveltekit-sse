// @ts-nocheck
import { json, error } from "@sveltejs/kit";
import db from "$lib/prisma";
import evtStore from "$lib/eventStreamStore";

export async function GET() {
	const users = await db.users.findMany({
		select: {
            // fetch somehing 
        },
	});
	if (!users) {
		throw error(404, "Not found");
	}
	return json(users);
}

export async function POST({ request }) {
    const users = await db.users.create({
        data: {
            // create something
        }
    })
    if (!users) {
		// catch errors
	}
	evtStore.send(userId);
	return new Response(`User ${userId} created`, {status: 200});
}