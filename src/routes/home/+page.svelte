<script>
    import { onMount } from 'svelte';
    import hookPageData from '$lib/eventHandler';
    export let data;
    let TOKEN = 'TOKEN';
    onMount(() => {
        const eventSource = new EventSource(resoureUrl, {
            headers: {
                'Authorization': 'Bearer ' + TOKEN // needs to be validated on the endpoint.
            }
        });
        hookPageData(data, eventSource);
    })

</script>