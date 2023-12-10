import db from "$lib/prisma";
import evtStore from "$lib/eventStreamStore";

export async function POST({ request }) {
    const user = await db.users.findFirst({
        // Whatever your query is
    })
    if (!user) {
		// catch errors
	}
    // whatever your login logic is 
    
    user.friends.array.forEach((friend : User) => {
        evtStore.send({
            type: "newActiveUserEvent",
            data: JSON.stringify(user)
        });
        
    });
	return new Response(`Login successful.`, {status: 200});
}