const getMessages = async () => {
    const response = await fetch(`api/messages`);
    return await response.json();
}